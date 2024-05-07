import { resolveAddress } from './utils/resolveAddress';
import { resolveDomain } from './utils/resolveDomain';
import { getMetadata } from './utils/getMetadata';

const ZNSConnectClass = class {
  async resolveAddress(tld: string, address: string): Promise<any> {
    try {
      return await resolveAddress(tld, address);
    } catch (error) {
      // Handle specific error scenarios or log the error
      console.error('Error resolving address:', error);
      throw error; // Rethrow the error to propagate it
    }
  }

  async resolveDomain(domain: string): Promise<string> {
    try {
      const result: any = await resolveDomain(domain);
      return result.owner;
    } catch (error) {
      console.error('Error resolving domain:', error);
      throw error;
    }
  }

  async getRegistry(domain: string): Promise<any> {
    try {
      return await resolveDomain(domain);
    } catch (error) {
      console.error('Error getting registry:', error);
      throw error;
    }
  }

  async getMetadata(domain: string): Promise<any> {
    try {
      return await getMetadata(domain);
    } catch (error) {
      console.error('Error getting metadata:', error);
      throw error;
    }
  }
};

function ZNSConnect() {
  return new ZNSConnectClass();
}

export { ZNSConnect };
