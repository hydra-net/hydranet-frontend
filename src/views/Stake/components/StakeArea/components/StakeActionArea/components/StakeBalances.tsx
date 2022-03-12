import { t } from "@lingui/macro";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { DataRow } from "@olympusdao/component-library";
import { BigNumber, BigNumberish } from "ethers";
import { NetworkId } from "src/constants";
import { convertGohmToOhm, formatNumber, parseBigNumber } from "src/helpers";
import { useGohmBalance, useOhmBalance, useSohmBalance } from "src/hooks/useBalance";
import { useCurrentIndex } from "src/hooks/useCurrentIndex";

const DECIMAL_PLACES_SHOWN = 4;

const hasVisibleBalance = (balance?: BigNumber, units: BigNumberish = 9) =>
  balance && parseBigNumber(balance, units) > 9 / Math.pow(10, DECIMAL_PLACES_SHOWN + 1);

const formatBalance = (balance?: BigNumber, units: BigNumberish = 9) =>
  balance && formatNumber(parseBigNumber(balance, units), DECIMAL_PLACES_SHOWN);

export const StakeBalances = () => {
  const ohmBalances = useOhmBalance();
  const sohmBalances = useSohmBalance();
  const gohmBalances = useGohmBalance();

  const { data: currentIndex } = useCurrentIndex();

  const totalSohmBalance = sohmBalances[NetworkId.ARBITRUM].data || BigNumber.from(0);
  const totalGohmBalance = gohmBalances[NetworkId.ARBITRUM].data || BigNumber.from(0);

  const totalStakedBalance = currentIndex
    ? formatBalance(totalSohmBalance.mul(10 ** 9).add(convertGohmToOhm(totalGohmBalance, currentIndex)), 18)
    : BigNumber.from(0);

  const allBalancesLoaded = Boolean(totalSohmBalance) && Boolean(totalGohmBalance);

  return (
    <>
      <DataRow
        id="user-balance"
        title={t`Unstaked Balance`}
        isLoading={!ohmBalances[NetworkId.ARBITRUM].data}
        balance={`${formatBalance(ohmBalances[NetworkId.ARBITRUM].data)} HDX`}
      />

      <Accordion className="stake-accordion" square defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore className="stake-expand" />}>
          <DataRow
            id="user-staked-balance"
            isLoading={!allBalancesLoaded}
            title={t`Total Staked Balance`}
            balance={`${totalStakedBalance} sHDX`}
          />
        </AccordionSummary>

        <AccordionDetails>
          <DataRow
            indented
            title={t`sHDX`}
            id="user-staked-balance"
            isLoading={!sohmBalances[NetworkId.ARBITRUM].data}
            balance={`${formatBalance(sohmBalances[NetworkId.ARBITRUM].data)} sHDX`}
          />

          <DataRow
            indented
            title={t`gOHM`}
            isLoading={!gohmBalances[NetworkId.ARBITRUM].data}
            balance={`${formatBalance(gohmBalances[NetworkId.ARBITRUM].data, 18)} gOHM`}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
