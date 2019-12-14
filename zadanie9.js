const util = require("util");
const fs = require("fs");
const request = require("request");

const writeFile = util.promisify(fs.writeFile);

const getUser = id => {
  return new Promise((resolve, reject) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    request(url, { json: true }, (err, resp, user) => {
      if (err) return reject("err");
      if (resp.statusCode === 200) {
        return resolve(user);
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
      if (err) return reject("no internet");
      if (resp.statusCode === 200) {
        return resolve(weather);
      } else {
        console.log("błąd pogody");
      }
    });
  });
};

getUser(2).then(user => {
  getWeather(user.address.geo.lat, user.address.geo.lng)
    .then(us => {
      writeFile("us.txt", JSON.stringify(us.weather)).then(
        console.log("zapisano w us")
      );
    })
    .catch(cat => {
      console.log(`błąd: ${cat}`);
    });
});
