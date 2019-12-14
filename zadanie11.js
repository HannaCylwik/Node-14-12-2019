const request = require("request");
const fs = require("fs");

const getSomeUserInfo = id => {
  return new Promise((resolve, reject) => {
    let url = `https://jsonplaceholder.typicode.com/users/${id}`;
    request(url, { json: true }, (err, resp, uInfo) => {
      if (resp.statusCode === 200) {
        return resolve(uInfo);
      }
      if (err) {
        return reject(err);
      } else {
        console.log(reject(`błąd: ${err}`));
      }
    });
  });
};
const getSomeAlbumInfo = id => {
  return new Promise((resolve, reject) => {
    let url = `https://jsonplaceholder.typicode.com/albums?userId=${id}`;
    request(url, { json: true }, (err, resp, uInfo) => {
      if (resp.statusCode === 200) {
        return resolve(uInfo);
      }
      if (err) {
        return reject(err);
      } else {
        console.log(reject(`błąd: ${err}`));
      }
    });
  });
};
const getSomePhotoInfo = id => {
  return new Promise((resolve, reject) => {
    let url = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;
    request(url, { json: true }, (err, resp, uInfo) => {
      if (resp.statusCode === 200) {
        return resolve(uInfo);
      }
      if (err) {
        return reject(err);
      } else {
        console.log(reject(`błąd: ${err}`));
      }
    });
  });
};

///////////////////

getSomeUserInfo(1)
  .then(info => {
    console.log(`Imię użytkownika to: ${info.name}`);
  })
  .catch(noInfo => {
    console.log(noInfo);
  });

getSomeAlbumInfo(1)
  .then(album => {
    console.log(
      `Długość albumu to: ${album.length}, pierwszy album: ${album[0].title}`
    );
    return getSomePhotoInfo(1).then(photo => {
      fs.writeFile(
        `${album[0].title.substr(0, 10)}.txt`,
        photo.map(ph => ph.title),
        () => {
          console.log("zrobioneeee");
        }
      );
    });
  })
  .catch(noAlbum => {
    console.log(noAlbum);
  });
