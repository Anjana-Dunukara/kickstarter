import web3 from "./web3";

const CampaignFactory = require("./build/CampaignFactory.json");

const factoryABI = CampaignFactory.abi;

const instance = new web3.eth.Contract(
  factoryABI,
  "0xd839ED49D76A2B731efEAcAFe0a522B6b20E3974"
);

export default instance;
