// // ZADANIE 1

// const helloPromise = new Promise((resolve, reject) => {
//   resolve("hello world");
// });
//// reject tu NIEKONIECZNIE

// //
// const helloPromise = new Promise((resolve, reject) => {
//   if (resolve) {
//     resolve("hello world");
//   } else {
//     reject("goodbay world");
//   }
// });

// helloPromise.then(text => {
//   console.log(text);
// });

// // ZADANIE 2

// const helloPromise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("done");
//   }, 5000);
// });

// helloPromise2.then(text => {
//   console.log(text);
// });

// ZADANIE 3

// const sub = (a, b) => {
//   return new Promise((resolve, reject) => {
//     if (a - b >= 0) {
//       resolve("it's okay, higher than 0");
//     } else {
//       reject("not okay, lower than 0");
//     }
//   });
// };

// sub(3, 4)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

//// Z ZAJĘĆ

// const sub = (a, b) => {
//   let sum = a - b;
//   return new Promise((resolve, reject) => {
//     if (sum >= 0) {
//       resolve("it's okay, higher than 0");
//     } else {
//       reject("not okay, lower than 0");
//     }
//   });
// };

// sub(3, 4)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

////

// ZADANIE 4

const request = require("request");

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

getUser(2)
  .then(result => {
    console.log(result.name);
  })
  .catch(error => {
    console.log(error);
  });

// ZADANIE 5

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

getUser(2)
  .then(user => {
    return getWeather(user.address.geo.lat, user.address.geo.lng);
  })
  .then(weather => console.log(weather.weather[0]))
  .catch(error => console.log(error));

// ZADANIE 6

/////1
// const user1 = getUser(4);
// const user2 = getUser(5);
// const user3 = getUser(6);

// Promise.all([user1, user2, user3]).then(users => {
//   users.forEach(user => console.log(user.name));
//   // return console.log(users);
// });

/////2
// const id = [4, 5, 6];
// const userPromise = id.map(ids => getUser(ids));

// Promise.all(userPromise)
//   .then(users => {
//     users.forEach(user => console.log(user.name));
//   })
//   .finally(() => console.log("finished"));

// ZADANIE 7

const fs = require("fs");

///////////////////
//// function xx(promise) {
//   promise.then(function yy(user2) {
//     return new Promise((resolve, reject) => {
//       if (resolve) {
//         resolve([user2.name, user2.address.geo.lat, user2.address.geo.lng]);
//       } else {
//         reject("no saving");
//       }
//     }).then(infos => {
//       fs.writeFile("nameAndWeather.txt", infos, "utf-8", () => {
//         console.log("saved");
//       });
//     });
//   });
// }

// xx(getUser(2));
///////////////////

// p = x => {
//   new Promise((resolve, reject) => {
//     let user = getUser(x);
//     if (user !== "undefined") {
//       resolve(user);
//     } else {
//       reject("not done");
//     }
//   })
//     .then(mess => {
//       fs.writeFile(
//         "userAndWeather.txt",
//         [`${mess.name}, ${mess.address.geo.lat}, ${mess.address.geo.lng}`],
//         "utf-8",
//         () => {
//           console.log("saved");
//         }
//       );
//       // console.log(mess.name, mess.address.geo.lat, mess.address.geo.lng);
//     })
//     .catch(mess => {
//       console.log(mess);
//     });
// };

// p(2);
// });

// p(2);

// ZADANIE 8

// const axios = require("axios");

// axios
//   .get("https://jsonplaceholder.typicode.com/users/2")
//   .then(mess => {
//     fs.writeFile(
//       "userAndWeather.txt",
//       [
//         `${mess.data.name}, ${mess.data.address.geo.lat}, ${mess.data.address.geo.lng}`
//       ],
//       "utf-8",
//       () => {
//         console.log("saved");
//       }
//     );
//     // console.log(mess.data.name);
//   })
//   .catch(mess => {
//     console.log(`Błąd, ponieważ: ${mess.data}`);
//   });

// ZADANIE 9

const util = require("util");
const writeFile = util.promisify(fs.writeFile);

// let writting = getUser(2);

getUser(2).then(user => {
  getWeather(user.address.geo.lat, user.address.geo.lng).then(us => {
    writeFile("us.txt", JSON.stringify(us.weather));
  });
});

// ZADANIE 10
