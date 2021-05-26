import jsc8 from "jsc8";
import { streamTableNamesArray, streamNamesArray } from "./streamNamesArray";

const client = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  apiKey: "xxx",
});

export const executeRestqlQuery = async (restQlName, bindVars = {}) => {
  try {
    const resp = await client.executeRestql(restQlName, bindVars);
    return resp.result;
  } catch (error) {
    console.error("error", error);
    return [];
    // throw error;
  }
};
export const clearTablesData = async () => {
  try {
    await Promise.all(
      streamTableNamesArray.map(async (element) => {
        await client.collection(element).truncate();
      })
    );
  } catch (error) {
    console.log("the error is", error);
  }
};

export const startStopStream = async (start) => {
  for (const element of streamNamesArray) {
    try {
      await client.activateStreamApp(element, start);
    } catch (error) {
      console.log("error 502", error);
      throw error;
    }
  }
};

export const establishConnection = async (streamName) => {
  try {
    const stream = client.stream(streamName, false);
    const consumerOTP = await stream.getOtp();
    const _consumer = stream.consumer(
      "anurag-streams",
      "gdn.paas.macrometa.io",
      {
        otp: consumerOTP,
      }
    );
    _consumer.on("open", () => {
      console.log(`Connection open for _clientConsumer `);
    });
    _consumer.on("close", () => {
      console.log(`Connection close for _clientConsumer `);
    });
    return _consumer;
  } catch (error) {
    console.error("error", error);
  }
};

export const getBankClientNames = async (queryName) => {
  let result = [];
  for (let i = 0; i < 10; i++) {
    result[i] = executeRestqlQuery(queryName, {
      offsetValue: i * 100,
    });
  }

  const bankClientsResponse = await Promise.all(result);
  const bankClientNames = bankClientsResponse.reduce(
    (_bankClientNames, bankClients) => {
      _bankClientNames.push(...bankClients);
      return _bankClientNames;
    },
    []
  );

  bankClientNames.sort((a, b) => a.id.localeCompare(b.id));
  return bankClientNames;
};
