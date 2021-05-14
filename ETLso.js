import React, { useState, useEffect, useRef } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { ETLHeaderArea } from "./ETLHeaderArea";
import { ETLCharts } from "./ETLCharts";
import { ETLStreamButtons } from "./ETLStreamButtons";
import { ETLTable } from "./ETLTable";
import jsc8 from "jsc8";
import {
  streamNamesArray,
  streamTableNamesArray,
} from "../util/streamNamesArray";
import { parseMessage, updatedArray } from "../util/helperFunctions";

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
    "anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
});
export const ETLDashboard = () => {
  const [topN, setTopN] = useState(10);
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isStopLoading, setIsStoptLoading] = useState(false);
  const [isClearLoading, setIsClearLoading] = useState(false);
  const [bankClientsTotals, setBankClientsTotals] = useState();
  const [bankCompanyTotals, setBankCompanyTotals] = useState();
  const [bankCategoryTotals, setBankCategoryTotals] = useState();
  const [clientCategories, setClientCategories] = useState();
  const [clientCategoriesTotals, setClientCategoriesTotals] = useState();
  const [companyCategories, setCompanyCategories] = useState([]);
  const [companyCategoriesTotals, setCompanyCategoriesTotals] = useState([]);
  const [categoryCategories, setCategoryCategories] = useState();
  const [categoryCategoriesTotals, setCategoryCategoriesTotals] = useState();
  const [companyConsumerValue, setCompanyConsumerValue] = useState();
  const [categoryConsumerValue, setCategoryConsumerValue] = useState();
  const [clientConsumerValue, setClientConsumerValue] = useState();

  const companyConsumer = useRef(null);
  const categoryConsumer = useRef(null);
  const clientConsumer = useRef(null);

  useEffect(() => {
    executeRestqlQuery("getBankClientTotals").then((result) => {
      const clientCategories =
        result &&
        result.map((element) => {
          return element.client_name;
        });
      const clientCategoriesTotals =
        result &&
        result.map((element) => {
          return element.total_amount;
        });
      setClientCategories(clientCategories);
      setClientCategoriesTotals(clientCategoriesTotals);
      setBankClientsTotals(result);
    });
  }, []);
  useEffect(() => {
    executeRestqlQuery("getBankCompanyTotals").then((result) => {
      const companyCategories =
        result &&
        result.map((element) => {
          return element.product_company;
        });
      const companyCategoriesTotals =
        result &&
        result.map((element) => {
          return element.total_amount;
        });
      setCompanyCategories(companyCategories);
      setCompanyCategoriesTotals(companyCategoriesTotals);
      setBankCompanyTotals(result);
    });
  }, []);

  useEffect(() => {
    executeRestqlQuery("getBankCategoryTotals").then((result) => {
      const categoryCategories =
        result &&
        result.map((element) => {
          return element.product_category_name;
        });
      const categoryCategoriesTotals =
        result &&
        result.map((element) => {
          return element.total_amount;
        });
      setCategoryCategories(categoryCategories);
      setCategoryCategoriesTotals(categoryCategoriesTotals);
      setBankCategoryTotals(result);
    });
  }, []);
  useEffect(() => {
    console.log(companyConsumer.current);
    if (companyConsumer.current) {
      companyConsumer.current.on("message", (msg) => {
        const { newData, messageId } = parseMessage(msg);
        console.log(`Logged output: ETLDashboard -> newData`, newData);
        const {
          updatedClientCategories,
          updatedClientCategoriesTotals,
          updatedBankClientsTotals,
        } = updatedArray(newData, bankCompanyTotals, "product_company");
        companyConsumer.current.send(JSON.stringify({ messageId }));
        setCompanyCategories((arr) => [...updatedClientCategories]);
        setCompanyCategoriesTotals((arr) => [...updatedClientCategoriesTotals]);
        setBankCompanyTotals([...updatedBankClientsTotals]);
      });
    }

    return () => {
      companyConsumer.current &&
        companyConsumer.current.on("close", () => {
          console.log(`Closing WS connection for `);
        });
    };
  }, [companyConsumerValue]);
  useEffect(() => {
    console.log(categoryConsumer.current);
    if (categoryConsumer.current) {
      categoryConsumer.current.on("message", (msg) => {
        const { newData, messageId } = parseMessage(msg);
        console.log(`Logged output: ETLDashboard -> newData`, newData);
        const {
          updatedClientCategories,
          updatedClientCategoriesTotals,
          updatedBankClientsTotals,
        } = updatedArray(newData, bankCategoryTotals, "product_category_name");
        categoryConsumer.current.send(JSON.stringify({ messageId }));
        setCategoryCategories((arr) => [...updatedClientCategories]);
        setCategoryCategoriesTotals((arr) => [
          ...updatedClientCategoriesTotals,
        ]);
        setBankCategoryTotals([...updatedBankClientsTotals]);
      });
    }
    return () => {
      categoryConsumer.current &&
        categoryConsumer.current.on("close", () => {
          console.log(`Closing WS connection for `);
        });
    };
  }, [categoryConsumerValue]);

  useEffect(() => {
    console.log(clientConsumer.current);
    if (clientConsumer.current) {
      clientConsumer.current.on("message", (msg) => {
        const { newData, messageId } = parseMessage(msg);
        console.log(`Logged output: ETLDashboard -> newData`, newData);
        const {
          updatedClientCategories,
          updatedClientCategoriesTotals,
          updatedBankClientsTotals,
        } = updatedArray(newData, bankClientsTotals, "client_name");
        clientConsumer.current.send(JSON.stringify({ messageId }));
        setClientCategories((arr) => [...updatedClientCategories]);
        setClientCategoriesTotals((arr) => [...updatedClientCategoriesTotals]);
        setBankClientsTotals([...updatedBankClientsTotals]);
      });
    }

    return () => {
      clientConsumer.current &&
        clientConsumer.current.on("close", () => {
          console.log(`Closing WS connection for client`);
        });
    };
  }, [clientConsumerValue]);

  // useEffect(() => {
  //   companyTotalsConsumer();
  // }, []);
  // useEffect(() => {
  //   categoryTotalsConsumer();
  // }, []);
  // useEffect(() => {
  //   clientTotalsConsumer();
  // }, []);

  const companyTotalsConsumer = async () => {
    try {
      const stream = client.stream("EtlBankCompanyNameTotalStream", false);
      //    await stream.createStream();

      const consumerOTP = await stream.getOtp();
      const _companyConsumer = stream.consumer(
        "anurag",
        "anurag.eng.macrometa.io",
        {
          otp: consumerOTP,
        }
      );
      // const _companyConsumer = await client.onCollectionChange(
      //   "etl_bank_company_totals"
      // );

      _companyConsumer.on("open", () => {
        console.log(`Connection open for companyTotalsConsumer`);
      });
      companyConsumer.current = _companyConsumer;
      setCompanyConsumerValue(_companyConsumer);
    } catch (error) {
      console.error("error", error);
    }
  };

  const categoryTotalsConsumer = async () => {
    try {
      const stream = client.stream("EtlBankCategoryNameTotalStream", false);
      //    await stream.createStream();

      const consumerOTP = await stream.getOtp();
      const _consumer = stream.consumer("anurag", "anurag.eng.macrometa.io", {
        otp: consumerOTP,
      });
      _consumer.on("open", () => {
        console.log(`Connection open for _consumer `);
      });
      categoryConsumer.current = _consumer;
      setCategoryConsumerValue(_consumer);
    } catch (error) {
      console.error("error", error);
    }
  };
  const clientTotalsConsumer = async () => {
    try {
      const stream = client.stream("EtlBankClientNameTotalStream", false);
      //    await stream.createStream();

      const consumerOTP = await stream.getOtp();
      const _clientConsumer = stream.consumer(
        "anurag",
        "anurag.eng.macrometa.io",
        {
          otp: consumerOTP,
        }
      );

      // _clientConsumer.on("message", (msg) => {
      //   const { payload, messageId } = JSON.parse(msg);
      //   // logging received message payload(ASCII encoded) to decode use atob()
      //   console.log(payload);
      //   // Send message acknowledgement
      //   consumer.send(JSON.stringify({ messageId }));
      // });
      // const _clientConsumer = await client.createStreamReader(
      //   "c8globals.EtlBankClientNameTotalStream",
      //   "anurag",
      //   false,
      //   true
      // );

      _clientConsumer.on("open", () => {
        console.log(`Connection open for _clientConsumer `);
      });
      clientConsumer.current = _clientConsumer;
      setClientConsumerValue(_clientConsumer);
    } catch (error) {
      console.error("error", error);
    }
  };

  const executeRestqlQuery = async (restQlName) => {
    try {
      const resp = await client.executeRestql(restQlName, {});
      return resp.result;
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleOnStart = async () => {
    setIsStartLoading(true);

    for (const element of streamNamesArray) {
      // const result=await   client.activateStreamApp(element, true);
      // console.log(`Logged output: handleOnStart -> result`, result)
      const result = await fetch(
        `https://***REMOVED***/_fabric/_system/_api/streamapps/${element}/active?active=true`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              "apikey anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
          },
        }
      );
    }
    setIsStartLoading(false);
    await clientTotalsConsumer();
    await companyTotalsConsumer();
    await categoryTotalsConsumer();
  };
  const handleOnStop = async () => {
    setIsStoptLoading(true);
    // await Promise.all(
    //   streamNamesArray.reverse().map(async (element) => {

    clientConsumer.current.on("close", () => {
      console.log(`Closing WS connection for client`);
    });
    for (const element of streamNamesArray.reverse()) {
      // const result=await   client.activateStreamApp(element, false);
      // console.log(`Logged output: handleOnStart -> result`, result)

      const result = await fetch(
        `https://***REMOVED***/_fabric/_system/_api/streamapps/${element}/active?active=false`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              "apikey anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
          },
        }
      );
    }
    // );

    streamNamesArray.reverse();
    setIsStoptLoading(false);
    await clientConsumerValue.close();
    await categoryConsumerValue.close();
    await companyConsumerValue.close();
  };
  const handleClearAllTables = async () => {
    setIsClearLoading(true);
    for (const element of streamTableNamesArray) {
      const result = await client.collection(element).truncate();
    }
    setIsClearLoading(false);
  };
  const handleTopN = (event) => {
    setTopN(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <ETLHeaderArea
        handleClearAllTables={handleClearAllTables}
        isClearLoading={isClearLoading}
      />
      <ETLStreamButtons
        handleOnStart={handleOnStart}
        handleOnStop={handleOnStop}
        isStartLoading={isStartLoading}
        isStopLoading={isStopLoading}
      />

      <ETLCharts
        handleTopN={handleTopN}
        topN={topN}
        clientCategories={clientCategories}
        clientTotals={clientCategoriesTotals}
        companyCategories={companyCategories}
        companyTotals={companyCategoriesTotals}
        categoryCategories={categoryCategories}
        categoryTotals={categoryCategoriesTotals}
      />
      <ETLTable />
    </ThemeProvider>
  );
};
