import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { ETLCharts } from "./Charts/ETLCharts";
import { ETLStreamButtons } from "./ETLStreamButtons";
import _ from "lodash";
import { parseMessage, updatedArray } from "../util/helperFunctions";
import {
  executeRestqlQuery,
  startStopStream,
  establishConnection,
  clearTablesData,
} from "../util/services";

const streamNameConnectionName = [
  "EtlBankClientNameTotalStream",
  "EtlBankCompanyNameTotalStream",
  "EtlBankCategoryNameTotalStream",
];

const ETLDashboard = () => {
  const [categoriesTotal, setCategoriesTotal] = useState([]);
  const [clientsTotal, setClientsTotal] = useState([]);
  const [companyTotal, setCompaniesTotal] = useState([]);
  const [streamConnections, setStreamConnections] = useState([]);
  const [isClearLoading, setIsClearLoading] = useState(false);
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isStopLoading, setIsStopLoading] = useState(false);
  const [topN, setTopN] = useState(7);
  const setTopNContext = useRef(null);
  // const [webSocketOpen, setWebSocketOpen] = useState(false);

  useEffect(() => {
    executeRestqlQuery("getBankClientTotals", {
      topN: topN,
    }).then((result) => {
      setClientsTotal(() => [...result]);
    });
  }, [topN]);

  useEffect(() => {
    executeRestqlQuery("getBankCompanyTotals", {
      topN: topN,
    }).then((result) => {
      setCompaniesTotal(() => [...result]);
    });
  }, [topN]);

  useEffect(() => {
    executeRestqlQuery("getBankCategoryTotals", {
      topN: topN,
    }).then(async (result) => {
      setCategoriesTotal(() => [...result]);
    });
  }, [topN]);

  useEffect(() => {
    setTopNContext.current = topN;
  }, [topN]);

  const clearTables = useCallback(async () => {
    await closeWebSocket();
    await clearTablesData();
    setIsClearLoading(false);
    setClientsTotal(() => []);
    setCategoriesTotal(() => []);
    setCompaniesTotal(() => []);
  }, []);
  const closeWebSocket = useCallback(async () => {
    for (const elements of streamConnections) {
      await elements.terminate();
    }
    try {
      await startStopStream(false);
      setIsStopLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsStopLoading(false);
    }
    // setWebSocketOpen(false);
  }, [streamConnections]);

  const messageManipulation = (msg) => {
    const { newData } = parseMessage(msg);
    if (newData.hasOwnProperty("client_name")) {
      const { updatedBankClientsTotals } = updatedArray(
        newData,
        clientsTotal,
        "client_name",
        setTopNContext.current
      );

      setClientsTotal(() => [...updatedBankClientsTotals]);
    } else if (newData.hasOwnProperty("product_company")) {
      const { updatedBankClientsTotals } = updatedArray(
        newData,
        companyTotal,
        "product_company",
        setTopNContext.current
      );

      setCompaniesTotal(() => [...updatedBankClientsTotals]);
    } else if (newData.hasOwnProperty("product_category_name")) {
      const { updatedBankClientsTotals } = updatedArray(
        newData,
        categoriesTotal,
        "product_category_name",
        setTopNContext.current
      );

      setCategoriesTotal(() => [...updatedBankClientsTotals]);
    }
  };

  const startWebSocket = async () => {
    try {
      // setWebSocketOpen(true);
      await startStopStream(true);
      let cur = _.cloneDeep(streamConnections);
      for (let i = 0; i < 3; i++) {
        cur[i] = await establishConnection(streamNameConnectionName[i]);
        cur[i].on("message", (msg) => {
          cur[i].send(JSON.stringify({ messageId: JSON.parse(msg).messageId }));

          messageManipulation(msg);
        });
      }
      setStreamConnections((prev) => {
        return [...streamConnections, ...cur];
      });
      setIsStartLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsStopLoading(false);
    }
  };

  const handleTopN = useCallback((event) => {
    const num = event.target.value.replace(/[^0-9]/g, "");

    setClientsTotal([]);
    setCategoriesTotal([]);
    setCompaniesTotal([]);
    setTopN(Number(num));
  }, []);

  const handleClearAllTables = useCallback(() => {
    setIsClearLoading(true);
    clearTables();
  }, [clearTables]);

  const handleOnStart = () => {
    setIsStartLoading(true);
    startWebSocket();
  };

  const handleOnStop = () => {
    setIsStopLoading(true);
    closeWebSocket();
  };

  const renderCharts = useMemo(() => {
    return (
      <ETLCharts
        handleTopN={handleTopN}
        topN={topN}
        clientTotals={clientsTotal}
        companyTotals={companyTotal}
        categoryTotals={categoriesTotal}
        // webSocketOpen={webSocketOpen}
      />
    );
  }, [
    handleTopN,
    topN,
    clientsTotal,
    // webSocketOpen,
    companyTotal,
    categoriesTotal,
  ]);

  return (
    <React.Fragment>
      <ETLStreamButtons
        handleOnStart={handleOnStart}
        handleOnStop={handleOnStop}
        handleClearTables={handleClearAllTables}
        isStartLoading={isStartLoading}
        isStopLoading={isStopLoading}
        isClearLoading={isClearLoading}
      />
      {renderCharts}
    </React.Fragment>
  );
};

export default ETLDashboard;
