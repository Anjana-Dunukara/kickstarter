const ganache = require("ganache-cli");
const assert = require("assert");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../etherum/build/CampaignFactory.json");
const compiledCampaign = require("../etherum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  const compiledFactoryABI = compiledFactory.abi;
  const compiledCampaignABI = compiledCampaign.abi;

  const gasEstimate = await web3.eth.estimateGas({
    data: compiledFactory.evm.bytecode.object,
    from: accounts[0],
  });

  factory = await new web3.eth.Contract(compiledFactoryABI)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: gasEstimate });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = deployedCampaigns[0];

  campaign = await new web3.eth.Contract(compiledCampaignABI, campaignAddress);
});

describe("Campaign", () => {
  it("Deploy a factory and a Campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});
