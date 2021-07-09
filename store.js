const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "f76858a41fe05aa4da68",
  "868cbcb3156fd036d6ac6eed045e7d793a3bf48ad32472f376957d8c898596fa"
);

var wallet = "0x0CcA67351d8384800836B937Ad61C4Ac853b744C";

var body = {
  wallet: "0x0CcA67351d8384800836B937Ad61C4Ac853b744C",
  options: [
    {
      contract: "xyz456",
      asset: "BTC/USD",
      strike: "32000",
      expiry: "111212121",
    },
    {
      contract: "abc123",
      asset: "ETH/USD",
      strike: "3000",
      expiry: "333333",
    },
  ],
};

store(wallet, body);

function store(_wallet, _body) {
  const options = {
    pinataMetadata: {
      name: _wallet,
    },
  };
  pinata.pinList().then((result) => {
    Object.keys(result.rows).forEach((element) => {
      let entry = result.rows[element];
      if ((entry.metadata.name = _wallet) && entry.date_unpinned == null) {
        pinata
          .unpin(entry.ipfs_pin_hash)
          .then((searchresult) => {
            // console.log(searchresult);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      pinData(_body, options);
    });
  });
  console.log("operation complete");
}

function pinData(body, options) {
  pinata
    .pinJSONToIPFS(body, options)
    .then((pinresult) => {
      //   console.log(pinresult.ipfs_pin_hash);
    })
    .catch((err) => {
      console.log(err);
    });
}
