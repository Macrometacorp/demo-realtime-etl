import React, { useMemo } from "react";
import { Grid } from "@material-ui/core";
import { MMButton } from "./common/MMButton";
import EnhancedTable from "./Table/ETLTableComponent";
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
      <Grid container direction="row">
        <MMButton
          buttonText={"Transactions"}
          smValue={2}
          buttonStyle={{
            marginLeft: "1vw",
            backgroundColor:
              tableType === "Transactions" ? "#338AD0" : "#696969",
          }}
          onClickCb={() => handleTableType("Transactions")}
        />
        <MMButton
          buttonText={"Subscriptions"}
          smValue={2}
          buttonStyle={{
            marginLeft: "1vw",
            backgroundColor:
              tableType === "Subscriptions" ? "#338AD0" : "#696969",
          }}
          onClickCb={() => handleTableType("Subscriptions")}
        />
        <MMButton
          buttonText={"Anonymous"}
          smValue={2}
          buttonStyle={{
            marginLeft: "1vw",
            backgroundColor: tableType === "Anonymous" ? "#338AD0" : "#696969",
          }}
          onClickCb={() => handleTableType("Anonymous")}
        />
      </Grid>
    );
  }, [handleTableType, tableType]);

  const renderTable = useMemo(() => {
    console.log("renderRabke");
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
    <div
      style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "10vh" }}
    >
      {renderTableButtons}
      {renderTable}
    </div>
  );
};
