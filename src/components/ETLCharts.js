import React, { useCallback, useEffect, useMemo } from "react";
import { Grid, TextField } from "@material-ui/core";
import { MMHeading } from "./common/MMHeading";
import ETLChartComponent from "./Charts/ETLChartComponent";

export const ETLCharts = ({
  topN,
  handleTopN,
  clientTotals,
  companyTotals,
  categoryTotals,
}) => {
  const renderCompanyChart = useMemo(() => {
    return (
      <Grid item sm={4}>
        <ETLChartComponent
          chartData={companyTotals}
          parserType="companyTotals"
        />
      </Grid>
    );
  }, [companyTotals]);
  const renderCategoryChart = useMemo(() => {
    return (
      <Grid item sm={4}>
        <ETLChartComponent
          chartData={categoryTotals}
          parserType="categoryTotals"
        />
      </Grid>
    );
  }, [categoryTotals]);

  const renderClientChart = useMemo(() => {
    return (
      <Grid item sm={4}>
        <ETLChartComponent chartData={clientTotals} parserType="clientTotals" />
      </Grid>
    );
  }, [clientTotals]);

  const renderTopN = useMemo(() => {
    return (
      <>
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
      </>
    );
  }, [topN, handleTopN]);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        style={{ paddingTop: "30px", paddingLeft: "10vw" }}
      >
        {renderTopN}
      </Grid>
      <Grid container direction="row" style={{ paddingTop: "30px" }}>
        {renderClientChart}
        {renderCompanyChart}
        {renderCategoryChart}
        {/* <Grid item>
          //bublechart
          <ETLChartComponent
            category={companyCategories}
            categoryTotals={companyTotals}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
