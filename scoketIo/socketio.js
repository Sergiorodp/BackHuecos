const getApiAndEmit = io => {
    const response = new Date()

    const res = [{
      name : 'velocidad',
      value : response.getHours()
    },{
      name : 'aceleracion',
      value : response.getMinutes()
    },{
      name : 'tiempo',
      value : response.getSeconds()
    }]

    // Emitting a new message. Will be consumed by the client
    io.emit("FromAPI", res)
  };

module.exports = getApiAndEmit



