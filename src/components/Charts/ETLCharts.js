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
  webSocketOpen,
}) => {
  const renderCompanyChart = useMemo(() => {
    return (
      <Grid
        item
        // sm={4}
        style={{
          boxShadow: "2px 5px 5px 2px #d4d4d4",
          borderRadius: "0.375rem",
        }}
      >
        <Card>
          <CardContent>
            <ETLChartComponent
              chartData={companyTotals}
              parserType="companyTotals"
              chartText="Company Totals"
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }, [companyTotals]);
  const renderCategoryChart = useMemo(() => {
    return (
      <Grid
        item
        // sm={4}
        style={{
          boxShadow: "2px 5px 5px 2px #d4d4d4",
          borderRadius: "0.375rem",
        }}
      >
        <Card>
          <CardContent>
            <ETLChartComponent
              chartData={categoryTotals}
              parserType="categoryTotals"
              chartText="Category Totals"
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }, [categoryTotals]);

  const renderClientChart = useMemo(() => {
    return (
      <Grid
        item
        // sm={4}
        style={{
          boxShadow: "2px 5px 5px 2px #d4d4d4",
          borderRadius: "0.375rem",
        }}
      >
        <Card>
          <CardContent>
            <ETLChartComponent
              chartData={clientTotals}
              parserType="clientTotals"
              chartText="Client Totals"
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }, [clientTotals]);

  const renderTopN = useMemo(() => {
    return (
      <>
        <Grid item>
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
            disabled={webSocketOpen}
          />
        </Grid>
      </>
    );
  }, [topN, webSocketOpen, handleTopN]);

  return (
    <div
      style={{
        marginLeft: "3vw",
        marginRight: "3vw",
      }}
    >
      <Grid
        container
        direction="row"
        justify="flex-start"
        style={{ paddingTop: "30px" }}
      >
        {renderTopN}
      </Grid>
      <Grid container spacing={5} style={{}}>
        <Grid item xs>
          {renderClientChart}
        </Grid>
        <Grid item xs>
          {renderCompanyChart}
        </Grid>
        <Grid item xs>
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
