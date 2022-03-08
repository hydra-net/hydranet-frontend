import "./Stake.scss";

import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";

import { StakeArea } from "./components/StakeArea/StakeArea";

const Stake: React.FC = () => {
  const history = useHistory();
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "stake", networkID: networkId, history });

  return (
    <div id="stake-view">
      <StakeArea />
    </div>
  );
};

export default memo(Stake);
