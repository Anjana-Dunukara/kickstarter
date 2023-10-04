const ganache = require("ganache-cli");
const Web3 = require("web3");
const assert = require("assert");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../etherum/build/CampaignFactory.json");
const compiledCampaign = require("../etherum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: account[0], gas: 1000000 });
});
