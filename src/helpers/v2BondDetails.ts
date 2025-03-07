import { OHMTokenStackProps } from "@olympusdao/component-library";
import { ethers } from "ethers";

import { NetworkId } from "../networkDetails";
import { IERC20__factory, UniswapV2Lp__factory } from "../typechain";
import { getHdxTokenPriceSushi, getTokenByContract, getTokenPrice } from "./";

const pricingFunctionHelper = async (
  provider: ethers.providers.JsonRpcProvider,
  quoteToken: string,
  firstToken: string,
  secondToken: string,
) => {
  const baseContract = UniswapV2Lp__factory.connect(quoteToken, provider);
  const reserves = await baseContract.getReserves();
  const totalSupply = +(await baseContract.totalSupply()) / Math.pow(10, await baseContract.decimals());
  const token0Contract = IERC20__factory.connect(await baseContract.token0(), provider);

  const token0Decimals = await token0Contract.decimals();
  const token0Amount = +reserves._reserve0 / Math.pow(10, token0Decimals);
  const ethTokenPrice = await getTokenPrice(secondToken);

  const token0TotalValue = ethTokenPrice * token0Amount;
  const token1Contract = IERC20__factory.connect(await baseContract.token1(), provider);
  const token1Decimals = await token1Contract.decimals();

  const token1Amount = +reserves._reserve1 / Math.pow(10, token1Decimals);

  const price = await getHdxTokenPriceSushi();

  const token1TotalValue = price * token1Amount;

  const totalValue = token0TotalValue + token1TotalValue;
  const valuePerLpToken = totalValue / totalSupply;

  return valuePerLpToken;
};

export interface V2BondDetails {
  name: string;
  bondIconSvg: OHMTokenStackProps["tokens"];
  pricingFunction(provider: ethers.providers.JsonRpcProvider, quoteToken: string): Promise<number>;
  isLP: boolean;
  lpUrl: { [key: number]: string };
}

const DaiDetails: V2BondDetails = {
  name: "DAI",
  bondIconSvg: ["DAI"],
  pricingFunction: async () => {
    return getTokenPrice("dai");
  },
  isLP: false,
  lpUrl: {},
};

const FraxDetails: V2BondDetails = {
  name: "FRAX",
  bondIconSvg: ["FRAX"],
  pricingFunction: async () => {
    return 1.0;
  },
  isLP: false,
  lpUrl: {},
};

const EthDetails: V2BondDetails = {
  name: "wETH",
  bondIconSvg: ["wETH"],
  pricingFunction: async () => {
    return getTokenPrice("ethereum");
  },
  isLP: false,
  lpUrl: {},
};

const ArbDetails: V2BondDetails = {
  name: "ARB",
  bondIconSvg: ["wETH"],
  pricingFunction: async () => {
    return getTokenPrice("arbitrum");
  },
  isLP: false,
  lpUrl: {},
};

const UsdcDetails: V2BondDetails = {
  name: "USDC",
  bondIconSvg: ["wETH"],
  pricingFunction: async () => {
    return getTokenPrice("usd-coin");
  },
  isLP: false,
  lpUrl: {},
};

const UsdtDetails: V2BondDetails = {
  name: "USDT",
  bondIconSvg: ["wETH"],
  pricingFunction: async () => {
    return getTokenPrice("tether");
  },
  isLP: false,
  lpUrl: {},
};

const CvxDetails: V2BondDetails = {
  name: "CVX",
  bondIconSvg: ["CVX"],
  pricingFunction: async () => {
    return getTokenPrice("convex-finance");
  },
  isLP: false,
  lpUrl: {},
};

const UstDetails: V2BondDetails = {
  name: "UST",
  bondIconSvg: ["UST"],
  pricingFunction: async () => {
    return getTokenByContract("0xa693b19d2931d498c5b318df961919bb4aee87a5");
  },
  isLP: false,
  lpUrl: {},
};

const WbtcDetails: V2BondDetails = {
  name: "wBTC",
  bondIconSvg: ["wBTC"],
  pricingFunction: async () => {
    return getTokenByContract("0x2260fac5e5542a773aa44fbcfedf7c193bc2c599");
  },
  isLP: false,
  lpUrl: {},
};

const OhmDaiDetails: V2BondDetails = {
  name: "OHM-DAI LP",
  bondIconSvg: ["OHM", "DAI"],
  async pricingFunction(provider, quoteToken) {
    return pricingFunctionHelper(provider, quoteToken, "olympus", "dai");
  },
  isLP: true,
  lpUrl: {
    [NetworkId.TESTNET_RINKEBY]:
      "https://app.sushi.com/add/0x5eD8BD53B0c3fa3dEaBd345430B1A3a6A4e8BD7C/0x1e630a578967968eb02EF182a50931307efDa7CF",
    [NetworkId.MAINNET]:
      "https://app.sushi.com/add/0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5/0x6b175474e89094c44da98b954eedeac495271d0f",
  },
};

const HdxEthDetails: V2BondDetails = {
  name: "HDX-ETH LP",
  bondIconSvg: ["OHM", "wETH"],
  async pricingFunction(provider, quoteToken) {
    return pricingFunctionHelper(provider, quoteToken, "hdx", "ethereum");
  },
  isLP: true,
  lpUrl: {
    [NetworkId.ARBITRUM]:
      "https://app.sushi.com/add/0xF4fe727C855c2D395852ca43F645caB4b504Af23/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1?tokens=0xF4fe727C855c2D395852ca43F645caB4b504Af23&tokens=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1&chainId=42161",
  },
};

export const UnknownDetails: V2BondDetails = {
  name: "unknown",
  bondIconSvg: ["OHM"],
  pricingFunction: async () => {
    return 1;
  },
  isLP: false,
  lpUrl: "",
};

/**
 * DOWNCASE ALL THE ADDRESSES!!! for comparison purposes
 */
export const v2BondDetails: { [key: number]: { [key: string]: V2BondDetails } } = {
  [NetworkId.TESTNET_RINKEBY]: {
    ["0xb2180448f8945c8cc8ae9809e67d6bd27d8b2f2c"]: DaiDetails,
    ["0x2f7249cb599139e560f0c81c269ab9b04799e453"]: FraxDetails,
    ["0xc778417e063141139fce010982780140aa0cd5ab"]: EthDetails,
    // ["0xb2180448f8945c8cc8ae9809e67d6bd27d8b2f2c"]: CvxDetails, // we do not have CVX rinkeby in previous bonds
    ["0x80edbf2f58c7b130df962bb485c28188f6b5ed29"]: OhmDaiDetails,
    ["0x60544b12bce9f650419450f0cc235070fac9cbcd"]: HdxEthDetails,
  },
  [NetworkId.MAINNET]: {
    ["0x6b175474e89094c44da98b954eedeac495271d0f"]: DaiDetails,
    ["0x853d955acef822db058eb8505911ed77f175b99e"]: FraxDetails,
    ["0xa693b19d2931d498c5b318df961919bb4aee87a5"]: UstDetails,
    ["0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"]: WbtcDetails,
    ["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]: EthDetails,
    ["0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b"]: CvxDetails,
    ["0x69b81152c5a8d35a67b32a4d3772795d96cae4da"]: HdxEthDetails,
    ["0x055475920a8c93cffb64d039a8205f7acc7722d3"]: OhmDaiDetails,
  },
  [NetworkId.ARBITRUM]: {
    ["0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"]: DaiDetails,
    ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1"]: EthDetails,
    ["0x260e9733ba45017cc57ce94747d2aa941ef4e6a7"]: HdxEthDetails,
    ["0x912ce59144191c1204e64559fe8253a0e49e6548"]: ArbDetails,
    ["0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"]: UsdcDetails,
    ["0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]: UsdtDetails,
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    ["0x0eef05a0ca8847bdb762f687f8fdfa1f24cff43a"]: DaiDetails,
    ["0xb47e6a5f8b33b3f17603c83a0535a9dcd7e32681"]: EthDetails,
    ["0xcf7cff063c643842210aff90ff015b235da4d511"]: ArbDetails,
  },
};
