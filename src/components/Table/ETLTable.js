import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { MMButton } from "../common/MMButton";
import EnhancedTable from "./ETLTableComponent";
import ETLPieChart from "../Charts/ETLPieChart";
import { executeRestqlQuery, getBankClientNames } from "../../util/services";
import _ from "lodash";
import useInterval from "../../hooks/useInterval";

export const ETLTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [bankClientNames, setBankClients] = useState([]);
  const [anonymousBankClientNames, setAnonymousBankClientNames] = useState([]);
  const [tableType, setTableType] = useState("Transactions");
  const [totals, setTotals] = useState([0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  // const offsetValueRef = useRef(null);

  const getAnonymousBankClientName = useCallback(async () => {
    if (anonymousBankClientNames.length >= 500) {
      return;
    }

    const _anonymousBankClientNames = await getBankClientNames(
      "getBankAnonymizationClient"
    );
    const sliceArray = _.uniqBy(_anonymousBankClientNames, "id");
    setAnonymousBankClientNames(() => [...sliceArray]);
  }, [anonymousBankClientNames.length]);

  const getPieChartData = useCallback(async () => {
    const result = await executeRestqlQuery("getTotals");
    setTotals(() => [...result]);
  }, []);

  useEffect(() => {
    const getBankClients = async () => {
      const bankClientNames = await getBankClientNames("getBankClients");
      setBankClients(() => [...bankClientNames]);
    };

    getBankClients();
  }, []);

  useEffect(() => {
    getAnonymousBankClientName();
  }, [getAnonymousBankClientName]);

  useEffect(() => {
    getPieChartData();
  }, [getPieChartData]);

  useInterval(getAnonymousBankClientName, 5000);
  useInterval(getPieChartData, 30000);

  const getTableData = useCallback(async () => {
    let result = [];
    try {
      switch (tableType) {
        case "Transactions":
          result = await executeRestqlQuery("getBanksTxnsByClient", {
            clientName: selectedClient,
          });
          break;
        case "Subscriptions":
          result = await executeRestqlQuery("getBankSubscriptionsByClient", {
            clientName: selectedClient,
          });
          break;
        case "Anonymous":
          result = await executeRestqlQuery("getBankTxnsByAnnonymousClient", {
            clientName: selectedClient,
          });
          break;
        default:
          result = await executeRestqlQuery("getBanksTxnsByClient", {
            clientName: selectedClient,
          });
          break;
      }
      setTableData(() => [...result]);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  }, [tableType, selectedClient]);

  useEffect(() => {
    setIsLoading(true);
    getTableData();
  }, [tableType, getTableData, selectedClient]);

  const handleTableType = useCallback((name) => {
    setTableType(name);
  }, []);

  const handleSelectClient = useCallback((event) => {
    setSelectedClient(event.id);
  }, []);

  const renderTableButtons = useMemo(() => {
    return (
      <Grid
        container
        spacing={1}
        style={{
          width: "40%",
          flexWrap: "nowrap",
        }}
      >
        <Grid item xs>
          <MMButton
            buttonText="Transactions"
            buttonType="primary"
            smValue={12}
            id={"Transactions"}
            // disableButton={isStartLoading || isStopLoading}
            // loading={isStartLoading}
            onClickCb={() => handleTableType("Transactions")}
            buttonStyle={{
              backgroundColor:
                tableType === "Transactions"
                  ? "#338AD0"
                  : "rgba(211,225,240,1)",
            }}
          />
        </Grid>
        <Grid item xs>
          <MMButton
            buttonText="Subscriptions"
            buttonType="primary"
            smValue={12}
            id={"Subscriptions"}
            // disableButton={isStartLoading || isStopLoading}
            // loading={isStartLoading}
            onClickCb={() => handleTableType("Subscriptions")}
            buttonStyle={{
              backgroundColor:
                tableType === "Subscriptions"
                  ? "#338AD0"
                  : "rgba(211,225,240,1)",
            }}
          />
        </Grid>
        <Grid item xs>
          <MMButton
            buttonText="Anonymous"
            buttonType="primary"
            smValue={12}
            id={"Anonymous"}
            // disableButton={isStartLoading || isStopLoading}
            // loading={isStartLoading}
            onClickCb={() => handleTableType("Anonymous")}
            buttonStyle={{
              backgroundColor:
                tableType === "Anonymous" ? "#338AD0" : "rgba(211,225,240,1)",
            }}
          />
        </Grid>
      </Grid>
    );
  }, [handleTableType, tableType]);

  const renderTable = useMemo(() => {
    return (
      <EnhancedTable
        bankClientNames={
          tableType === "Anonymous" ? anonymousBankClientNames : bankClientNames
        }
        selectedClient={selectedClient}
        handleSelectClient={handleSelectClient}
        tableData={tableData}
        tableType={tableType}
        isLoading={isLoading}
      />
    );
  }, [
    bankClientNames,
    anonymousBankClientNames,
    tableData,
    tableType,
    isLoading,
    selectedClient,
    handleSelectClient,
  ]);
  return (
    <Paper style={{"margin":"0.75rem", "padding":"2rem"}}>
      <Grid container>
        <Grid item xs={9}>
          {renderTableButtons}
          {renderTable}
        </Grid>
        <Grid item xs={3}>
          {_.sum(totals) !== 0 ? (
            <ETLPieChart chartData={totals} />
          ) : (
            <Typography variant="h6" align="center">
              No Data to show for pie chart
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
