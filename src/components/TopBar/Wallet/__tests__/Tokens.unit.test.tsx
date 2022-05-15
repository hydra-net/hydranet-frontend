import { screen } from "@testing-library/react";

import { render } from "../../../../testUtils";
import { Tokens } from "../Token";

describe("<Tokens/>", () => {
  let container: HTMLElement;

  beforeEach(() => {
    const component = render(<Tokens />);
    container = component.container;
  });

  it("should render component", () => {
    expect(container).toMatchSnapshot();
  });

  it("should show default tokens", async () => {
    const HDXElement = await screen.findByText(/^HDX/i);
    const sHDXElement = await screen.findByText(/sHDX/i);
    const gHDXElement = await screen.findByText(/gHDX/i);

    expect(HDXElement).toBeInTheDocument();
    expect(sHDXElement).toBeInTheDocument();
    expect(gHDXElement).toBeInTheDocument();
  });
});
