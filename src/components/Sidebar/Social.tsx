import { Link } from "@material-ui/core";
import { Icon } from "@olympusdao/component-library";
import React from "react";

const Social: React.FC = () => (
  <div className="social-row">
    <Link href="https://github.com/hydra-net" target="_blank">
      <Icon name="github" />
    </Link>
  </div>
);

export default Social;
