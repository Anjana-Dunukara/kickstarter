import web3 from "./web3";

const CampaignFactory = require("./build/CampaignFactory.json");

const factoryABI = CampaignFactory.abi;

const instance = new web3.eth.Contract(
  factoryABI,
  "0x4e056dc456eb7121fCfd1C6eA13b65F68a3662D5"
);

export default instance;
