import web3 from "./web3";
import Campaign from "./build/Campaign.json";

const CampaignABI = Campaign.abi;

export default (address) => {
  return new web3.eth.Contract(CampaignABI, address);
};
