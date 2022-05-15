import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "../../../../testUtils";
import InitialWalletView from "../InitialWalletView";

describe("<InitialWalletView/>", () => {
  let container: HTMLElement;
  const onClose = jest.fn();

  beforeEach(() => {
    const component = render(<InitialWalletView onClose={onClose} />);
    container = component.container;
  });

  it("Should render component", () => {
    expect(container).toMatchSnapshot();
  });

  it("Has a close button that calls onClose", () => {
    const closeBtn = screen.getByLabelText("close wallet");
    userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("Has disconnect button", () => {
    const disconnectButton = screen.getByText(/disconnect/i);
    expect(disconnectButton).toBeInTheDocument();
  });
});
