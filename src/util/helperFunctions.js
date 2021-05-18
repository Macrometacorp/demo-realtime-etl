import _ from "lodash";
export const parseMessage = (msg) => {
  const encodedMessage = JSON.parse(msg).payload;
  const messageId = JSON.parse(msg).messageId;
  const decodedMessage = atob(encodedMessage);
  if (decodedMessage.length === 0) {
    return { newData: {}, messageId };
  }
  const newData = JSON.parse(decodedMessage);
  return { newData, messageId };
};

export const updatedArray = (newMessage, bankClientsTotals, keys, topN) => {
  let _bankClientsTotals = bankClientsTotals;
  if (!_.isEmpty(newMessage)) {
    _bankClientsTotals.push(newMessage);
  }

  _bankClientsTotals.sort(
    (totalA, totalB) => totalB.total_amount - totalA.total_amount
  );
  let slicedArray = _.uniqBy(_bankClientsTotals, keys);
  // console.log(
  //   `Logged output: updatedArray -> _bankClientsTotals`,
  //   _bankClientsTotals,
  //   _bankClientsTotals.length
  // );
  // console.log(`Logged output: updatedArray -> slicedArray`, slicedArray, topN);
  let newArr = [];
  if (slicedArray.length > topN) {
    newArr = slicedArray.slice(0, topN);
  }

  return {
    updatedBankClientsTotals: newArr,
  };
};
