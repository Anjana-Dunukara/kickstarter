import web3 from "./web3";
const CampaignFactory = require("./build/CampaignFactory.json");

const factoryABI = CampaignFactory.abi;

const instance = new web3.eth.Contract(
  factoryABI,
  "0xC30ae216655e71432314c119eb746d0B18D068Db"
);

export default instance;
