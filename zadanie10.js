const request = require("request");

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

getSomeUserInfo(1)
  .then(info => {
    console.log(`Imię użytkownika to: ${info.name}`);
  })
  .catch(noInfo => {
    console.log(noInfo);
  });

// getSomeAlbumInfo(1)
//   .then(album => {
//     console.log(
//       `Długość albumu to: ${album.length}, pierwszy album: ${album[0].title}`
//     );
//   })
//   .catch(noAlbum => {
//     console.log(noAlbum);
//   });

// getSomePhotoInfo(1)
//   .then(photo => console.log(photo.map(ph => ph.title)))
//   .catch(noPhoto => console.log(noPhoto));

//////////////////

const fs = require("fs");

getSomeAlbumInfo(1)
  .then(album => {
    console.log(
      `Długość albumu to: ${album.length}, pierwszy album: ${album[0].title}`
    );
    fs.writeFile(`${album[0].title}.txt`, album, () => {
      console.log("zrobione");
    });
    return getSomePhotoInfo(1).then(photo => {
      fs.writeFile(
        `${album[0].title}.txt`,
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
