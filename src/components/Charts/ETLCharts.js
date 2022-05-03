import React, { useMemo } from "react";
import { Grid, TextField, Card, CardContent } from "@material-ui/core";
import { MMHeading } from "../common/MMHeading";
import ETLChartComponent from "./ETLChartComponent";

export const ETLCharts = ({
  topN,
  handleTopN,
  clientTotals,
  companyTotals,
  categoryTotals,
  // webSocketOpen,
}) => {
  const renderCompanyChart = useMemo(() => {
    return (
      <Grid
        item
        // sm={4}
        // style={{
        //   boxShadow: "2px 5px 5px 2px #d4d4d4",
        //   borderRadius: "0.375rem",
        // }}
      >
        <ETLChartComponent
          chartData={companyTotals}
          parserType="companyTotals"
          chartText="Merchant Totals($)"
        />
      </Grid>
    );
  }, [companyTotals]);
  const renderCategoryChart = useMemo(() => {
    return (
      <Grid
        item
        // sm={4}
        // style={{
        //   boxShadow: "2px 5px 5px 2px #d4d4d4",
        //   borderRadius: "0.375rem",
        // }}
      >
        <ETLChartComponent
          chartData={categoryTotals}
          parserType="categoryTotals"
          chartText="Category Totals($)"
        />
      </Grid>
    );
  }, [categoryTotals]);

  const renderClientChart = useMemo(() => {
    return (
      <Grid
        item
        // sm={4}
        // style={{
        //   boxShadow: "2px 5px 5px 2px #d4d4d4",
        //   borderRadius: "0.375rem",
        // }}
      >
        <ETLChartComponent
          chartData={clientTotals}
          parserType="clientTotals"
          chartText="Purchaser Totals($)"
        />
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
            //  disabled={webSocketOpen}
          />
        </Grid>
      </>
    );
  }, [topN, handleTopN]);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-start"
        style={{ paddingTop: "30px" }}
      >
        {renderTopN}
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          {renderClientChart}
        </Grid>
        <Grid item xs={4}>
          {renderCompanyChart}
        </Grid>
        <Grid item xs={4}>
          {renderCategoryChart}
        </Grid>
      </Grid>
      {/* <Grid item>
          //bublechart
          <ETLChartComponent
            category={companyCategories}
            categoryTotals={companyTotals}
          />
        </Grid> */}
    </div>
  );
};
