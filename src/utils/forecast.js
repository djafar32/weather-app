const request = require("request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=81036daa9e74d1221c535c32105af975&query=${address}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { region, country } = body.location;
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(undefined, {
        location: `${address}, ${region}, ${country}`,
        weather: `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} out.`,
      });
    }
  });
};

module.exports = forecast;
