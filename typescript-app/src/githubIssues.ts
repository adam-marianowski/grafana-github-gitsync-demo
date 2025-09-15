import {
  DashboardBuilder,
  type DataSourceRef,
} from "@grafana/grafana-foundation-sdk/dashboard";
import * as timeseries from "@grafana/grafana-foundation-sdk/timeseries";
import * as fs from "fs";
import GithubCommitsQueryBuilder from "./queryBuilder/GithubCommitsQueryBuilder.ts";

const githubDataRef: DataSourceRef = {
  type: "grafana-github-datasource",
  uid: "github",
};

const builder = new DashboardBuilder("Grafana repo monitoring").withPanel(
  new timeseries.PanelBuilder()
    .title("grafana repo issues")
    .datasource(githubDataRef)
    .withTarget(new GithubCommitsQueryBuilder("grafana", "grafana", "Issues"))
);

const dsh = builder.build();

fs.writeFileSync(
  "../grafana/grafana-repo-monitoring.json",
  JSON.stringify(dsh, null, 2),
  {
    encoding: "utf8",
  }
);
