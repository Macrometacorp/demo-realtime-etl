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
import { render } from "@testing-library/react";

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

export default class ETLDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topN: 10,
      isStartLoading: false,
      isStopLoading: false,
      isClearLoading: false,
      bankClientsTotals: [],
      bankCompanyTotals: [],
      bankCategoryTotals: [],
      clientCategories: [],
      clientCategoriesTotals: [],
      companyCategories: [],
      companyCategoriesTotals: [],
      categoryCategories: [],
      categoryCategoriesTotals: [],
      //   companyConsumerValue: undefined,
      //   categoryConsumerValue: undefined,
      //   clientConsumerValue: undefined,
    };
    this._clientConsumer = undefined;
    this.categoryConsumer = null;
    this.clientConsumer = null;
    this.client = new jsc8({
      url: "https://anurag.eng.macrometa.io",
      apiKey:
        "anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
    });
  }

  componentDidMount() {
    let clientCategories = [],
      clientCategoriesTotals = [],
      companyCategories = [],
      companyCategoriesTotals = [],
      categoryCategories = [],
      categoryCategoriesTotals = [],
      bankClient = [],
      bankCategory = [],
      bankCompany = [];
    this.executeRestqlQuery("getBankClientTotals")
      .then((result) => {
        bankClient = result;
        clientCategories =
          result &&
          result.map((element) => {
            return element.client_name;
          });
        clientCategoriesTotals =
          result &&
          result.map((element) => {
            return element.total_amount;
          });
      })
      .then(() => {
        this.executeRestqlQuery("getBankCompanyTotals").then((result) => {
          bankCompany = result;
          companyCategories =
            result &&
            result.map((element) => {
              return element.product_company;
            });
          companyCategoriesTotals =
            result &&
            result.map((element) => {
              return element.total_amount;
            });
        });
      })
      .then(() => {
        this.executeRestqlQuery("getBankCategoryTotals").then((result) => {
          bankCategory = result;
          categoryCategories =
            result &&
            result.map((element) => {
              return element.product_category_name;
            });
          categoryCategoriesTotals =
            result &&
            result.map((element) => {
              return element.total_amount;
            });
          this.setState({
            clientCategories: clientCategories,
            clientCategoriesTotals: clientCategoriesTotals,
            companyCategories: companyCategories,
            companyCategoriesTotals: companyCategoriesTotals,
            categoryCategories: categoryCategories,
            categoryCategoriesTotals: categoryCategoriesTotals,
            bankClientsTotals: bankClient,
            bankCompanyTotals: bankCompany,
            bankCategoryTotals: bankCategory,
          });
        });
      });
  }
  componentWillUnmount() {
    this._clientConsumer.terminate();
  }
  establishConnection = async (
    streamName,
    chartCollection,
    streamproductId
  ) => {
    try {
      const stream = this.client.stream(streamName, false);
      //       //    await stream.createStream();

      const consumerOTP = await stream.getOtp();
      this._clientConsumer = stream.consumer(
        "anurag",
        "anurag.eng.macrometa.io",
        {
          otp: consumerOTP,
        }
      );
      this._clientConsumer.on("open", () => {
        console.log(`Connection open for _clientConsumer `);
      });
      this._clientConsumer.on("message", (msg) => {
        const { newData, messageId } = parseMessage(msg);
        console.log(`Logged output: ETLDashboard -> newData`, newData);
        const {
          updatedClientCategories,
          updatedClientCategoriesTotals,
          updatedBankClientsTotals,
        } = updatedArray(newData, chartCollection, streamproductId);
        this._clientConsumer.send(JSON.stringify({ messageId }));
        if (streamproductId === "product_company") {
          this.setState({
            companyCategories: updatedClientCategories,
            companyCategoriesTotals: updatedClientCategoriesTotals,
            bankCompanyTotals: updatedBankClientsTotals,
          });
        }
        if (streamproductId === "product_category_name") {
          this.setState({
            categoryCategories: updatedClientCategories,
            categoryCategoriesTotals: updatedClientCategoriesTotals,
            bankCategoryTotals: updatedBankClientsTotals,
          });
        }

        if (streamproductId === "client_name") {
          this.setState({
            clientCategories: updatedClientCategories,
            clientCategoriesTotals: updatedClientCategoriesTotals,
            bankClientsTotals: updatedBankClientsTotals,
          });
        }
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  executeRestqlQuery = async (restQlName) => {
    try {
      const resp = await this.client.executeRestql(restQlName, {});
      return resp.result;
    } catch (error) {
      console.error("error", error);
    }
  };

  handleOnStart = async () => {
    const self = this;
    this.setState({ isStartLoading: true });

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
    this.setState({ isStartLoading: false }, async () => {
      await self.establishConnection(
        "EtlBankClientNameTotalStream",
        self.state.bankClientsTotals,
        "client_name"
      );
      await self.establishConnection(
        "EtlBankCompanyNameTotalStream",
        self.state.bankCompanyTotals,
        "product_company"
      );
      await self.establishConnection(
        "EtlBankCategoryNameTotalStream",
        self.state.bankCategoryTotals,
        "product_category_name"
      );
    });
  };

  handleOnStop = async () => {
    const self = this;
    this.setState({ isStopLoading: true });
    // await Promise.all(
    //   streamNamesArray.reverse().map(async (element) => {

    this.clientConsumer.current.on("close", () => {
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
    this.setState({ isStopLoading: false }, async () => {
      await self._clientConsumer.close();
      //   await self.categoryConsumerValue.close();
      //   await self.companyConsumerValue.close();
    });
  };

  handleClearAllTables = async () => {
    this.setState({ isClearLoading: true });
    for (const element of streamTableNamesArray) {
      const result = await this.client.collection(element).truncate();
    }
    this.setState({ isClearLoading: false });
  };

  handleTopN = (event) => {
    this.setState({ topN: event.target.value });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ETLHeaderArea
          handleClearAllTables={this.handleClearAllTables}
          isClearLoading={this.state.isClearLoading}
        />
        <ETLStreamButtons
          handleOnStart={this.handleOnStart}
          handleOnStop={this.handleOnStop}
          isStartLoading={this.state.isStartLoading}
          isStopLoading={this.state.isStopLoading}
        />

        <ETLCharts
          handleTopN={this.handleTopN}
          topN={this.state.topN}
          clientCategories={this.state.clientCategories}
          clientTotals={this.state.clientCategoriesTotals}
          companyCategories={this.state.companyCategories}
          companyTotals={this.state.companyCategoriesTotals}
          categoryCategories={this.state.categoryCategories}
          categoryTotals={this.state.categoryCategoriesTotals}
        />
        <ETLTable />
      </ThemeProvider>
    );
  }
}
