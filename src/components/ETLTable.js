import React, { useMemo } from "react";
import { Grid, CardContent, Card } from "@material-ui/core";
import { MMButton } from "./common/MMButton";
import EnhancedTable from "./Table/ETLTableComponent";
import ETLSample from "../ETLSample";

export const ETLTable = ({
  bankClientNames,
  selectedClient,
  handleSelectClient,
  handleTableType,
  tableData,
  tableType,
}) => {
  const renderTableButtons = useMemo(() => {
    return (
      // <Grid container direction="row">
      //   <MMButton
      //     buttonText={"Transactions"}
      //     smValue={2}
      //     buttonStyle={{
      //       marginLeft: "1vw",
      //       backgroundColor:
      //         tableType === "Transactions" ? "#338AD0" : "#696969",
      //     }}
      //     onClickCb={() => handleTableType("Transactions")}
      //   />
      //   <MMButton
      //     buttonText={"Subscriptions"}
      //     smValue={2}
      //     buttonStyle={{
      //       marginLeft: "1vw",
      //       backgroundColor:
      //         tableType === "Subscriptions" ? "#338AD0" : "#696969",
      //     }}
      //     onClickCb={() => handleTableType("Subscriptions")}
      //   />
      //   <MMButton
      //     buttonText={"Anonymous"}
      //     smValue={2}
      //     buttonStyle={{
      //       marginLeft: "1vw",
      //       backgroundColor: tableType === "Anonymous" ? "#338AD0" : "#696969",
      //     }}
      //     onClickCb={() => handleTableType("Anonymous")}
      //   />
      // </Grid>

      <Grid container spacing={2} style={{ width: "40%" }}>
        <Grid item xs>
          <MMButton
            buttonText="Transactions"
            buttonType="primary"
            smValue={12}
            // disableButton={isStartLoading || isStopLoading}
            // loading={isStartLoading}
            // onClickCb={handleOnStart}
            // buttonStyle={{ marginRight: "20px" }}
          />
        </Grid>
        <Grid item xs>
          <MMButton
            buttonText="Subscriptions"
            buttonType="primary"
            smValue={12}
            // disableButton={isStartLoading || isStopLoading}
            // loading={isStartLoading}
            // onClickCb={handleOnStart}
            // buttonStyle={{ marginRight: "20px" }}
          />
        </Grid>
        <Grid item xs>
          <MMButton
            buttonText="Anonymous"
            buttonType="primary"
            smValue={12}
            // disableButton={isStartLoading || isStopLoading}
            // loading={isStartLoading}
            // onClickCb={handleOnStart}
            // buttonStyle={{ marginRight: "20px" }}
          />
        </Grid>
      </Grid>
    );
  }, [handleTableType, tableType]);

  const renderTable = useMemo(() => {
    return (
      <EnhancedTable
        bankClientNames={bankClientNames}
        selectedClient={selectedClient}
        handleSelectClient={handleSelectClient}
        tableData={tableData}
        tableType={tableType}
      />
    );
  }, [
    bankClientNames,
    tableData,
    tableType,
    selectedClient,
    handleSelectClient,
  ]);
  return (
    <Grid container spacing={3} style={{ padding: "3vw" }}>
      <Grid item xs={9}>
        {renderTableButtons}
        {renderTable}
      </Grid>

      <Grid item xs={3}>
        <Card>
          <CardContent>
            <ETLSample />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
