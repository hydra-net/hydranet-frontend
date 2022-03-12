import { Trans } from "@lingui/macro";
import { ReactElement } from "react";

export interface ExternalUrl {
  title: ReactElement;
  url: string;
  icon: string;
}

const externalUrls: ExternalUrl[] = [
  {
    title: <Trans>Forum</Trans>,
    url: "https://forum.hydranet.ai/",
    icon: "forum",
  },
  {
    title: <Trans>Governance</Trans>,
    url: "https://vote.hydranet.ai/",
    icon: "governance",
  },
  {
    title: <Trans>Docs</Trans>,
    url: "https://docs.hydranet.ai/",
    icon: "docs",
  },
  {
    title: <Trans>Bug Bounty</Trans>,
    url: "https://immunefi.com/bounty/olympus/",
    icon: "bug-report",
  },
  {
    title: <Trans>Grants</Trans>,
    url: "https://grants.hydranet.ai/",
    icon: "grants",
  },
];

export default externalUrls;
