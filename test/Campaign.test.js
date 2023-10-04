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

  it("marks the caller as the mangaer", async () => {
    const manger = await campaign.methods.manager().call();
    assert.equal(accounts[0], manger);
  });

  it("allows people contribute money and and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("allows manager to make payment requests", async () => {
    await campaign.methods
      .createRequest("Buy arduino boards", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    const request = await campaign.methods.requests(0).call();

    assert.equal("Buy arduino boards", request.description);
  });

  it("process requests", async () => {
    await campaign.methods.contribute().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[0],
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});
