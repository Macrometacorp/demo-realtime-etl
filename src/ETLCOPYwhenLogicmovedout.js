import React, { useState, useEffect, useRef } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  TextField,
  Grid,
} from "@material-ui/core";
import { MMHeading } from "./common/MMHeading";
import { MMButton } from "./common/MMButton";
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
import { SignalWifi1Bar } from "@material-ui/icons";
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
console.log(`Logged output: client`, client);
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
      console.log(`Logged getBankClientTotals: ETLDashboard -> result`, result);
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
      console.log(
        `Logged getBankCompanyTotals: ETLDashboard -> result`,
        result
      );
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
      console.log(
        `Logged getBankCategoryTotals: ETLDashboard -> result`,
        result
      );
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
    console.log(companyConsumer.current);
    if (companyConsumer.current) {
      companyConsumer.current.on("message", (msg) => {
        const newData = parseMessage(msg);
        const { newCategory, newTotal } = updatedArray(
          newData,
          companyCategories,
          companyCategoriesTotals
        );
        // const index = companyCategoriesTotals.findIndex(
        //   (number) => number > newData.total_amount
        // );
        // console.log("index", index);
        // const c = companyCategories;
        // const d = companyCategoriesTotals;
        // if (!!index) {
        //   c[index - 1] = newData.product_company;
        //   d[index - 1] = newData.total_amount;
        // }
        setCompanyCategories((arr) => [...newCategory]);
        setCompanyCategoriesTotals((arr) => [...newTotal]);
        // let c = companyCategories;
        // console.log(`Logged output: ETLDashboard -> c`, c);
        // let d = companyCategoriesTotals;
        // c[0] = newData && newData.product_company;
        // console.log(`Logged output: ETLDashboard -> c[0]`, c[0]);
        // d[0] = newData && newData.total_amount;
        // console.log(`Logged output: ETLDashboard -> d[0]`, d[0]);
        // setCompanyCategories(() => [c[0]]);
        // setCompanyCategoriesTotals(() => [10]);

        // _.findIndex(users, function(o) { return o.user == 'barney'; });
      });
    }

    return () => {
      companyConsumer.current &&
        companyConsumer.current.on("close", () => {
          console.log(`Closing WS connection for `);
        });
    };
  }, [companyConsumerValue, companyCategories, companyCategoriesTotals]);
  useEffect(() => {
    console.log(categoryConsumer.current);
    console.log(categoryConsumer.current);
    if (categoryConsumer.current) {
      categoryConsumer.current.on("message", (msg) => {
        const newData = parseMessage(msg);
        const { newCategory, newTotal } = updatedArray(
          newData,
          categoryCategories,
          categoryCategoriesTotals
        );
        // const index = categoryCategoriesTotals.findIndex(
        //   (number) => number > newData.total_amount
        // );
        // console.log("categoryConsumer index", index);
        // const c = categoryCategories;
        // const d = categoryCategoriesTotals;
        // if (!!index) {
        //   c[index - 1] = newData.product_category_name;
        //   d[index - 1] = newData.total_amount;
        // }
        setCategoryCategories((arr) => [...newCategory]);
        setCategoryCategoriesTotals((arr) => [...newTotal]);
        // let c = companyCategories;
        // console.log(`Logged output: ETLDashboard -> c`, c);
        // let d = companyCategoriesTotals;
        // c[0] = newData && newData.product_company;
        // console.log(`Logged output: ETLDashboard -> c[0]`, c[0]);
        // d[0] = newData && newData.total_amount;
        // console.log(`Logged output: ETLDashboard -> d[0]`, d[0]);
        // setCompanyCategories(() => [c[0]]);
        // setCompanyCategoriesTotals(() => [10]);

        // _.findIndex(users, function(o) { return o.user == 'barney'; });
      });
    }

    return () => {
      categoryConsumer.current &&
        categoryConsumer.current.on("close", () => {
          console.log(`Closing WS connection for `);
        });
    };
  }, [categoryConsumerValue, categoryCategories, categoryCategoriesTotals]);
  useEffect(() => {
    console.log(clientConsumer.current);
    console.log(clientConsumer.current);
    if (clientConsumer.current) {
      clientConsumer.current.on("message", (msg) => {
        const newData = parseMessage(msg);
        const { newCategory, newTotal } = updatedArray(
          newData,
          clientCategories,
          clientCategoriesTotals
        );

        // const index = clientCategoriesTotals.findIndex(
        //   (number) => number < newData.total_amount
        // );

        // console.log("clientConsumer index", index);
        // let c = [];
        // let d = [];
        // if (!!index) {
        //   const sli = clientCategoriesTotals.slice(0, index);
        //   const sli2 = clientCategories.slice(0, index);
        //   sli.push(newData.total_amount);
        //   sli2.push(newData.client_name);
        //   const sliw = clientCategoriesTotals.slice(
        //     index,
        //     clientCategoriesTotals.length - 1
        //   );
        //   const sliw2 = clientCategories.slice(
        //     index,
        //     clientCategories.length - 1
        //   );
        //   c = [...sli2, ...sliw2];
        //   d = [...sli, ...sliw];
        // }
        setClientCategories((arr) => [...newCategory]);
        setClientCategoriesTotals((arr) => [...newTotal]);
        // let c = companyCategories;
        // console.log(`Logged output: ETLDashboard -> c`, c);
        // let d = companyCategoriesTotals;
        // c[0] = newData && newData.product_company;
        // console.log(`Logged output: ETLDashboard -> c[0]`, c[0]);
        // d[0] = newData && newData.total_amount;
        // console.log(`Logged output: ETLDashboard -> d[0]`, d[0]);
        // setCompanyCategories(() => [c[0]]);
        // setCompanyCategoriesTotals(() => [10]);

        // _.findIndex(users, function(o) { return o.user == 'barney'; });
      });
    }

    return () => {
      clientConsumer.current &&
        clientConsumer.current.on("close", () => {
          console.log(`Closing WS connection for `);
        });
    };
  }, [clientConsumerValue, clientCategories, clientCategoriesTotals]);

  useEffect(() => {
    companyTotalsConsumer();
  }, []);
  useEffect(() => {
    categoryTotalsConsumer();
  }, []);
  useEffect(() => {
    clientTotalsConsumer();
  }, []);

  const companyTotalsConsumer = async () => {
    try {
      const _companyConsumer = await client.onCollectionChange(
        "etl_bank_company_totals"
      );

      _companyConsumer.on("open", () => {
        console.log(`Connection open for companyTotalsConsumer`);
      });
      companyConsumer.current = _companyConsumer;
      setCompanyConsumerValue(_companyConsumer);
    } catch (error) {
      console.log("error", error);
    }
  };

  const categoryTotalsConsumer = async () => {
    try {
      const _consumer = await client.onCollectionChange(
        "etl_bank_category_totals"
      );

      _consumer.on("open", () => {
        console.log(`Connection open for _consumer `);
      });
      categoryConsumer.current = _consumer;
      setCategoryConsumerValue(_consumer);
    } catch (error) {
      console.log("error", error);
    }
  };
  const clientTotalsConsumer = async () => {
    try {
      const _clientConsumer = await client.onCollectionChange(
        "etl_bank_client_totals"
      );

      _clientConsumer.on("open", () => {
        console.log(`Connection open for _clientConsumer `);
      });
      clientConsumer.current = _clientConsumer;
      setClientConsumerValue(_clientConsumer);
    } catch (error) {
      console.log("error", error);
    }
  };

  const executeRestqlQuery = async (restQlName) => {
    try {
      const resp = await client.executeRestql(restQlName, {});
      return resp.result;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOnStart = async () => {
    setIsStartLoading(true);
    console.log("wassu2", streamNamesArray);
    for (const element of streamNamesArray) {
      console.log(`Logged output: handleOnStart -> element`, element);
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
      console.log(`Logged output: as -> result`, result);
    }
    setIsStartLoading(false);
    console.log("wassup");
  };
  const handleOnStop = async () => {
    setIsStoptLoading(true);
    // await Promise.all(
    //   streamNamesArray.reverse().map(async (element) => {
    console.log("s", streamNamesArray);
    for (const element of streamNamesArray.reverse()) {
      console.log(`Logged output: handleOnStop -> element`, element);
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
      console.log(`Logged output: as -> result`, result);
    }
    // );

    streamNamesArray.reverse();
    setIsStoptLoading(false);
    console.log("wassu2", streamNamesArray);
  };
  const handleClearAllTables = async () => {
    setIsClearLoading(true);
    console.log("streamTableNamesArray", streamTableNamesArray);
    for (const element of streamTableNamesArray) {
      console.log(`Logged output: handleClearAllTables -> element`, element);
      const result = await client.collection(element).truncate();
      console.log("result", result);
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
