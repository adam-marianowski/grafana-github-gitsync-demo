// Import the appropriate Grafana Foundation SDK packages
import * as common from "@grafana/grafana-foundation-sdk/common";
import * as dashboard from "@grafana/grafana-foundation-sdk/dashboard";
import * as stat from "@grafana/grafana-foundation-sdk/stat";
import * as testdata from "@grafana/grafana-foundation-sdk/testdata";
import * as timeseries from "@grafana/grafana-foundation-sdk/timeseries";
import * as fs from "fs";

// Define a data source reference for our testdata data source
const testDataRef: dashboard.DataSourceRef = {
  type: "grafana-testdata-datasource",
  uid: "testdata",
};

// Define our dashboard as strongly typed code
const builder = new dashboard.DashboardBuilder("My Dashboard")
  .withPanel(
    new stat.PanelBuilder()
      .title("Version")
      .reduceOptions(
        new common.ReduceDataOptionsBuilder()
          .calcs(["lastNotNull"])
          .fields("/.*/")
      )
      .datasource(testDataRef)
      .withTarget(
        new testdata.DataqueryBuilder()
          .scenarioId("csv_content")
          .csvContent("version\nv1.2.3")
      )
  )
  .withPanel(
    new timeseries.PanelBuilder()
      .title("Random Time Series")
      .datasource(testDataRef)
      .withTarget(new testdata.DataqueryBuilder().scenarioId("random_walk"))
  );

const dsh = builder.build();

fs.writeFileSync("../grafana/dashboard.json", JSON.stringify(dsh, null, 2), {
  encoding: "utf8",
});
