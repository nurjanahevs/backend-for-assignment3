const mongoose = require("mongoose");

module.exports = () => {
  const evaserver =
    "mongodb://test123:test123@dbeva-shard-00-00.3gs73.mongodb.net:27017,dbeva-shard-00-01.3gs73.mongodb.net:27017,dbeva-shard-00-02.3gs73.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-hc0xp4-shard-0&authSource=admin&retryWrites=true&w=majority";
  mongoose.connect(evaserver, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
  console.log("connect mongoose on ", evaserver);
  // const db = mongoose.connection
  // db.once('open', () => {
  //     console.log('connect mongoose on ', evaserver)
  // })
};
