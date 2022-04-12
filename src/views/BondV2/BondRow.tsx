/* eslint-disable simple-import-sort/imports */
import "./ChooseBond.scss";

import { t, Trans } from "@lingui/macro";
import { Link, Paper, Slide, SvgIcon, TableCell, TableRow, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { TertiaryButton, TokenStack } from "@olympusdao/component-library";
import hdxIcon from "../../assets/icons/hdx.svg";
import ethIcon from "../../assets/icons/eth.svg";
import { NavLink } from "react-router-dom";
import { getArbitrumscanUrl } from "src/helpers";
import { useAppSelector } from "src/hooks";
import { IBondV2 } from "src/slices/BondSliceV2";

import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";
import { NetworkId } from "../../constants";
import { DisplayBondDiscount, DisplayBondPrice } from "./BondV2";

export function BondDataCard({ bond, networkId }: { bond: IBondV2; networkId: NetworkId }) {
  const isBondLoading = useAppSelector(state => state.bondingV2.loading);

  return (
    <Slide direction="up" in={true}>
      <Paper id={`${bond.index}--bond`} className="bond-data-card ohm-card">
        <div className="bond-pair">
          <TokenStack tokens={bond.bondIconSvg} />
          <div className="bond-name">
            <Typography>{bond.displayName}</Typography>
            {bond && bond.isLP ? (
              <div>
                <Link href={bond.lpUrl} target="_blank">
                  <Typography variant="body1">
                    <Trans>Get LP</Trans>
                    <SvgIcon component={ArrowUp} htmlColor="#A3A3A3" />
                  </Typography>
                </Link>
              </div>
            ) : (
              <div>
                <Link href={getArbitrumscanUrl({ bond, networkId })} target="_blank">
                  <Typography variant="body1">
                    <Trans>View Asset</Trans>
                    <SvgIcon component={ArrowUp} htmlColor="#A3A3A3" />
                  </Typography>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="data-row">
          <Typography>
            <Trans>Price</Trans>
          </Typography>
          <Typography className="bond-price">
            <>{isBondLoading ? <Skeleton width="50px" /> : <DisplayBondPrice key={bond.index} bond={bond} />}</>
          </Typography>
        </div>
        <div className="data-row">
          <Typography>
            <Trans>Discount</Trans>
          </Typography>
          <Typography>
            {isBondLoading ? <Skeleton width="50px" /> : <DisplayBondDiscount key={bond.index} bond={bond} />}
          </Typography>
        </div>
        <div className="data-row">
          <Typography>
            <Trans>Duration</Trans>
          </Typography>
          <Typography>{isBondLoading ? <Skeleton width="50px" /> : bond.duration}</Typography>
        </div>

        {/* <div className="data-row">
          <Typography>
            <Trans>Purchased</Trans>
          </Typography>
          <Typography>
            {isBondLoading ? (
              <Skeleton width="80px" />
            ) : (
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(bond.purchased)
            )}
          </Typography>
        </div> */}
        <Link component={NavLink} to={`/bonds/${bond.index}`}>
          <TertiaryButton fullWidth disabled={bond.soldOut}>
            {bond.soldOut ? t`Sold Out` : t`Bond ${bond.displayName}`}
          </TertiaryButton>
        </Link>
      </Paper>
    </Slide>
  );
}

export function BondTableData({ bond, networkId }: { bond: IBondV2; networkId: NetworkId }) {
  // Use BondPrice as indicator of loading.
  const isBondLoading = !bond.priceUSD ?? true;

  return (
    <TableRow id={`${bond.index}--bond`}>
      <TableCell align="left" className="bond-name-cell">
        {bond.isLP && bond.displayName === "HDX-ETH LP" ? (
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={hdxIcon}
              style={{
                width: "35px",
                height: "35px",
              }}
            />
            <img src={ethIcon} style={{ width: "35px", height: "35px", position: "absolute", left: "30px" }} />
          </div>
        ) : (
          <TokenStack tokens={bond.bondIconSvg} />
        )}

        <div className="bond-name">
          {bond && bond.isLP ? (
            <>
              <Typography style={{ paddingLeft: "5px" }} variant="body1">
                {bond.displayName}
              </Typography>
              <Link style={{ paddingLeft: "5px" }} color="primary" href={bond.lpUrl} target="_blank">
                <Typography variant="body1">
                  <Trans>Get LP</Trans>
                  <SvgIcon component={ArrowUp} htmlColor="#A3A3A3" />
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Typography variant="body1">{bond.displayName}</Typography>
              <Link color="primary" href={getArbitrumscanUrl({ bond, networkId })} target="_blank">
                <Typography variant="body1">
                  <Trans>View Asset</Trans>
                  <SvgIcon component={ArrowUp} htmlColor="#A3A3A3" />
                </Typography>
              </Link>
            </>
          )}
          {/* <Typography>{bond.fixedTerm ? t`Fixed Term` : t`Fixed Expiration`}</Typography> */}
        </div>
      </TableCell>
      <TableCell align="left">
        <Typography>
          <>{isBondLoading ? <Skeleton width="50px" /> : <DisplayBondPrice key={bond.index} bond={bond} />}</>
        </Typography>
      </TableCell>
      <TableCell align="left">{isBondLoading ? <Skeleton /> : bond.duration}</TableCell>
      <TableCell>
        <Link component={NavLink} to={`/bonds/${bond.index}`}>
          <TertiaryButton fullWidth disabled={bond.soldOut}>
            {bond.soldOut ? t`Sold Out` : t`do_bond`}
          </TertiaryButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}
