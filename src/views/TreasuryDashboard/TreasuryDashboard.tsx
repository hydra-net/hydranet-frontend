import "./TreasuryDashboard.scss";

import { Box, Container, useMediaQuery } from "@material-ui/core";
import { Metric, MetricCollection, Paper } from "@olympusdao/component-library";
import { memo } from "react";

import { BackingPerOHM, CircSupply, CurrentIndex, StakedTokens } from "./components/Metric/Metric";

const sharedMetricProps: PropsOf<typeof Metric> = { labelVariant: "h6", metricVariant: "h5" };

const TreasuryDashboard = memo(() => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
        }}
      >
        <Box className="hero-metrics">
          <Paper className="ohm-card">
            <MetricCollection>
              <CircSupply {...sharedMetricProps} />
              <BackingPerOHM {...sharedMetricProps} />
              <CurrentIndex {...sharedMetricProps} />
              <StakedTokens {...sharedMetricProps} />
            </MetricCollection>
          </Paper>
        </Box>
      </Container>
    </div>
  );
});

export default TreasuryDashboard;
