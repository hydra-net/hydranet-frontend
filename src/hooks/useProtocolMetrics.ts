import { useQuery } from "react-query";
import { NetworkId } from "src/constants";
import { OHM_ADDRESSES, SOHM_ADDRESSES } from "src/constants/addresses";
import { parseBigNumber } from "src/helpers";
import apollo from "src/lib/apolloClient";

import { useStaticSohmContract, useStaticTokenContract } from "./useContract";

const query = `
  query ProtcolMetrics {
    protocolMetrics(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      runway5k
      timestamp
      ohmPrice
      runway10k
      runway20k
      runway50k
      marketCap
      currentAPY
      totalSupply
      runway7dot5k
      runway2dot5k
      runwayCurrent
      nextEpochRebase
      totalValueLocked
      treasuryOhmDaiPOL
      treasuryOhmFraxPOL
      nextDistributedOhm
      treasuryMarketValue
      ohmCirculatingSupply
      sOhmCirculatingSupply
      treasuryRiskFreeValue
      treasuryDaiMarketValue
      treasuryUstMarketValue
      treasuryFraxMarketValue
      treasuryWETHMarketValue
      treasuryLusdMarketValue
      treasuryWBTCMarketValue
      treasuryDaiRiskFreeValue
      treasuryOtherMarketValue
      treasuryLusdRiskFreeValue
      treasuryXsushiMarketValue
      treasuryFraxRiskFreeValue
    }
  }
`;

interface ProtocolMetrics {
  id: string;
  runway5k: string;
  timestamp: string;
  ohmPrice: string;
  runway10k: string;
  runway20k: string;
  runway50k: string;
  marketCap: string;
  currentAPY: string;
  totalSupply: string;
  runway7dot5k: string;
  runway2dot5k: string;
  runwayCurrent: string;
  nextEpochRebase: string;
  totalValueLocked: string;
  treasuryOhmDaiPOL: string;
  treasuryOhmFraxPOL: string;
  nextDistributedOhm: string;
  treasuryMarketValue: string;
  ohmCirculatingSupply: string;
  sOhmCirculatingSupply: string;
  treasuryRiskFreeValue: string;
  treasuryDaiMarketValue: string;
  treasuryUstMarketValue: string;
  treasuryFraxMarketValue: string;
  treasuryWETHMarketValue: string;
  treasuryLusdMarketValue: string;
  treasuryWBTCMarketValue: string;
  treasuryDaiRiskFreeValue: string;
  treasuryOtherMarketValue: string;
  treasuryLusdRiskFreeValue: string;
  treasuryXsushiMarketValue: string;
  treasuryFraxRiskFreeValue: string;
}

type ProtocolMetricsNumbers = Record<keyof ProtocolMetrics, number>;

export const protocolMetricsQueryKey = () => ["useProtocolMetrics"];

export const useProtocolMetrics = <TSelectData = unknown>(select: (data: ProtocolMetricsNumbers[]) => TSelectData) => {
  return useQuery<ProtocolMetricsNumbers[], Error, TSelectData>(
    protocolMetricsQueryKey(),
    async () => {
      const response = await apollo<{ protocolMetrics: ProtocolMetrics[] }>(query);

      if (!response) throw new Error("No response from TheGraph");

      // Convert all strings to numbers
      return response.data.protocolMetrics.map(metric =>
        Object.entries(metric).reduce(
          (obj, [key, value]) => Object.assign(obj, { [key]: parseFloat(value) }),
          {} as ProtocolMetricsNumbers,
        ),
      );
    },
    { select },
  );
};

export const useMarketCap = () => useProtocolMetrics(metrics => metrics[0].marketCap);

export const totalSupplyQueryKey = () => ["useTotalSupply"];
export const useTotalSupply = () => {
  const hdxContract = useStaticTokenContract(OHM_ADDRESSES[NetworkId.ARBITRUM_TESTNET], NetworkId.ARBITRUM_TESTNET);

  return useQuery<number, Error>(totalSupplyQueryKey(), async () => {
    const totalSupply = await hdxContract.totalSupply();
    return parseBigNumber(totalSupply, 9);
  });
};

export const stakedSupplyQueryKey = () => ["useStakedSupply"];
export const useStakedSupply = () => {
  const shdxContract = useStaticSohmContract(SOHM_ADDRESSES[NetworkId.ARBITRUM_TESTNET], NetworkId.ARBITRUM_TESTNET);

  return useQuery<number, Error>(stakedSupplyQueryKey(), async () => {
    const stakedSupply = await shdxContract.circulatingSupply();

    return parseBigNumber(stakedSupply, 9);
  });
};

export const useTotalValueDeposited = () => useProtocolMetrics(metrics => metrics[0].totalValueLocked);

export const useTreasuryMarketValue = () => {
  return {
    data: 0,
  };
};

export const useOhmCirculatingSupply = () => useProtocolMetrics(metrics => metrics[0].ohmCirculatingSupply);
