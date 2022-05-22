import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

const DRAWER_WIDTH = 280;

const useStyles = makeStyles(theme => ({
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
type BannerProps = {
  title: string;
  callbackUrl: string;
  callbackText: string;
};
const BannerTopBar = ({ title, callbackUrl, callbackText }: BannerProps) => {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);
  const handleCloseAlert = () => setIsAlertVisible(false);

  const classes = useStyles();

  return (
    <>
      {isAlertVisible ? (
        <div className={classes.alertWrapper}>
          <Alert icon={false} variant="filled" severity={"error"} className={classes.alert} onClose={handleCloseAlert}>
            <p>{title}</p>
            {callbackUrl ? (
              <a href={callbackUrl} target={"_blank"} className={`${classes.redirectLinkToSwap} call-to-action-link`}>
                <strong>{callbackText}</strong>
              </a>
            ) : null}
          </Alert>
        </div>
      ) : null}
    </>
  );
};
export default BannerTopBar;
