const getApiAndEmit = io => {
    const response = new Date()

    const res = [response.getDate(), response.getHours(), response.getSeconds()]

    // Emitting a new message. Will be consumed by the client
    io.emit("FromAPI", res)
  };

module.exports = getApiAndEmit



