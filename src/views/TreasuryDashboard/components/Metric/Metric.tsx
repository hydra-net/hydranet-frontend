import { t } from "@lingui/macro";
import { Metric } from "@olympusdao/component-library";
import { STAKING_CONTRACT_DECIMALS } from "src/constants/decimals";
import { formatCurrency, formatNumber, parseBigNumber } from "src/helpers";
import { useCurrentIndex } from "src/hooks/useCurrentIndex";
import { useGohmPrice, useOhmPrice } from "src/hooks/usePrices";
import {
  useMarketCap,
  useOhmCirculatingSupply,
  useStakedSupply,
  useTotalSupply,
  useTotalValueDeposited,
  useTreasuryMarketValue,
} from "src/hooks/useProtocolMetrics";
import { useStakingRebaseRate } from "src/hooks/useStakingRebaseRate";

type MetricProps = PropsOf<typeof Metric>;
type AbstractedMetricProps = Omit<MetricProps, "metric" | "label" | "tooltip" | "isLoading">;

export const MarketCap: React.FC<AbstractedMetricProps> = props => {
  const { data: marketCap } = useMarketCap();

  const _props: MetricProps = {
    ...props,
    label: t`Market Cap`,
  };

  if (marketCap) _props.metric = formatCurrency(marketCap, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const OHMPrice: React.FC<AbstractedMetricProps> = props => {
  const { data: ohmPrice } = useOhmPrice();

  const _props: MetricProps = {
    ...props,
    label: t`HDX Price`,
  };

  if (ohmPrice) _props.metric = formatCurrency(ohmPrice, 2);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const CircSupply: React.FC<AbstractedMetricProps> = props => {
  const { data: totalSupply } = useTotalSupply();

  const _props: MetricProps = {
    ...props,
    label: t`Total Supply`,
  };

  if (totalSupply) _props.metric = `${formatNumber(totalSupply)}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const BackingPerOHM: React.FC<AbstractedMetricProps> = props => {
  const { data: circSupply } = useOhmCirculatingSupply();
  const { data: treasuryValue } = useTreasuryMarketValue();

  const _props: MetricProps = {
    ...props,
    label: t`Treasury Market Value per HDX`,
    tooltip: t`Treasury MV backing is the total USD budget the treasury has per HDX to spend on all market operations (LP, swaps, revenue generation, bonds and inverse bonds, etc)`,
  };

  if (treasuryValue !== undefined && circSupply) _props.metric = formatCurrency(treasuryValue / circSupply, 2);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const CurrentIndex: React.FC<AbstractedMetricProps> = props => {
  const { data: currentIndex } = useCurrentIndex();

  const _props: MetricProps = {
    ...props,
    label: t`Current Index`,
    tooltip: t`The current index tracks the amount of sHDX accumulated since the beginning of staking. Basically, how much sHDX one would have if they staked and held 1 HDX from launch.`,
  };

  if (currentIndex) _props.metric = `${parseBigNumber(currentIndex, STAKING_CONTRACT_DECIMALS).toFixed(2)} sHDX`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const StakedTokens: React.FC<AbstractedMetricProps> = props => {
  const { data: totalSupply } = useTotalSupply();
  const { data: stakedSupply } = useStakedSupply();

  const _props: MetricProps = {
    ...props,
    label: t`HDX Staked`,
    tooltip: t`HDX Staked is the ratio of sHDX to total supply of HDX(staked vs total)`,
  };

  if (totalSupply && stakedSupply !== undefined) _props.metric = `${((stakedSupply / totalSupply) * 100).toFixed(2)} %`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const GOHMPrice: React.FC<AbstractedMetricProps> = props => {
  const { data: gOhmPrice } = useGohmPrice();

  const _props: MetricProps = {
    ...props,
    label: t`gHDX Price`,
    tooltip:
      t`gHDX = sHDX * index` +
      "\n\n" +
      t`The price of gHDX is equal to the price of HDX multiplied by the current index`,
  };

  if (gOhmPrice) _props.metric = formatCurrency(gOhmPrice, 2);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const TotalValueDeposited: React.FC<AbstractedMetricProps> = props => {
  const { data: totalValueDeposited } = useTotalValueDeposited();

  const _props: MetricProps = {
    ...props,
    label: t`Total Value Deposited`,
  };

  if (totalValueDeposited) _props.metric = formatCurrency(totalValueDeposited, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const StakingAPY: React.FC<AbstractedMetricProps> = props => {
  const { data: rebaseRate } = useStakingRebaseRate();

  const _props: MetricProps = {
    ...props,
    label: t`APY`,
  };

  if (rebaseRate) {
    const apy = (Math.pow(1 + rebaseRate, 365 * 3) - 1) * 100;
    const formatted = formatNumber(apy, 1);

    _props.metric = `${formatted}%`;
  } else _props.isLoading = true;

  return <Metric {..._props} />;
};
