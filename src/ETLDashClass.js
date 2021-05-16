import React from "react";
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
      bankClientNames: [],
      annonymousBankClientNames: [],
      selectedClient: "",
      tableType: "Transactions",
      tableData: [],
      //   companyConsumerValue: undefined,
      //   categoryConsumerValue: undefined,
      //   clientConsumerValue: undefined,
    };
    this._clientConsumer = undefined;
    this._categoryConsumer = undefined;
    this._companyConsumer = undefined;
    this.client = new jsc8({
      url: "https://anurag.eng.macrometa.io",
      apiKey:
        "anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
    });
  }

  componentDidMount() {
    this.getDataForChart();
  }

  getDataForChart = async () => {
    let clientCategories = [],
      clientCategoriesTotals = [],
      companyCategories = [],
      companyCategoriesTotals = [],
      categoryCategories = [],
      categoryCategoriesTotals = [],
      bankClient = [],
      bankCategory = [],
      bankCompany = [],
      bankClientNames = [],
      annonymousBankClientNames = [];

    this.executeRestqlQuery("getBankClientTotals", {
      topN: this.state.topN,
    })
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
        this.setState({
          clientCategories: clientCategories,
          clientCategoriesTotals: clientCategoriesTotals,
          bankClientsTotals: bankClient,
        });
      })
      .then(() => {
        this.executeRestqlQuery("getBankCompanyTotals", {
          topN: this.state.topN,
        }).then((result) => {
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
          this.setState({
            companyCategories: companyCategories,
            companyCategoriesTotals: companyCategoriesTotals,
            bankCompanyTotals: bankCompany,
          });
        });
      })
      .then(() => {
        this.executeRestqlQuery("getBankCategoryTotals", {
          topN: this.state.topN,
        }).then((result) => {
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
            categoryCategories: categoryCategories,
            categoryCategoriesTotals: categoryCategoriesTotals,
            bankCategoryTotals: bankCategory,
          });
        });
      })
      .then(async () => {
        for (let i = 1; i <= 2; i++) {
          let result = [];
          result = await this.executeRestqlQuery("getBankClients", {
            offsetValue: i * 100,
          });

          bankClientNames = [...bankClientNames, ...result];
        }
        bankClientNames.sort((a, b) =>
          a.clientName.localeCompare(b.clientName)
        );
        this.setState({
          bankClientNames: bankClientNames,
        });
      })
      .then(async () => {
        for (let i = 1; i <= 2; i++) {
          let result = [];
          result = await this.executeRestqlQuery("getBankAnonymizationClient", {
            offsetValue: i * 100,
          });
          annonymousBankClientNames = [...annonymousBankClientNames, ...result];
        }
        annonymousBankClientNames.sort((a, b) =>
          a.clientName.localeCompare(b.clientName)
        );
        this.setState({
          annonymousBankClientNames: annonymousBankClientNames,
        });
      });
    // const rs = await this.client.createFabric(
    //   "mydb",
    //   [{ username: "root" }]
    // );
    //  console.log(`Logged output: ETLDashboard -> createFabric -> rs`, rs);
  };
  componentWillUnmount() {
    this._clientConsumer.terminate();
    this._companyConsumer.terminate();
    this._categoryConsumer.terminate();
  }

  establishConnection1 = async (streamName) => {
    try {
      const stream = this.client.stream(streamName, false);
      //    await stream.createStream();
      // this._clientConsumer = await this.client.createStreamReader(
      //   streamName,
      //   "anurag"
      // );
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
    } catch (error) {
      console.error("error", error);
    }
  };
  establishConnection2 = async (streamName) => {
    try {
      const stream = this.client.stream(streamName, false);
      //       //    await stream.createStream();

      const consumerOTP = await stream.getOtp();
      this._companyConsumer = stream.consumer(
        "anurag",
        "anurag.eng.macrometa.io",
        {
          otp: consumerOTP,
        }
      );
      // this._companyConsumer = await this.client.createStreamReader(
      //   streamName,
      //   "anurag"
      // );
      this._companyConsumer.on("open", () => {
        console.log(`Connection open for _companyConsumer `);
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  establishConnection3 = async (streamName) => {
    try {
      const stream = this.client.stream(streamName, false);
      //       //    await stream.createStream();

      const consumerOTP = await stream.getOtp();
      this._categoryConsumer = stream.consumer(
        "anurag",
        "anurag.eng.macrometa.io",
        {
          otp: consumerOTP,
        }
      );
      // this._categoryConsumer = await this.client.createStreamReader(
      //   streamName,
      //   "anurag"
      // );
      this._categoryConsumer.on("open", () => {
        console.log(`Connection open for this._categoryConsumer `);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  executeRestqlQuery = async (restQlName, bindVars = {}) => {
    try {
      const resp = await this.client.executeRestql(restQlName, bindVars);
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
    this.getDataForChart().then(() => {
      this.setState({ isStartLoading: false }, async () => {
        await self.establishConnection1("EtlBankClientNameTotalStream");
        // await self.establishConnection2("EtlBankCompanyNameTotalStream");
        // await self.establishConnection3("EtlBankCategoryNameTotalStream");
        this.handleRegisterEvents();
      });
    });
  };
  handleRegisterEvents = () => {
    // const self = this;
    this._clientConsumer.on("message", (msg) => {
      this._clientConsumer.send(
        JSON.stringify({ messageId: JSON.parse(msg).messageId })
      );
      const { newData } = parseMessage(msg);
      console.log(`Logged output: ETLDashboard -> newData`, newData);
      const {
        updatedClientCategories,
        updatedClientCategoriesTotals,
        updatedBankClientsTotals,
      } = updatedArray(
        newData,
        this.state.bankClientsTotals,
        "client_name",
        this.state.topN
      );
      this.setState({
        clientCategories: updatedClientCategories,
        clientCategoriesTotals: updatedClientCategoriesTotals,
        bankClientsTotals: updatedBankClientsTotals,
      });
    });
    this._companyConsumer.on("message", (msg) => {
      this._companyConsumer.send(
        JSON.stringify({ messageId: JSON.parse(msg).messageId })
      );
      const { newData } = parseMessage(msg);
      console.log(`Logged output: ETLDashboard -> newData`, newData);
      const {
        updatedClientCategories,
        updatedClientCategoriesTotals,
        updatedBankClientsTotals,
      } = updatedArray(
        newData,
        this.state.bankCompanyTotals,
        "product_company",
        this.state.topN
      );
      this.setState({
        companyCategories: updatedClientCategories,
        companyCategoriesTotals: updatedClientCategoriesTotals,
        bankCompanyTotals: updatedBankClientsTotals,
      });
    });
    this._categoryConsumer.on("message", (msg) => {
      this._categoryConsumer.send(
        JSON.stringify({ messageId: JSON.parse(msg).messageId })
      );
      const { newData } = parseMessage(msg);
      console.log(`Logged output: ETLDashboard -> newData`, newData);
      const {
        updatedClientCategories,
        updatedClientCategoriesTotals,
        updatedBankClientsTotals,
      } = updatedArray(
        newData,
        this.state.bankCategoryTotals,
        "product_category_name",
        this.state.topN
      );
      this.setState({
        categoryCategories: updatedClientCategories,
        categoryCategoriesTotals: updatedClientCategoriesTotals,
        bankCategoryTotals: updatedBankClientsTotals,
      });
    });
  };

  handleOnStop = async () => {
    const self = this;
    this.setState({ isStopLoading: true });
    // await Promise.all(
    //   streamNamesArray.reverse().map(async (element) => {

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
      self._clientConsumer && self._clientConsumer.terminate();
      self._categoryConsumer && self._categoryConsumer.terminate();
      self._companyConsumer && self._companyConsumer.terminate();
      self._clientConsumer &&
        self._clientConsumer.on("close", () => {
          console.log(`Closing WS connection for client`);
        });
      self._companyConsumer &&
        self._companyConsumer.on("close", () => {
          console.log(`Closing WS connection for client`);
        });
      self._categoryConsumer &&
        self._categoryConsumer.on("close", () => {
          console.log(`Closing WS connection for client`);
        });
      //   await self.categoryConsumerValue.close();
      //   await self.companyConsumerValue.close();
    });
  };

  handleClearAllTables = async () => {
    this.setState({ isClearLoading: true });
    for (const element of streamTableNamesArray) {
      const result = await this.client.collection(element).truncate();
    }
    this.setState({
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
      bankClientNames: [],
      annonymousBankClientNames: [],
      selectedClient: "",
      tableType: "Transactions",
      tableData: [],
    });
  };

  handleTopN = (event) => {
    this.setState({ topN: Number(event.target.value) }, () => {
      this.getDataForChart();
      // const {
      //   bankClientsTotals,
      //   bankCompanyTotals,
      //   bankCategoryTotals,
      //   clientCategories,
      //   clientCategoriesTotals,
      //   companyCategories,
      //   companyCategoriesTotals,
      //   categoryCategories,
      //   categoryCategoriesTotals,
      //   topN,
      // } = this.state;
      // this.setState({
      //   bankClientsTotals: bankClientsTotals.splice(0, topN),
      //   bankCompanyTotals: bankCompanyTotals.splice(0, topN),
      //   bankCategoryTotals: bankCategoryTotals.splice(0, topN),
      //   clientCategories: clientCategories.splice(0, topN),
      //   clientCategoriesTotals: clientCategoriesTotals.splice(0, topN),
      //   companyCategories: companyCategories.splice(0, topN),
      //   companyCategoriesTotals: companyCategoriesTotals.splice(0, topN),
      //   categoryCategories: categoryCategories.splice(0, topN),
      //   categoryCategoriesTotals: categoryCategoriesTotals.splice(0, topN),
      // });
    });
  };

  getTableData = async () => {
    if (this.state.tableType === "Transactions") {
      const result = await this.executeRestqlQuery("getBanksTxnsByClient", {
        clientName: this.state.selectedClient,
      });
      this.setState({ tableData: result });
    }
    if (this.state.tableType === "Subscriptions") {
      const result = await this.executeRestqlQuery(
        "getBankSubscriptionsByClient",
        {
          clientName: this.state.selectedClient,
        }
      );
      this.setState({ tableData: result });
    }
    if (this.state.tableType === "Anonymous") {
      const result = await this.executeRestqlQuery(
        "getBankTxnsByAnnonymousClient",
        {
          clientName: this.state.selectedClient,
        }
      );
      this.setState({ tableData: result });
    }
  };

  handleSelectClient = (event) => {
    this.setState({ selectedClient: event.target.value }, async () => {
      await this.getTableData();
    });
  };
  handleTableType = (name) => {
    this.setState({ tableType: name }, async () => {
      await this.getTableData();
    });
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
        <ETLTable
          bankClientNames={
            this.state.tableType === "Anonymous"
              ? this.state.annonymousBankClientNames
              : this.state.bankClientNames
          }
          selectedClient={this.state.selectedClient}
          handleSelectClient={this.handleSelectClient}
          handleTableType={this.handleTableType}
          tableData={this.state.tableData}
          tableType={this.state.tableType}
        />
      </ThemeProvider>
    );
  }
}
