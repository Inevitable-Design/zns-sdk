import { abi } from './abi';
import { getChainDetailsByTLD } from './getChainDetailsbyTLD';
import { createPublicClient, http } from 'viem';

export async function resolveDomain(domain:string) {
  try {
    const parts = domain.split('.');
    const tld = parts.pop();
    const name = parts[0];

    const chainDetails = getChainDetailsByTLD(tld);

    if (!chainDetails) {
      throw new Error('Invalid TLD');
    }

    const registryAddress = chainDetails.registryAddress;
    const chain = chainDetails.chain;

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const data = await publicClient.readContract({
      address: registryAddress as `0x${string}`,
      abi: abi,
      functionName: 'registryLookupByName',
      args: [name],
    });

    return data;
  } catch (error) {
    // Handle specific types of errors
    if (error instanceof SyntaxError) {
      console.error('Syntax error:', error.message);
    } else if (error instanceof TypeError) {
      console.error('Type error:', error.message);
    } else {
      console.error('An error occurred:', error.message);
    }

    // Optionally, you can re-throw the error to propagate it to the caller
    throw error;
  }
}
