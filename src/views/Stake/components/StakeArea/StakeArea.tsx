import { Grid, Zoom } from "@material-ui/core";
import { MetricCollection, Paper } from "@olympusdao/component-library";
import { useState } from "react";
import { useStakingRebaseRate } from "src/hooks/useStakingRebaseRate";
import { StakingAPY } from "src/views/TreasuryDashboard/components/Metric/Metric";

import RebaseTimer from "./components/RebaseTimer/RebaseTimer";
import { StakeActionArea } from "./components/StakeActionArea/StakeActionArea";

export const StakeArea: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { data: rebaseRate } = useStakingRebaseRate();

  return (
    <Zoom in onEntered={() => setIsZoomed(true)}>
      <Paper headerText={`Stake`} subHeader={<RebaseTimer />}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <MetricCollection>
              {rebaseRate !== 0 && <StakingAPY className="stake-apy" />}

              {/* <TotalValueDeposited className="stake-tvl" /> */}

              {/* <CurrentIndex className="stake-index" /> */}
            </MetricCollection>
          </Grid>

          <div className="staking-area">
            <StakeActionArea isZoomed={isZoomed} />
          </div>
        </Grid>
      </Paper>
    </Zoom>
  );
};
