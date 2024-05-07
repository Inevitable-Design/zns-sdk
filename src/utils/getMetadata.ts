import { abi } from './abi';
import { getChainDetailsByTLD } from './getChainDetailsbyTLD';
import type { ChainDetails, ChainRegistry } from './getChainDetailsbyTLD';
import { createPublicClient, http } from 'viem';

export async function getMetadata(domain: string): Promise<string> {
  try {
    const parts: string[] = domain.split('.');
    const tld: string = parts.pop()?.toString() ?? '';
    const name: string = parts[0];

    const chainDetails = getChainDetailsByTLD(tld);

    if (!chainDetails) {
      throw new Error('Invalid TLD');
    }

    const registryAddress: string = chainDetails.registryAddress;
    const chain = chainDetails.chain;

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const data = await publicClient.readContract({
      address: registryAddress as `0x${string}`,
      abi: abi,
      functionName: 'domainLookup',
      args: [name],
    });

    if (!data) {
      throw new Error('Domain not found');
    }

    const metadata: any = await publicClient.readContract({
      address: registryAddress as `0x${string}`,
      abi: abi,
      functionName: 'tokenURI',
      args: [data],
    });

    if (!metadata || typeof metadata !== 'string') {
      throw new Error('Metadata not found');
    }

    const base64Json: string = metadata.split(',')[1];
    const decodedJson = atob(base64Json);

    if (!decodedJson) {
      throw new Error('Invalid metadata format');
    }

    const imageData = JSON.parse(decodedJson).image;

    if (!imageData) {
      throw new Error('Image data not found in metadata');
    }

    const base64Image: string = imageData.split(',')[1] as string;
    const decodedImage = atob(base64Image);

    if (!decodedImage) {
      throw new Error('Invalid image data');
    }

    return decodedImage;
  } catch (error) {
    // Handle specific error scenarios or log the error
    console.error('Error occurred:', error ?? 'Error Occured');
    throw error; // Rethrow the error to propagate it to the caller
  }
}
