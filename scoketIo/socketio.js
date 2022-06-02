
const getApiAndEmit = io => {

    const response = new Date()

    const res = [{
      name : 'velocidad',
      value : (Math.random() * (120 - 10) + 10).toFixed(2)
    },{
      name : 'aceleracion',
      value : (Math.random() * (30 - 1) + 1).toFixed(2)
    },{
      name : 'tiempo',
      value : response.getSeconds()
    }]

    // Emitting a new message. Will be consumed by the client
    io.emit("FromAPI", res)
  };

  var lat = 4.6948781;
  var lon = -74.1146918;

const getPosition = (io) =>{
    
    lat += 0.0001
    lon += 0.0001

    if(lat > 5 || lon > -73){
      lat = 4.6948781;
      lon = -74.1146918;
    }

    let payload = {
        'lat' : lat,
        'lon' : lon
    }

    io.emit('prueba', payload)
}

module.exports = {getApiAndEmit, getPosition}



