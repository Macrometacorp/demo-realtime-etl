/* eslint-disable import/no-anonymous-default-export */
export default () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/custom-service-worker.js")
      .then(() => {
        console.log("my custom service worker registerd");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
};
