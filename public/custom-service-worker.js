//console.log("hello");
// const client = new jsc8({
//   url: "https://anurag.eng.macrometa.io",
//   apiKey:
//     "anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
// });
// const establishConnection1 = async (streamName) => {
//   try {
//     const result = await fetch("https://***REMOVED***/apid/otp", {
//       method: "POST",
//       headers: {
//         Authorization:
//           "apikey anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
//       },
//     });
//     const response = await result.json();
//     const otp = response.otp;
//     const _clientConsumer = new WebSocket(
//       `wss://***REMOVED***/_ws/ws/v2/consumer/persistent/anurag_eng_macrometa.io/c8global._system/c8globals.EtlBankClientNameTotalStream/anurag?otp=${otp}`
//     );
//     //       //    await stream.createStream();

//     // const consumerOTP = await stream.getOtp();
//     // const _clientConsumer = stream.consumer(
//     //   "anurag",
//     //   "anurag.eng.macrometa.io",
//     //   {
//     //     otp: consumerOTP,
//     //   }
//     // );
//     _clientConsumer.onopen = function (event) {
//       //console.log(
//         "WebSocket is open now for EtlBankClientNameTotalStream",
//         new Date()
//       );
//     };
//     // _clientConsumer.on("open", () => {
//     //   //console.log(`Connection open for _clientConsumer `);
//     // });
//     let cs;
//     _clientConsumer.onmessage = function (msg) {
//       //console.log(`Logged output: _clientConsumer.onmessage -> msg`, msg.data);
//       _clientConsumer.send(
//         JSON.stringify({ messageId: JSON.parse(msg.data).messageId })
//       );
//       const { newData } = parseMessage(msg.data);
//       cs = newData;
//       //console.log(`Logged output: ETLDashboard -> newData`, newData);
//     };
//     navigator.serviceWorker.controller.postMessage({
//       news: cs,
//     });
//   } catch (error) {
//     console.error("error", error);
//   }
// };
// const establishConnection3 = async () => {
//   try {
//     const result = await fetch("https://***REMOVED***/apid/otp", {
//       method: "POST",
//       headers: {
//         Authorization:
//           "apikey anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
//       },
//     });
//     const response = await result.json();
//     const otp = response.otp;
//     const _categoryConsumer = new WebSocket(
//       `wss://***REMOVED***/_ws/ws/v2/consumer/persistent/anurag_eng_macrometa.io/c8global._system/c8globals.EtlBankCategoryNameTotalStream/anurag?otp=${otp}`
//     );
//     //       //    await stream.createStream();

//     // const consumerOTP = await stream.getOtp();
//     // const _clientConsumer = stream.consumer(
//     //   "anurag",
//     //   "anurag.eng.macrometa.io",
//     //   {
//     //     otp: consumerOTP,
//     //   }
//     // );
//     _categoryConsumer.onopen = function (event) {
//       //console.log(
//         "WebSocket is open now for _categoryConsumer",
//         new Date()
//       );
//     };
//     // _clientConsumer.on("open", () => {
//     //   //console.log(`Connection open for _clientConsumer `);
//     // });
//     let cs;
//     _categoryConsumer.onmessage = function (msg) {
//       //console.log(
//         `Logged output: _categoryConsumer.onmessage -> msg`,
//         msg.data
//       );
//       _categoryConsumer.send(
//         JSON.stringify({ messageId: JSON.parse(msg.data).messageId })
//       );
//       const { newData } = parseMessage(msg.data);
//       cs = newData;
//       //console.log(`Logged output: _categoryConsumer -> newData`, newData);
//     };
//     navigator.serviceWorker.controller.postMessage({
//       news: cs,
//     });
//   } catch (error) {
//     console.error("error", error);
//   }
// };
// const establishConnection2 = async () => {
//   try {
//     const result = await fetch("https://***REMOVED***/apid/otp", {
//       method: "POST",
//       headers: {
//         Authorization:
//           "apikey anurag_eng_macrometa.io.anurag_sample.CRXbwlhrvLU5wAS2ORXOV3colqxIK0APpik9bh2FyVFgmPZshsGdL5zlLBwtjUHU34ee7a",
//       },
//     });
//     const response = await result.json();
//     const otp = response.otp;
//     const _companyConsumer = new WebSocket(
//       `wss://***REMOVED***/_ws/ws/v2/consumer/persistent/anurag_eng_macrometa.io/c8global._system/c8globals.EtlBankCompanyNameTotalStream/anurag?otp=${otp}`
//     );
//     //       //    await stream.createStream();

//     // const consumerOTP = await stream.getOtp();
//     // const _clientConsumer = stream.consumer(
//     //   "anurag",
//     //   "anurag.eng.macrometa.io",
//     //   {
//     //     otp: consumerOTP,
//     //   }
//     // );
//     _companyConsumer.onopen = function (event) {
//       //console.log("WebSocket is open now for _companyConsumer", new Date());
//     };
//     // _clientConsumer.on("open", () => {
//     //   //console.log(`Connection open for _clientConsumer `);
//     // });
//     let cs;
//     _companyConsumer.onmessage = function (msg) {
//       //console.log(`Logged output: _companyConsumer.onmessage -> msg`, msg.data);
//       _clientConsumer.send(
//         JSON.stringify({ messageId: JSON.parse(msg.data).messageId })
//       );
//       const { newData } = parseMessage(msg.data);
//       cs = newData;
//       //console.log(`Logged output: _companyConsumer -> newData`, newData);
//     };
//     // navigator.serviceWorker.controller.postMessage({
//     //   news: cs,
//     // });
//   } catch (error) {
//     console.error("error", error);
//   }
// };
// establishConnection1("EtlBankClientNameTotalStream");
// establishConnection2();
// establishConnection3();
