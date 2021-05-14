/* -------------------------------------------------------------------------- */
/*                            Stream Wrapper Class                            */
/* -------------------------------------------------------------------------- */

/*
  ...
  // Consumer websocket example
  const connection = new StreamWebsocket(()=>stream.consumer(name,url))
  ...
  ...
  ...
  // Producer websocket example -
  const connection = new StreamWebsocket(()=>stream.producer(url))
  ...

*/

class StreamWebsocket {
  constructor(ws) {
    /*  Map for Websocket events */
    this._listeners = {
      error: [],
      message: [],
      open: [],
      close: [],
    };

    /* Determines connection should try to reconnect */
    this._shouldReconnect = true;

    /* Countet to keep track for the Number for Retries for the connection */
    this._retryCount = -1;

    /* Number of time it will try to reconnect if error */
    this._maxRetries = Infinity;

    /* Configuration variables for waiting before re-opening the connection */
    this._maxReconnectionDelay = 10000;
    this._minReconnectionDelay = 1000 + Math.random() * 4000;
    this._reconnectionDelayGrowFactor = 1.3;

    this._connectLock = false;
    this._ws;

    this._getConnection = ws;
    this._connect();
  }

  /* --------------------------------- Helpers -------------------------------- */

  /* Encodes a string in base-64. */
  _btoa(str) {
    return Buffer.from(str).toString("base64");
  }

  /* Method to calculate delay before re-opening the connection */
  _getNextDelay() {
    let delay = 0;

    if (this._retryCount > 0) {
      delay =
        this._minReconnectionDelay *
        Math.pow(this._reconnectionDelayGrowFactor, this._retryCount - 1);
      if (delay > this._maxReconnectionDelay) {
        delay = this._maxReconnectionDelay;
      }
    }

    return delay;
  }
  /* Method implements delay by returning a promise to resolve when delay completes   */
  _wait() {
    return new Promise((resolve) => {
      setTimeout(resolve, this._getNextDelay());
    });
  }

  /* Method triggers callback function attached to sockets events   */
  _callEventListener(event, listener) {
    if (typeof listener === "function") {
      listener(event);
    }
  }

  /* Attaching callbacks function sockets events   */
  _addListeners() {
    if (!this._ws) {
      return;
    }

    this._ws.on("open", this._handleOpen.bind(this));
    this._ws.on("close", this._handleClose.bind(this));
    this._ws.on("message", this._handleMessage.bind(this));
    this._ws.on("error", this._handleError.bind(this));
  }

  /* Method to be triggered on websocket close  */
  _handleClose(event) {
    if (this._shouldReconnect) {
      this._connect();
    }

    this._listeners.close.forEach((listener) =>
      this._callEventListener(event, listener)
    );
  }

  /* Method to be triggered on websocket message  */
  _handleMessage(msg) {
    const parsedMsg = JSON.parse(msg);
    this._listeners.message.forEach((listener) =>
      this._callEventListener(parsedMsg, listener)
    );
  }

  /* Method to be triggered on websocket error  */
  _handleError(event) {
    this._listeners.error.forEach((listener) =>
      this._callEventListener(event, listener)
    );
  }

  /* Method to be triggered on websocket open  */
  _handleOpen(event) {
    this._listeners.open.forEach((listener) =>
      this._callEventListener(event, listener)
    );
  }

  /* Method to open a websocket connection  */
  _connect() {
    if ((this._connectLock || !this._shouldReconnect) && this._retryCount > 0) {
      return;
    }

    this._connectLock = true;

    this._wait().then(() => {
      if (this._retryCount >= this._maxRetries) {
        return;
      }
      this._ws = this._getConnection();
      this._connectLock = false;
      this._retryCount++;
      this._addListeners();
    });
  }

  /* -------------------------------------------------------------------------- */

  /* Method to attach a callback events to connection */
  on(type, cb) {
    if (this._listeners[type]) {
      this._listeners[type].push(cb);
    }
  }

  /* Method to send data to websocket */
  send(msg) {
    const msgToSend = JSON.stringify({ payload: this._btoa(msg) });
    this._ws.send(msgToSend);
  }

  /* Method to send acknowledgment to websocket */
  ack(messageId) {
    this._ws.send(JSON.stringify({ messageId }));
  }

  /* Method to close a websocket */
  close() {
    this._shouldReconnect = false;
    this._ws.close();
  }
}

export default StreamWebsocket;
