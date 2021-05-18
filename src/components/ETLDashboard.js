import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ETLHeaderArea } from "./ETLHeaderArea";
import { ETLCharts } from "./ETLCharts";
import { ETLStreamButtons } from "./ETLStreamButtons";
import { ETLTable } from "./ETLTable";
import jsc8 from "jsc8";
import _ from "lodash";

import {
  streamNamesArray,
  streamTableNamesArray,
} from "../util/streamNamesArray";
import { parseMessage, updatedArray } from "../util/helperFunctions";
// import { MMButton } from "./common/MMButton";

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        height: "56px",
      },
    },
    MuiInputBase: {
      root: {
        height: "30px",
        width: "60px",
      },
    },
  },
});

const client = new jsc8({
  url: "https://anurag.eng.macrometa.io",
  apiKey:
    "anurag_etl_gmail.com.anurag_etl_key.46LfTHq3Ub6j6EBmf0vpjLSgATPvxrEB6Gz2rVu5B9rgbTWvbrGKmt0GFaeGZolkada923",
});
const streamNameConnectionName = [
  "EtlBankClientNameTotalStream",
  "EtlBankCompanyNameTotalStream",
  "EtlBankCategoryNameTotalStream",
];

const keys = ["client_name", "product_company", "product_category_name"];
const ETLDashboard = () => {
  const [categoriesTotal, setCategoriesTotal] = useState([]);
  const [clientsTotal, setClientsTotal] = useState([]);
  const [companyTotal, setCompaniesTotal] = useState([]);
  const [streamConnections, setStreamConnections] = useState([]);
  const [isClearLoading, setIsClearLoading] = useState(false);
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isStopLoading, setIsStopLoading] = useState(false);
  const [tableType, setTableType] = useState("Transactions");
  const [topN, setTopN] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [bankClientNames, setBankClients] = useState([]);
  const [anonymousBankClientNames, setAnonymousBankClientNames] = useState([]);

  useEffect(() => {
    executeRestqlQuery("getBankClientTotals", {
      topN: topN,
    }).then((result) => {
      //console.log(`Logged output: ETLDashboard -> result`, result);
      setClientsTotal(() => [...result]);
    });
  }, [topN]);

  useEffect(() => {
    executeRestqlQuery("getBankCompanyTotals", {
      topN: topN,
    }).then((result) => {
      // console.log(`Logged output: ETLDashboard -> result`, result);
      setCompaniesTotal(() => [...result]);
    });
  }, [topN]);

  useEffect(() => {
    //console.log("A");
    console.log(`Logged output: ETLDashboard -> msg`);
    executeRestqlQuery("getBankCategoryTotals", {
      topN: topN,
    }).then(async (result) => {
      //console.log(`Logged output: ETLDashboard -> result`, result);
      setCategoriesTotal(() => [...result]);
    });
  }, [topN]);

  const getBankClients = useCallback(async () => {
    let bankClientNames = [],
      anonymousBankClientNames = [];

    for (let i = 1; i <= 10; i++) {
      let result = [],
        results = [];
      result = await executeRestqlQuery("getBankClients", {
        offsetValue: i * 100,
      });
      results = await executeRestqlQuery("getBankAnonymizationClient", {
        offsetValue: i * 100,
      });
      bankClientNames = [...bankClientNames, ...result];
      anonymousBankClientNames = [...anonymousBankClientNames, ...results];
    }
    bankClientNames.sort((a, b) => a.clientName.localeCompare(b.clientName));
    anonymousBankClientNames.sort((a, b) =>
      a.clientName.localeCompare(b.clientName)
    );

    setBankClients(() => [...bankClientNames]);
    setAnonymousBankClientNames(() => [...anonymousBankClientNames]);
  }, []);

  useEffect(() => {
    getBankClients();
  }, [getBankClients]);

  const getTableData = useCallback(async () => {
    let result = [];

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
  }, [tableType, selectedClient]);

  useEffect(() => {
    //console.log("A");
    getTableData();
  }, [tableType, getTableData, selectedClient]);
  useEffect(() => {
    //console.log("A");
    console.log("the tableData is ", tableData);
  }, [tableData]);
  // useEffect(() => {
  //   if (isClearLoading) {

  //   }
  // }, [isClearLoading]);
  const clearTables = async () => {
    console.log(`Logged output: clearTables -> clearTables`);
    for (const element of streamTableNamesArray) {
      await client.collection(element).truncate();
    }
    setIsClearLoading(false);
    setClientsTotal(() => []);
    setCategoriesTotal(() => []);
    setCompaniesTotal(() => []);
  };
  const closeWebSocket = useCallback(async () => {
    for (const elements of streamConnections) {
      await elements.terminate();
    }
    for (const element of streamNamesArray.reverse()) {
      try {
        await client.activateStreamApp(element, false);
      } catch (error) {
        console.log("error 502", error);
        setIsStopLoading(false);
      }
    }
    // );
    streamNamesArray.reverse();

    setIsStopLoading(false);
  }, [streamConnections]);

  const messageManipulation = async (msg) => {
    const { newData } = parseMessage(msg);
    if (newData.hasOwnProperty("client_name")) {
      const { updatedBankClientsTotals } = updatedArray(
        newData,
        clientsTotal,
        "client_name",
        topN
      );

      setClientsTotal(() => [...updatedBankClientsTotals]);
    } else if (newData.hasOwnProperty("product_company")) {
      const { updatedBankClientsTotals } = updatedArray(
        newData,
        companyTotal,
        "product_company",
        topN
      );

      setCompaniesTotal(() => [...updatedBankClientsTotals]);
    } else if (newData.hasOwnProperty("product_category_name")) {
      const { updatedBankClientsTotals } = updatedArray(
        newData,
        categoriesTotal,
        "product_category_name",
        topN
      );

      setCategoriesTotal(() => [...updatedBankClientsTotals]);
    }
  };

  const establishConnection = async (streamName) => {
    try {
      const stream = client.stream(streamName, false);
      const consumerOTP = await stream.getOtp();
      const _consumer = stream.consumer("anurag", "anurag.eng.macrometa.io", {
        otp: consumerOTP,
      });
      _consumer.on("open", () => {
        console.log(`Connection open for _clientConsumer `);
      });
      _consumer.on("close", () => {
        console.log(`Connection close for _clientConsumer `);
      });
      _consumer.on("message", async (msg) => {
        _consumer.send(
          JSON.stringify({ messageId: JSON.parse(msg).messageId })
        );

        await messageManipulation(msg);
      });
      return _consumer;
    } catch (error) {
      console.error("error", error);
    }
  };
  // Anurag probably dont need this
  const startWebSocket = async () => {
    for (const element of streamNamesArray) {
      const result = await client.activateStreamApp(element, true);
      // console.log(`Logged output: handleOnStart -> result`, result)
      // await fetch(
      //   `https://***REMOVED***/_fabric/_system/_api/streamapps/${element}/active?active=true`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       Authorization:
      //         "apikey anurag_etl_gmail.com.anurag_etl_key.46LfTHq3Ub6j6EBmf0vpjLSgATPvxrEB6Gz2rVu5B9rgbTWvbrGKmt0GFaeGZolkada923",
      //     },
      //   }
      // );
    }
    let cur = _.cloneDeep(streamConnections);
    for (let i = 0; i < 3; i++) {
      cur[i] = await establishConnection(streamNameConnectionName[i]);
      console.log(cur[i]);
    }
    setStreamConnections((prev) => {
      return [...streamConnections, ...cur];
    });
    setIsStartLoading(false);
  };
  useEffect(() => {
    console.log("sd", streamConnections);
  }, [streamConnections]);
  //s tart => click useeffect

  const executeRestqlQuery = async (restQlName, bindVars = {}) => {
    try {
      const resp = await client.executeRestql(restQlName, bindVars);
      return resp.result;
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleTopN = useCallback((event) => {
    const num = event.target.value.replace(/[^0-9]/g, "");
    setTopN(Number(num));
  }, []);

  const handleClearAllTables = useCallback(async () => {
    setIsClearLoading(true);
    await clearTables();
  }, []);

  const handleOnStart = () => {
    console.log("onStart");
    setIsStartLoading(true);
    startWebSocket();
  };

  const handleOnStop = () => {
    console.log("handleOnStop");
    setIsStopLoading(true);
    closeWebSocket();
  };

  const renderHeaderArea = useMemo(() => {
    console.log("inside Memoi");
    return (
      <ETLHeaderArea
        handleClearAllTables={handleClearAllTables}
        isClearLoading={isClearLoading}
      />
    );
  }, [isClearLoading, handleClearAllTables]);

  const handleTableType = useCallback((name) => {
    setTableType(name);
  }, []);

  const handleSelectClient = (event) => {
    setSelectedClient(event.target.value);
  };

  const renderTable = useMemo(() => {
    console.log("renderTable");
    return (
      <ETLTable
        bankClientNames={
          tableType === "Anonymous" ? anonymousBankClientNames : bankClientNames
        }
        selectedClient={selectedClient}
        handleSelectClient={handleSelectClient}
        handleTableType={handleTableType}
        tableData={tableData}
        tableType={tableType}
      />
    );
  }, [
    selectedClient,
    anonymousBankClientNames,
    bankClientNames,
    tableData,
    tableType,
    handleTableType,
  ]);

  const renderCharts = useMemo(() => {
    return (
      <ETLCharts
        handleTopN={handleTopN}
        topN={topN}
        clientTotals={clientsTotal}
        companyTotals={companyTotal}
        categoryTotals={categoriesTotal}
      />
    );
  }, [handleTopN, topN, clientsTotal, companyTotal, categoriesTotal]);

  return (
    <ThemeProvider theme={theme}>
      {/* <MMButton buttonText="click to start" onClickCb={startWebSocket} /> */}
      {renderHeaderArea}
      <ETLStreamButtons
        handleOnStart={handleOnStart}
        handleOnStop={handleOnStop}
        isStartLoading={isStartLoading}
        isStopLoading={isStopLoading}
      />
      {renderCharts}
      {renderTable}
    </ThemeProvider>
  );
};

export default ETLDashboard;
