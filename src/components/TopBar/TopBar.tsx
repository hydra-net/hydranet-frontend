import "./TopBar.scss";

import { AppBar, Box, Button, SvgIcon, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

import { ReactComponent as MenuIcon } from "../../assets/icons/hamburger.svg";
import Wallet from "./Wallet";

const DRAWER_WIDTH = 280;

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      padding: "10px",
    },
    justifyContent: "flex-end",
    alignItems: "flex-end",
    background: "transparent",
    backdropFilter: "none",
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(981)]: {
      display: "none",
    },
  },
  alertWrapper: {
    padding: "1rem",
    width: "100%",
    [theme.breakpoints.up(981)]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  hideOnMobile: {
    display: "none",
    [theme.breakpoints.up(981)]: {
      display: "block",
    },
  },
  alert: {
    width: "100%",
    // message
    "& [class$='message']": {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      fontSize: "1rem",
      [theme.breakpoints.up(1300)]: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    "& [class$='action']": {
      width: "auto",
      marginRight: 0,
    },
    "& p": {
      margin: ".5rem 0",
    },
  },
  redirectLinkToSwap: {
    color: "white",
    margin: ".5rem .2rem",
    minHeight: 0,

    "&:hover": {
      color: "#F8CC82",
    },
  },
}));

interface TopBarProps {
  theme: string;
  toggleTheme: (e: KeyboardEvent) => void;
  handleDrawerToggle: () => void;
}

function TopBar({ handleDrawerToggle }: TopBarProps) {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);
  const classes = useStyles();

  const handleCloseAlert = () => setIsAlertVisible(false);
  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className="dapp-topbar">
        <Button
          id="hamburger"
          aria-label="open drawer"
          size="large"
          variant="contained"
          color="secondary"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <SvgIcon component={MenuIcon} />
        </Button>
        <Box width={"100%"} display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
          <Wallet />
          {/* <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} /> */}
          {/* <LocaleSwitcher
            initialLocale={i18n.locale}
            locales={locales}
            onLocaleChange={selectLocale}
            label={t`Change locale`}
          /> */}
        </Box>
      </Toolbar>
      {isAlertVisible ? (
        <div className={classes.alertWrapper}>
          <Alert icon={false} variant="filled" severity={"error"} className={classes.alert} onClose={handleCloseAlert}>
            <p>Be aware! The swap will end on May 20th. You will not be able to trade or swap XSN after this date.</p>
            <a
              href="https://swap.hydranet.ai"
              target={"_blank"}
              className={`${classes.redirectLinkToSwap} call-to-action-link`}
            >
              <strong>Swap here now</strong>
            </a>
          </Alert>
        </div>
      ) : null}
    </AppBar>
  );
}

export default TopBar;
