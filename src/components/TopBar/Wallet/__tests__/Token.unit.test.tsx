import { screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatCurrency } from "src/helpers";

import { render } from "../../../../testUtils";
import { Token } from "../Token";

describe("<Token/>", () => {
  let container: HTMLElement;
  const balance = "0";
  const totalBalance = "33.330000000";
  const price = 99.99;
  const decimals = 9;
  const onChangeExpanded = jest.fn();
  const onAddTokenToWallet = jest.fn();

  beforeEach(() => {
    const component = render(
      <Token
        expanded={false}
        onChangeExpanded={onChangeExpanded}
        onAddTokenToWallet={onAddTokenToWallet}
        decimals={decimals}
        symbol={"OHM"}
        address={""}
        icon={"33T"}
        balance={balance}
        price={price}
        totalBalance={totalBalance}
      />,
    );
    container = component.container;
  });

  it("Should match previous snapshot", () => {
    expect(container).toMatchSnapshot();
  });

  it("shows the total balance", () => {
    const sigFigs = 12;

    const tokenBalanceEl = getByTestId(container, "balance-token");

    expect(tokenBalanceEl).toBeInTheDocument();

    expect(tokenBalanceEl.textContent).toBe(totalBalance.substring(0, sigFigs));
  });

  it("call onChangeExpanded when clicked", () => {
    const mainButton = screen.getByRole("button", { name: /ohm/i });
    expect(mainButton).toBeInTheDocument();

    userEvent.click(mainButton);

    expect(onChangeExpanded).toHaveBeenCalled();
  });
});
