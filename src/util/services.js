import jsc8 from "jsc8";
import { streamTableNamesArray, streamNamesArray } from "./streamNamesArray";

const client = new jsc8({
  url: `https://${process.env.REACT_APP_GDN_URL}`,
  apiKey: process.env.REACT_APP_API_KEY,
  fabricName: process.env.REACT_APP_FABRIC_NAME,
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
  try {
    const streamPromises = [];
    streamNamesArray.forEach((element) => {
      streamPromises.push(client.activateStreamApp(element, start));
    });
    await Promise.all(streamPromises);
  } catch (error) {
    console.log("error 502", error);
    throw error;
  }
};

export const establishConnection = async (streamName) => {
  try {
    const stream = client.stream(streamName, false);
    const consumerOTP = await stream.getOtp();
    const _consumer = stream.consumer(
      `etl-streams-${Math.round(Math.random() * 1000)}`,
      process.env.REACT_APP_GDN_URL,
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
