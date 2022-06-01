
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



