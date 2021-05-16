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
    const companyCategories = companyTotals.map(
      (element) => element["product_company"]
    );
    const companyCategoriesTotals = companyTotals.map(
      (element) => element.total_amount
    );
    return (
      <Grid item sm={3} style={{ paddingLeft: "10vw" }}>
        <ETLChartComponent
          category={companyCategories}
          categoryTotals={companyCategoriesTotals}
        />
      </Grid>
    );
  }, [companyTotals]);
  const renderCategoryChart = useMemo(() => {
    const categoryategories = categoryTotals.map(
      (element) => element["product_category_name"]
    );
    const categoryategoriesTotal = categoryTotals.map(
      (element) => element.total_amount
    );

    return (
      <Grid item sm={3} style={{ paddingLeft: "20vw" }}>
        <ETLChartComponent
          category={categoryategories}
          categoryTotals={categoryategoriesTotal}
        />
      </Grid>
    );
  }, [categoryTotals]);
  const renderClientChart = useMemo(() => {
    const clientCategories = clientTotals.map(
      (element) => element["client_name"]
    );
    const clientCategoriesTotal = clientTotals.map(
      (element) => element.total_amount
    );
    return (
      <Grid item sm={3}>
        <ETLChartComponent
          category={clientCategories}
          categoryTotals={clientCategoriesTotal}
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
