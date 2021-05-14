import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { MMHeading } from "./common/MMHeading";
import ETLChartComponent from "./Charts/ETLChartComponent";

export const ETLCharts = ({
  topN,
  handleTopN,
  clientCategories,
  clientTotals,
  companyCategories,

  companyTotals,

  categoryCategories,
  categoryTotals,
}) => {
  console.log(`Logged output: companyCategories`, companyCategories);
  console.log(`Logged output: companyTotals`, companyTotals);
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-Start"
        style={{ paddingTop: "30px", paddingLeft: "10vw" }}
      >
        <Grid item style={{ marginRight: "10px" }}>
          <MMHeading
            title="TopN"
            justifyValue="center"
            typographyVariant="h6"
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="TopN"
            variant="outlined"
            size="small"
            onChange={handleTopN}
            value={topN}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ paddingTop: "30px" }}>
        <Grid item sm={3}>
          <ETLChartComponent
            category={clientCategories}
            categoryTotals={clientTotals}
          />
        </Grid>
        <Grid item sm={3} style={{ paddingLeft: "10vw" }}>
          <ETLChartComponent
            category={companyCategories}
            categoryTotals={companyTotals}
          />
        </Grid>
        <Grid item sm={3} style={{ paddingLeft: "20vw" }}>
          <ETLChartComponent
            category={categoryCategories}
            categoryTotals={categoryTotals}
          />
        </Grid>
        <Grid item>
          {/* //bublechart */}
          {/* <ETLChartComponent
            category={companyCategories}
            categoryTotals={companyTotals}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
