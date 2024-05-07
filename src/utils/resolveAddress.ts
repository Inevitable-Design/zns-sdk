import { abi } from './abi';
import { getChainDetailsByTLD } from './getChainDetailsbyTLD';
import { createPublicClient, http } from 'viem';

const chainDetailsCache = new Map();

export async function resolveAddress(tld, address) {
  try {
    let chainDetails = chainDetailsCache.get(tld);
    if (!chainDetails) {
      chainDetails = await getChainDetailsByTLD(tld);
      chainDetailsCache.set(tld, chainDetails);
    }
    const registryAddress = chainDetails.registryAddress;
    const chain = chainDetails.chain;

    const registryContract = {
      address: registryAddress,
      abi: abi,
    };

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const userDetailsPromise = await publicClient.readContract({
      ...registryContract,
      functionName: 'userLookupByAddress',
      args: [address],
    });

    const userDetails: any = userDetailsPromise;

    const userDetailsTyped: any = userDetails;

    const [primaryDomainCall, userOwnedDomains] = await Promise.all<any>([
      publicClient.readContract({
        ...registryContract,
        functionName: 'registryLookupById',
        args: [userDetails.primaryDomain],
      }),
      Promise.all(
        userDetailsTyped.allOwnedDomains.map(async domainId => {
          const domainCall = publicClient.readContract({
            ...registryContract,
            functionName: 'registryLookupById',
            args: [domainId],
          });
          return domainCall;
        })
      ),
    ]);

    const primaryDomain = `${primaryDomainCall.domainName}.${tld}`;

    const userOwnedDomainNames = userOwnedDomains.map(
      domainCall => `${domainCall.domainName}.${tld}`
    );

    return { primaryDomain, userOwnedDomains: userOwnedDomainNames };
  } catch (error) {
    console.error('Error:', error);
  }
}
