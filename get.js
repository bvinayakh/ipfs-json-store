const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "f76858a41fe05aa4da68",
  "868cbcb3156fd036d6ac6eed045e7d793a3bf48ad32472f376957d8c898596fa"
);

var request = require("request");
module.exports.get = (_wallet) => {
  pinata
    .pinList()
    .then((result) => {
      Object.keys(result.rows).forEach((element) => {
        let entry = result.rows[element];
        if ((entry.metadata.name = _wallet) && entry.date_unpinned == null) {
          request(
            "https://gateway.pinata.cloud/ipfs/" + entry.ipfs_pin_hash,
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                var data = {
                  hash: entry.ipfs_pin_hash,
                  pindate: entry.date_pinned,
                  //   body: Buffer.from(body).toString("base64"),
                  body: body,
                };
                console.log(data);
              }
            }
          );
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
