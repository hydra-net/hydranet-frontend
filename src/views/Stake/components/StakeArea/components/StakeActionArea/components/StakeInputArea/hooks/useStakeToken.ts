import { parseUnits } from "@ethersproject/units";
import { t } from "@lingui/macro";
import { ContractReceipt } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { GOHM_ADDRESSES, OHM_ADDRESSES, SOHM_ADDRESSES, STAKING_ADDRESSES } from "src/constants/addresses";
import { useWeb3Context } from "src/hooks";
import { balanceQueryKey, useBalance } from "src/hooks/useBalance";
import { useDynamicStakingContract } from "src/hooks/useContract";
import { NetworkId } from "src/networkDetails";
import { error as createErrorToast, info as createInfoToast } from "src/slices/MessagesSlice";

export const useStakeToken = (toToken: "sHDX" | "gHDX") => {
  const dispatch = useDispatch();
  const client = useQueryClient();
  const { address, networkId } = useWeb3Context();
  const balances = useBalance(OHM_ADDRESSES);
  const contract = useDynamicStakingContract(STAKING_ADDRESSES, true);

  return useMutation<ContractReceipt, Error, string>(
    async amount => {
      if (!amount || isNaN(Number(amount))) throw new Error(t`Please enter a number`);

      const parsedAmount = parseUnits(amount, 9);

      if (!parsedAmount.gt(0)) throw new Error(t`Please enter a number greater than 0`);

      const balance = balances[NetworkId.ARBITRUM].data;

      if (!balance) throw new Error(t`Please refresh your page and try again`);

      if (parsedAmount.gt(balance)) throw new Error(t`You cannot stake more than your HDX balance`);

      if (!contract) throw new Error(t`Please switch to the Ethereum network to stake your HDX`);

      if (!address) throw new Error(t`Please refresh your page and try again`);

      const shouldRebase = toToken === "sHDX";

      const transaction = await contract.stake(address, parsedAmount, shouldRebase, true);
      return transaction.wait();
    },
    {
      onError: error => {
        dispatch(createErrorToast(error.message));
      },
      onSuccess: async () => {
        const keysToRefetch = [
          balanceQueryKey(address, OHM_ADDRESSES, networkId),
          balanceQueryKey(address, toToken === "sHDX" ? SOHM_ADDRESSES : GOHM_ADDRESSES, networkId),
        ];

        const promises = keysToRefetch.map(key => client.refetchQueries(key, { active: true }));

        await Promise.all(promises);

        dispatch(createInfoToast(t`Successfully staked HDX`));
      },
    },
  );
};
