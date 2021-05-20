import jsc8 from "jsc8";
import { streamTableNamesArray, streamNamesArray } from "./streamNamesArray";

const client = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  apiKey:
    "stream-etl_macrometa.io.stream_etl_api_key.IxdAQ3xclGbaNut6Ey5S5lsyFr2SYvuI3BpjyvUiko2CQgcrQ68LWRCuGndSdEObb52fb0",
});

export const executeRestqlQuery = async (restQlName, bindVars = {}) => {
  try {
    const resp = await client.executeRestql(restQlName, bindVars);
    return resp.result;
  } catch (error) {
    console.error("error", error);
  }
};
export const clearTablesData = async () => {
  await Promise.all(
    streamTableNamesArray.map(async (element) => {
      await client.collection(element).truncate();
    })
  );
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
    const _consumer = stream.consumer("anurag", "gdn.paas.macrometa.io", {
      otp: consumerOTP,
    });
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
