export type ChainDetails = {
  id: number;
  name: string;
  iconBackground?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
      apiUrl?: string;
    };
  };
  contracts?: {
    multicall3: {
      address: string;
      blockCreated: number;
    };
  };
};

export type ChainRegistry = {
  registryAddress: string;
  chain: any;
};

export const getChainDetailsByTLD = (tld: string): ChainRegistry => {
  tld = tld.toLowerCase();
  let registryAddress: string;
  let chain: ChainDetails;
  switch (tld) {
    case 'nft':
      registryAddress = '0x3173988cbA2d127E1bB074dbF30C01569C133688';
      chain = {
        id: 1687,
        name: 'Mint Sepolia Testnet',
        iconBackground: '#fff',
        nativeCurrency: { name: 'Mint', symbol: 'ETH', decimals: 18 },
        rpcUrls: {
          default: { http: ['https://sepolia-testnet-rpc.mintchain.io'] },
        },
        blockExplorers: {
          default: {
            name: 'Mint',
            url: 'https://sepolia-testnet-explorer.mintchain.io/',
          },
        },
      };
      break;
    case 'xterio':
      registryAddress = '0x47D3EbdD10DCd834289484DeD9BfddFdE410b419';
      chain = {
        id: 1637450,
        name: 'Xterio Testnet',
        iconBackground: '#fff',
        nativeCurrency: { name: 'Xterio', symbol: 'tBNB', decimals: 18 },
        rpcUrls: {
          default: { http: ['https://xterio-testnet.alt.technology'] },
        },
        blockExplorers: {
          default: {
            name: 'Xterio',
            url: 'https://xterio-testnet-explorer.alt.technology/',
          },
        },
      };
      break;
    case 'honey':
      registryAddress = '0xA4d4d21E6C52F9490D1902CB84DB43eAD89a072D';
      chain = {
        id: 80085,
        name: 'Berachain Artio',
        nativeCurrency: {
          decimals: 18,
          name: 'BERA Token',
          symbol: 'BERA',
        },
        rpcUrls: {
          default: { http: ['https://artio.rpc.berachain.com'] },
        },
        blockExplorers: {
          default: {
            name: 'Berachain',
            url: 'https://artio.beratrail.io',
          },
        },
      };
      break;
    case 'cz':
      registryAddress = '0x7e2CF06F092c9F5cF5972eF021635b6c8E1C5bb2';
      chain = {
        id: 56,
        name: 'BNB Smart Chain',
        nativeCurrency: {
          decimals: 18,
          name: 'BNB',
          symbol: 'BNB',
        },
        rpcUrls: {
          default: { http: ['https://rpc.ankr.com/bsc'] },
        },
        blockExplorers: {
          default: {
            name: 'BscScan',
            url: 'https://bscscan.com',
            apiUrl: 'https://api.bscscan.com/api',
          },
        },
        contracts: {
          multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 15921452,
          },
        },
      };
      break;
    case 'xlayer':
      registryAddress = '0x71709A5f1831bA48C414375Fb6a58662A40C01b5';
      chain = {
        id: 196,
        name: 'X Layer',
        iconBackground: '#fff',
        nativeCurrency: { name: 'xLayer', symbol: 'OKB', decimals: 18 },
        rpcUrls: {
          default: { http: ['https://rpc.xlayer.tech/'] },
        },
        blockExplorers: {
          default: { name: 'xLayer', url: 'https://www.oklink.com/xlayer' },
        },
      };
      break;
    case 'tabi':
      registryAddress = '0x47D3EbdD10DCd834289484DeD9BfddFdE410b419';
      chain = {
        id: 9789,
        name: 'Tabi Testnet',
        iconBackground: '#000',
        nativeCurrency: { name: 'Tabi', symbol: 'TABI', decimals: 18 },
        rpcUrls: {
          default: { http: ['https://rpc.testnet.tabichain.com'] },
        },
        blockExplorers: {
          default: { name: 'Tabi', url: 'https://testnet.tabiscan.com/' },
        },
      };
      break;
    case 'taiko':
      registryAddress = '0x3Eff8945b1A2c5E3829DAD0a94576c851e409877';
      chain = {
        id: 167009,
        name: 'Taiko Hekla',
        iconBackground: '#fff',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: {
          default: { http: ['https://rpc.hekla.taiko.xyz'] },
        },
        blockExplorers: {
          default: {
            name: 'Taiko Hekla',
            url: 'https://hekla.taikoscan.network/',
          },
        },
      };
      break;
    case 'scroll':
      registryAddress = '0xB00910Bac7DA44c0D440798809dbF8d51FDBb635';
      chain = {
        id: 534352,
        name: 'Scroll Mainnet',
        iconBackground: '#FFDBB0',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: {
          default: { http: ['https://scroll.blockpi.network/v1/rpc/public'] },
        },
        blockExplorers: {
          default: { name: 'Scroll', url: 'https://scrollscan.com/' },
        },
      };
      break;
    default:
      return { registryAddress, chain };
  }
  return { registryAddress, chain };
};
