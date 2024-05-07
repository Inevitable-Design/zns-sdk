import { abi } from './abi';
import { getChainDetailsByTLD } from './getChainDetailsbyTLD';
import { createPublicClient, http } from 'viem';

const chainDetailsCache = new Map();

export async function resolveAddress(tld: string, address: string) {
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

    const userDetailsPromise = publicClient.readContract({
      ...registryContract,
      functionName: 'userLookupByAddress',
      args: [address],
    });

    const userDetails:any = await Promise.all([userDetailsPromise]);

    const primaryDomainCallPromise = publicClient.readContract({
      ...registryContract,
      functionName: 'registryLookupById',
      args: [userDetails.primaryDomain],
    });

    const userDetailsTyped:any = userDetails;

    const userOwnedDomainsPromise = Promise.all(
      userDetailsTyped.allOwnedDomains.map(async domainId => {
        const domainCall = publicClient.readContract({
          ...registryContract,
          functionName: 'registryLookupById',
          args: [domainId],
        });
        return domainCall;
      })
    );

    const [primaryDomainCall, userOwnedDomains] = await Promise.all<any>([
      primaryDomainCallPromise,
      userOwnedDomainsPromise,
    ]);

    const primaryDomain = `${primaryDomainCall.domainName}.${tld}`;

    const userOwnedDomainNames = userOwnedDomains.map(
      domainCall => `${domainCall.domainName}.${tld}`
    );

    return { primaryDomain, userOwnedDomains: userOwnedDomainNames };
  } catch (error) {
    // Handle specific error scenarios
    if (error) {
      console.error('Error:', error);
    }

    // Rethrow the error or return a default value
    throw error;
  }
}
