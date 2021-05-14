import React, { useState, useEffect } from "react";
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
// const client = new jsc8({
//   url: "https://gdn.paas.macrometa.io",
//   apiKey:
//     "stream-etl_macrometa.io.stream_etl_api_key.IxdAQ3xclGbaNut6Ey5S5lsyFr2SYvuI3BpjyvUiko2CQgcrQ68LWRCuGndSdEObb52fb0",
// });
const client = new jsc8({
  url: "https://tushar.eng.macrometa.io",
  apiKey:
    "sample_gmail.com.something.6FQBhjigsLR7wK9C9VSacUobPYUfE8s7VHdB1DRKR8ZLQbhlhDPRdEOQ6EGRyXjG4bc749",
});
console.log(`Logged output: client`, client);
export const ETLDashboard = () => {
  // const [topN, setTopN] = useState(10);
  // const [isStartLoading, setIsStartLoading] = useState(false);
  // const [isStopLoading, setIsStoptLoading] = useState(false);
  // const [isClearLoading, setIsClearLoading] = useState(false);
  // const [bankClientsTotals, setBankClientsTotals] = useState();
  // const [bankCompanyTotals, setBankCompanyTotals] = useState();
  // const [bankCategoryTotals, setBankCategoryTotals] = useState();
  // const [clientCategories, setClientCategories] = useState();
  // const [clientCategoriesTotals, setClientCategoriesTotals] = useState();
  // const [companyCategories, setCompanyCategories] = useState();
  // const [companyCategoriesTotals, setCompanyCategoriesTotals] = useState();
  // const [categoryCategories, setCategoryCategories] = useState();
  // const [categoryCategoriesTotals, setCategoryCategoriesTotals] = useState();

  // useEffect(() => {
  //   executeRestqlQuery("getBankClientTotals").then((result) => {
  //     console.log(`Logged getBankClientTotals: ETLDashboard -> result`, result);
  //     const clientCategories = result.map((element) => {
  //       return element.client_name;
  //     });
  //     const clientCategoriesTotals = result.map((element) => {
  //       return element.total_amount;
  //     });
  //     setClientCategories(clientCategories);
  //     setClientCategoriesTotals(clientCategoriesTotals);
  //     setBankClientsTotals(result);
  //   });
  // }, []);
  // useEffect(() => {
  //   executeRestqlQuery("getBankCompanyTotals").then((result) => {
  //     console.log(
  //       `Logged getBankCompanyTotals: ETLDashboard -> result`,
  //       result
  //     );
  //     const companyCategories = result.map((element) => {
  //       return element.product_company;
  //     });
  //     const companyCategoriesTotals = result.map((element) => {
  //       return element.total_amount;
  //     });
  //     setCompanyCategories(companyCategories);
  //     setCompanyCategoriesTotals(companyCategoriesTotals);
  //     setBankCompanyTotals(result);
  //   });
  // }, []);
  useEffect(() => {
    const as = async () => {
      // const listener = await client.onCollectionChange("etl_bank_transactions");
      // listener.on("message", (msg) => console.log("message=>", msg));
      // listener.on("open", () => console.log("connection open"));
      // listener.on("close", () => console.log("connection closed"));
      // listener.on("error",(err)=>console.log("err",err))

      // listener.on("close", () => console.log("connection closed"));
      const consumer = await client.createStreamReader(
        "test123",
        "anurag",
        true,
        true
      );
      consumer.on("message", (msg) => {
        console.log(msg);
      });
    };
    as();
  });
  // useEffect(() => {
  //   executeRestqlQuery("getBankCategoryTotals").then((result) => {
  //     console.log(
  //       `Logged getBankCategoryTotals: ETLDashboard -> result`,
  //       result
  //     );
  //     const categoryCategories = result.map((element) => {
  //       return element.product_category_name;
  //     });
  //     const categoryCategoriesTotals = result.map((element) => {
  //       return element.total_amount;
  //     });
  //     setCategoryCategories(categoryCategories);
  //     setCategoryCategoriesTotals(categoryCategoriesTotals);
  //     setBankCategoryTotals(result);
  //   });
  // }, []);

  // const executeRestqlQuery = async (restQlName) => {
  //   const resp = await client.executeRestql(restQlName, {});
  //   console.log(resp.result);
  //   return resp.result;
  // };

  // const handleOnStart = async () => {
  //   setIsStartLoading(true);
  //   console.log("wassu2", streamNamesArray);
  //   for (const element of streamNamesArray) {
  //     console.log(`Logged output: handleOnStart -> element`, element);
  //     // const result=await   client.activateStreamApp(element, true);
  //     // console.log(`Logged output: handleOnStart -> result`, result)
  //     const result = await fetch(
  //       `https://api-gdn.paas.macrometa.io/_fabric/_system/_api/streamapps/${element}/active?active=true`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization:
  //             "apikey stream-etl_macrometa.io.stream_etl_api_key.IxdAQ3xclGbaNut6Ey5S5lsyFr2SYvuI3BpjyvUiko2CQgcrQ68LWRCuGndSdEObb52fb0",
  //         },
  //       }
  //     );
  //     console.log(`Logged output: as -> result`, result);
  //   }
  //   setIsStartLoading(false);
  //   console.log("wassup");
  // };
  // const handleOnStop = async () => {
  //   setIsStoptLoading(true);
  //   // await Promise.all(
  //   //   streamNamesArray.reverse().map(async (element) => {
  //   console.log("s", streamNamesArray);
  //   for (const element of streamNamesArray.reverse()) {
  //     console.log(`Logged output: handleOnStop -> element`, element);
  //     // const result=await   client.activateStreamApp(element, false);
  //     // console.log(`Logged output: handleOnStart -> result`, result)
  //     const result = await fetch(
  //       `https://api-gdn.paas.macrometa.io/_fabric/_system/_api/streamapps/${element}/active?active=false`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization:
  //             "apikey stream-etl_macrometa.io.stream_etl_api_key.IxdAQ3xclGbaNut6Ey5S5lsyFr2SYvuI3BpjyvUiko2CQgcrQ68LWRCuGndSdEObb52fb0",
  //         },
  //       }
  //     );
  //     console.log(`Logged output: as -> result`, result);
  //   }
  //   // );

  //   streamNamesArray.reverse();
  //   setIsStoptLoading(false);
  //   console.log("wassu2", streamNamesArray);
  // };
  // const handleClearAllTables = async () => {
  //   setIsClearLoading(true);
  //   console.log("streamTableNamesArray", streamTableNamesArray);
  //   for (const element of streamTableNamesArray) {
  //     console.log(`Logged output: handleClearAllTables -> element`, element);
  //     const result = await client.collection(element).truncate();
  //     console.log("result", result);
  //   }
  //   setIsClearLoading(false);
  // };
  // const handleTopN = (event) => {
  //   setTopN(event.target.value);
  // };
  return (
    <div>sdssfsdd</div>
    // <ThemeProvider theme={theme}>
    //   <ETLHeaderArea
    //     handleClearAllTables={handleClearAllTables}
    //     isClearLoading={isClearLoading}
    //   />
    //   <ETLStreamButtons
    //     handleOnStart={handleOnStart}
    //     handleOnStop={handleOnStop}
    //     isStartLoading={isStartLoading}
    //     isStopLoading={isStopLoading}
    //   />

    //   <ETLCharts
    //     handleTopN={handleTopN}
    //     topN={topN}
    //     clientCategories={clientCategories}
    //     clientTotals={clientCategoriesTotals}
    //     companyCategories={companyCategories}
    //     companyTotals={companyCategoriesTotals}
    //     categoryCategories={categoryCategories}
    //     categoryTotals={categoryCategoriesTotals}
    //   />
    //   <ETLTable />
    // </ThemeProvider>
  );
};
