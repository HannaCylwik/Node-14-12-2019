const request = require("request");
const fs = require("fs");

const getSaving = id => {
  return new Promise((resolve, reject) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    request(url, { json: true }, (err, resp, user) => {
      if (err) reject("err");
      if (resp.statusCode === 200) {
        resolve(user);
      } else {
        console.log(user, "błąd użytkownika");
      }
    });
  });
};

const getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const url2 = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    request(url2, { json: true }, (err, resp, weather) => {
      if (err) reject("no internet");
      if (resp.statusCode === 200) {
        resolve(weather);
      } else {
        console.log("błąd pogody");
      }
    });
  });
};

getSaving(2)
  .then(user => {
    return getWeather(user.address.geo.lat, user.address.geo.lng);
  })
  //   .then(weather => console.log(weather.weather[0]))
  .then(weather =>
    fs.writeFile("weather.txt", JSON.stringify(weather.weather), () => {
      console.log("problem saved");
    })
  )
  .catch(error => console.log(error));
