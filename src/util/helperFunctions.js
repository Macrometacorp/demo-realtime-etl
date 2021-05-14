import _ from "lodash";
export const parseMessage = (msg) => {
  console.log("Adsad", JSON.parse(msg).payload);

  const encodedMessage = JSON.parse(msg).payload;
  const messageId = JSON.parse(msg).messageId;

  const decodedMessage = atob(encodedMessage);
  console.log(`Logged output: parseMessage -> decodedMessage`, decodedMessage);
  const newData = JSON.parse(decodedMessage);
  console.log("atosb", newData);
  return { newData, messageId };
};

export const updatedArray = (newMessage, bankClientsTotals, keys, topN) => {
  let _bankClientsTotals = JSON.parse(JSON.stringify(bankClientsTotals));

  _bankClientsTotals.push(newMessage);

  _bankClientsTotals.sort(
    (totalA, totalB) => totalB.total_amount - totalA.total_amount
  );
  //check for duplicay
  const s = _.uniqBy(_bankClientsTotals, keys);
  console.log("_bankClientsTotals", _bankClientsTotals);
  // if (s.length > topN) {
  //   s.pop();
  // }
  s.splice(0, topN);
  const updatedClientCategories = s.map((element) => element[keys]);
  const updatedClientCategoriesTotals = s.map(
    (element) => element.total_amount
  );
  // const index = categoriesTotalArray.findIndex(
  //   (number) => number < newMessage.total_amount
  // );

  // console.log("clientConsumer index", index);

  // if (!!index) {
  //   let c = [];
  //   let d = [];
  //   const sli = categoriesTotalArray.slice(0, index);
  //   const sli2 = categoriesArray.slice(0, index);
  //   sli.push(newMessage.total_amount);
  //   sli2.push(newMessage.client_name);
  //   const sliw = categoriesTotalArray.slice(
  //     index,
  //     categoriesTotalArray.length - 1
  //   );
  //   const sliw2 = categoriesArray.slice(index, categoriesArray.length - 1);
  //   c = [...sli2, ...sliw2];
  //   d = [...sli, ...sliw];
  //   return { newTotal: d, newCategory: c };
  // }
  return {
    updatedClientCategories,
    updatedClientCategoriesTotals,
    updatedBankClientsTotals: s,
  };
};
