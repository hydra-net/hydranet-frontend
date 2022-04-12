import arbitrum from "./assets/arbitrum.png";
import avalanche from "./assets/tokens/AVAX.svg";
import polygon from "./assets/tokens/matic.svg";
import ethereum from "./assets/tokens/wETH.svg";
import { EnvHelper } from "./helpers/Environment";
import { NodeHelper } from "./helpers/NodeHelper";

export enum NetworkId {
  MAINNET = 1,
  TESTNET_RINKEBY = 4,

  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421611,

  AVALANCHE = 43114,
  AVALANCHE_TESTNET = 43113,

  POLYGON = 137,
  POLYGON_TESTNET = 80001,

  FANTOM = 250,
  FANTOM_TESTNET = 4002,

  Localhost = 1337,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  [NetworkId.TESTNET_RINKEBY]: {
    DAI_ADDRESS: "0x9Ff1746279Fa425d063e5B30a33CF25744782D85", // duplicate
    OHM_ADDRESS: "0x771Ae5801FC69201Bb82DA0eD3593EaceA1733f7",
    STAKING_ADDRESS: "0x2Fc97bF2e95a6218413Ce0a81Ff290701507C925",
    STAKING_HELPER_ADDRESS: "",
    OLD_STAKING_ADDRESS: "",
    SOHM_ADDRESS: "0xc3447cd18e2b93c40e1255067CA7C63eD20d45Cd",
    WSOHM_ADDRESS: "",
    OLD_SOHM_ADDRESS: "",
    MIGRATE_ADDRESS: "",
    DISTRIBUTOR_ADDRESS: "0x1E859808a7e24cEeEB25b79d08Db4047F12520C2",
    BONDINGCALC_ADDRESS: "",
    CIRCULATING_SUPPLY_ADDRESS: "",
    TREASURY_ADDRESS: "0x23935eb155128dB6B0cef7F3BE4e90Be5771A9fA",
    REDEEM_HELPER_ADDRESS: "",
    PT_TOKEN_ADDRESS: "", // 33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
    PT_PRIZE_POOL_ADDRESS: "", // NEW
    PT_PRIZE_STRATEGY_ADDRESS: "", // NEW
    GIVING_ADDRESS: "",
    MOCK_GIVING_ADDRESS: "",
    MOCK_SOHM: "",
    MIGRATOR_ADDRESS: "",
    GOHM_ADDRESS: "0x8aae5C27Cc0588384A69aE02F8C77AE730308C37",
    OHM_V2: "0x771Ae5801FC69201Bb82DA0eD3593EaceA1733f7",
    TREASURY_V2: "0x23935eb155128dB6B0cef7F3BE4e90Be5771A9fA",
    SOHM_V2: "0xc3447cd18e2b93c40e1255067CA7C63eD20d45Cd",
    STAKING_V2: "0x2Fc97bF2e95a6218413Ce0a81Ff290701507C925",
    BOND_DEPOSITORY: "0x3e7331ccB7AF79b0a50828961e804212C1c55A59",
    DAO_TREASURY: "0x23935eb155128dB6B0cef7F3BE4e90Be5771A9fA",
  },
  [NetworkId.MAINNET]: {
    DAI_ADDRESS: "", // duplicate
    OHM_ADDRESS: "",
    STAKING_ADDRESS: "", // The new staking contract
    STAKING_HELPER_ADDRESS: "", // Helper contract used for Staking only
    OLD_STAKING_ADDRESS: "",
    SOHM_ADDRESS: "",
    WSOHM_ADDRESS: "",
    OLD_SOHM_ADDRESS: "",
    PRESALE_ADDRESS: "",
    AOHM_ADDRESS: "",
    MIGRATE_ADDRESS: "",
    DISTRIBUTOR_ADDRESS: "",
    BONDINGCALC_ADDRESS: "",
    CIRCULATING_SUPPLY_ADDRESS: "",
    TREASURY_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
    FUSE_6_SOHM: "", // Tetranode's Locker
    FUSE_18_SOHM: "", // Olympus Pool Party
    FUSE_36_SOHM: "", // Fraximalist Money Market
    PT_TOKEN_ADDRESS: "", // 33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
    PT_PRIZE_POOL_ADDRESS: "", // NEW
    PT_PRIZE_STRATEGY_ADDRESS: "", // NEW
    ZAPPER_POOL_V1: "",
    BONDINGCALC_V2: "",
    MIGRATOR_ADDRESS: "",
    GOHM_ADDRESS: "",
    OHM_V2: "",
    TREASURY_V2: "",
    SOHM_V2: "",
    STAKING_V2: "",
    FIATDAO_WSOHM_ADDRESS: "",
    GIVING_ADDRESS: "",
    BOND_DEPOSITORY: "", // updated
    DAO_TREASURY: "",
    TOKEMAK_GOHM: "",
    ZAP: "",
  },
  [NetworkId.ARBITRUM]: {
    DAI_ADDRESS: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    OHM_ADDRESS: "0xF4fe727C855c2D395852ca43F645caB4b504Af23",
    STAKING_ADDRESS: "0xd20CDF95a08ACDf8Aa360232Caeda6E59a06951D",
    STAKING_HELPER_ADDRESS: "0xd20CDF95a08ACDf8Aa360232Caeda6E59a06951D",
    OLD_STAKING_ADDRESS: "",
    SOHM_ADDRESS: "0xb7F5ca475D7F62ab9A6729d8118b0E65E666f005",
    OLD_SOHM_ADDRESS: "",
    PRESALE_ADDRESS: "",
    AOHM_ADDRESS: "",
    MIGRATE_ADDRESS: "",
    DISTRIBUTOR_ADDRESS: "0xAc9Ed7Fb563B4A93bDB43fa3f5B2Bf0dB53DF856",
    BONDINGCALC_ADDRESS: "",
    CIRCULATING_SUPPLY_ADDRESS: "",
    TREASURY_ADDRESS: "0x18ebbEba2c098a0cAE227cd0309eCf976e4Ed245",
    REDEEM_HELPER_ADDRESS: "",
    WSOHM_ADDRESS: "",
    MIGRATOR_ADDRESS: "",
    GOHM_ADDRESS: "0xE33050122e346CAAb4505BEaDc514C024722a38E",
    OHM_V2: "0xF4fe727C855c2D395852ca43F645caB4b504Af23",
    SOHM_V2: "0xb7F5ca475D7F62ab9A6729d8118b0E65E666f005",
    STAKING_V2: "0xd20CDF95a08ACDf8Aa360232Caeda6E59a06951D",
    BOND_DEPOSITORY: "0xE71d46c6B1ecD2812c11E52Cfb28a4AE3AEa6580",
    DAO_TREASURY: "0x18ebbEba2c098a0cAE227cd0309eCf976e4Ed245",
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    DAI_ADDRESS: "0x0eEf05a0CA8847BdB762F687F8fDFA1F24cFF43A",
    OHM_ADDRESS: "0xcDadE202fAc2102452b8Bef119EAC165e14c3F28",
    STAKING_ADDRESS: "0x6d22cd7C806468aE47B5049C64e32522f4EBb7C9",
    STAKING_HELPER_ADDRESS: "0x6Af49d80aC9A027389939Df53a1bdE0a9d89E237",
    OLD_STAKING_ADDRESS: "",
    SOHM_ADDRESS: "0x785FC8751A93330A888064aF305263856841f54e",
    OLD_SOHM_ADDRESS: "",
    PRESALE_ADDRESS: "",
    AOHM_ADDRESS: "",
    MIGRATE_ADDRESS: "",
    DISTRIBUTOR_ADDRESS: "0x368214C8817742f5d38BcA545bd464ac11cC4F31",
    BONDINGCALC_ADDRESS: "",
    CIRCULATING_SUPPLY_ADDRESS: "",
    TREASURY_ADDRESS: "0x393d2F9d78058bde615fa56Ef1D36437DD8B018e",
    REDEEM_HELPER_ADDRESS: "",
    WSOHM_ADDRESS: "",
    MIGRATOR_ADDRESS: "",
    GOHM_ADDRESS: "0xAE3cCd4698603b28a01169dAB059d6Fb09840f3A",
    OHM_V2: "0x1c165166458DB1af89B83023c9D29e9885dF9d5F",
    SOHM_V2: "0x785FC8751A93330A888064aF305263856841f54e",
    STAKING_V2: "0x6Af49d80aC9A027389939Df53a1bdE0a9d89E237",
    BOND_DEPOSITORY: "0x0AA742F6cB7B07b66b6714cC6378B41904C158f4",
    DAO_TREASURY: "0x393d2F9d78058bde615fa56Ef1D36437DD8B018e",
  },
  [NetworkId.AVALANCHE_TESTNET]: {
    DAI_ADDRESS: "",
    OHM_ADDRESS: "",
    STAKING_ADDRESS: "",
    STAKING_HELPER_ADDRESS: "",
    OLD_STAKING_ADDRESS: "",
    SOHM_ADDRESS: "",
    OLD_SOHM_ADDRESS: "",
    PRESALE_ADDRESS: "",
    AOHM_ADDRESS: "",
    MIGRATE_ADDRESS: "",
    DISTRIBUTOR_ADDRESS: "",
    BONDINGCALC_ADDRESS: "",
    CIRCULATING_SUPPLY_ADDRESS: "",
    TREASURY_ADDRESS: "",
    PICKLE_OHM_LUSD_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
    WSOHM_ADDRESS: "0x8e8ffc8d41Ee4A915A1FB3940b1beAB0c2Cd5bB0",
    GOHM_ADDRESS: "0x115E5979435c89eF38fB87C2D7Fc3BCA09053c54",
    MIGRATOR_ADDRESS: "0x9050D25977F8A19CDD5599A28bC5f55d39fb6105",
  },
  [NetworkId.AVALANCHE]: {
    DAI_ADDRESS: "",
    OHM_ADDRESS: "",
    // STAKING_ADDRESS: "", // The new staking contract
    STAKING_HELPER_ADDRESS: "", // Helper contract used for Staking only
    OLD_STAKING_ADDRESS: "",
    SOHM_ADDRESS: "",
    OLD_SOHM_ADDRESS: "",
    PRESALE_ADDRESS: "",
    AOHM_ADDRESS: "",
    MIGRATE_ADDRESS: "",
    DISTRIBUTOR_ADDRESS: "",
    BONDINGCALC_ADDRESS: "",
    CIRCULATING_SUPPLY_ADDRESS: "",
    TREASURY_ADDRESS: "",
    PICKLE_OHM_LUSD_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
    WSOHM_ADDRESS: "0x8cd309e14575203535ef120b5b0ab4dded0c2073",
    GOHM_ADDRESS: "0x321e7092a180bb43555132ec53aaa65a5bf84251",
    MIGRATOR_ADDRESS: "0xB10209BFbb37d38EC1B5F0c964e489564e223ea7",
  }, // TODO: Avalanche Mainnet addresses
  [NetworkId.POLYGON]: {
    GOHM_ADDRESS: "0xd8cA34fd379d9ca3C6Ee3b3905678320F5b45195",
  },
  [NetworkId.FANTOM]: {
    GOHM_ADDRESS: "0x91fa20244fb509e8289ca630e5db3e9166233fdc",
  },
};

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */

interface INativeCurrency {
  name: string;
  symbol: string;
  decimals?: number;
}

interface INetwork {
  chainName: string;
  chainId: number;
  nativeCurrency: INativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  image: SVGImageElement | string;
  imageAltText: string;
  uri: () => string;
}

// These networks will be available for users to select. Other networks may be functional
// (e.g. testnets, or mainnets being prepared for launch) but need to be selected directly via the wallet.
export const USER_SELECTABLE_NETWORKS = [NetworkId.MAINNET, NetworkId.ARBITRUM, NetworkId.AVALANCHE];

// Set this to the chain number of the most recently added network in order to enable the 'Now supporting X network'
// message in the UI. Set to -1 if we don't want to display the message at the current time.
export const NEWEST_NETWORK_ID = NetworkId.AVALANCHE;

export const NETWORKS: { [key: number]: INetwork } = {
  [NetworkId.MAINNET]: {
    chainName: "Ethereum",
    chainId: 1,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [""],
    blockExplorerUrls: ["https://etherscan.io/#/"],
    image: ethereum,
    imageAltText: "Ethereum Logo",
    uri: () => NodeHelper.getMainnetURI(NetworkId.MAINNET),
  },
  [NetworkId.TESTNET_RINKEBY]: {
    chainName: "Rinkeby Testnet",
    chainId: 4,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [""],
    blockExplorerUrls: ["https://rinkeby.etherscan.io/#/"],
    image: ethereum,
    imageAltText: "Ethereum Logo",
    uri: () => NodeHelper.getMainnetURI(NetworkId.TESTNET_RINKEBY),
  },
  [NetworkId.ARBITRUM]: {
    chainName: "Arbitrum",
    chainId: 42161,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://explorer.arbitrum.io/#/"],
    image: arbitrum,
    imageAltText: "Arbitrum Logo",
    uri: () => NodeHelper.getMainnetURI(NetworkId.ARBITRUM),
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    chainName: "Arbitrum Testnet",
    chainId: 421611,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/#/"],
    image: arbitrum,
    imageAltText: "Arbitrum Logo",
    uri: () => EnvHelper.alchemyArbitrumTestnetURI,
  },
  [NetworkId.AVALANCHE_TESTNET]: {
    chainName: "Avalanche Fuji Testnet",
    chainId: 43113,
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/#/"],
    image: avalanche,
    imageAltText: "Avalanche Logo",
    uri: () => EnvHelper.alchemyAvalancheTestnetURI,
  },
  [NetworkId.AVALANCHE]: {
    chainName: "Avalanche",
    chainId: 43114,
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
    image: avalanche,
    imageAltText: "Avalanche Logo",
    uri: () => NodeHelper.getMainnetURI(NetworkId.AVALANCHE),
  },
  [NetworkId.POLYGON]: {
    chainName: "Polygon",
    chainId: 137,
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com/"],
    image: polygon,
    imageAltText: "Polygon Logo",
    uri: () => NodeHelper.getMainnetURI(NetworkId.POLYGON),
  },
  [NetworkId.POLYGON_TESTNET]: {
    chainName: "Polygon Mumbai Testnet",
    chainId: 80001,
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    image: polygon,
    imageAltText: "Polygon Logo",
    uri: () => "", // NodeHelper.getMainnetURI(NetworkId.POLYGON_TESTNET),
  },
};

// VIEWS FOR NETWORK is used to denote which paths should be viewable on each network
// ... attempting to prevent contract calls that can't complete & prevent user's from getting
// ... stuck on the wrong view

interface IViewsForNetwork {
  dashboard: boolean;
  stake: boolean;
  wrap: boolean;
  zap: boolean;
  threeTogether: boolean;
  bonds: boolean;
  network: boolean;
  bondsV2: boolean;
}

export const VIEWS_FOR_NETWORK: { [key: number]: IViewsForNetwork } = {
  [NetworkId.MAINNET]: {
    dashboard: true,
    stake: true,
    wrap: true,
    zap: true,
    threeTogether: true,
    bonds: true,
    network: true,
    bondsV2: true,
  },
  [NetworkId.TESTNET_RINKEBY]: {
    dashboard: true,
    stake: true,
    wrap: true,
    zap: true,
    threeTogether: true,
    bonds: true,
    network: true,
    bondsV2: true,
  },
  [NetworkId.ARBITRUM]: {
    dashboard: true,
    stake: true,
    wrap: true,
    zap: false,
    threeTogether: false,
    bonds: true,
    network: true,
    bondsV2: false,
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    dashboard: true,
    stake: true,
    wrap: true,
    zap: false,
    threeTogether: false,
    bonds: true,
    network: true,
    bondsV2: false,
  },
  [NetworkId.AVALANCHE]: {
    dashboard: true,
    stake: false,
    wrap: false,
    zap: false,
    threeTogether: false,
    bonds: false,
    network: true,
    bondsV2: false,
  },
  [NetworkId.AVALANCHE_TESTNET]: {
    dashboard: true,
    stake: false,
    wrap: true,
    zap: false,
    threeTogether: false,
    bonds: false,
    network: true,
    bondsV2: false,
  },
};
