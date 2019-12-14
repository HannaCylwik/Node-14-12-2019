const axios = require("axios");
const fs = require("fs");

axios
  .get("https://jsonplaceholder.typicode.com/users/2")
  .then(mess => {
    fs.writeFile(
      "userAndWeather.txt",
      [
        `${mess.data.name}, ${mess.data.address.geo.lat}, ${mess.data.address.geo.lng} `
      ],
      "utf-8",
      () => {
        console.log("saved");
      }
    );
    return (
      //   mess,
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${mess.data.address.geo.lat}&lon=${mess.data.address.geo.lng}`
        )
        .then(weath => {
          fs.appendFile(
            "userAndWeather.txt",
            JSON.stringify(weath.data.weather),
            () => {
              console.log("weather done");
            }
          );
        })
    );
  })
  .catch(mess => {
    console.log(`Błąd, ponieważ: ${mess.data}`);
  });
