const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledCampaignFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "solar virus nothing clump reunion area abuse badge regular decide urge crater",
  "https://sepolia.infura.io/v3/d9dab30341e64603baa3fc7bbeba814b"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const factoryABI = compiledCampaignFactory.abi;
  const factoryByteCode = compiledCampaignFactory.evm.bytecode.object;

  const gasEstimate = await web3.eth.estimateGas({
    data: factoryByteCode,
    from: accounts[0],
  });

  console.log("Attemptinf to deploy from acount ", accounts[0]);

  const result = await new web3.eth.Contract(factoryABI)
    .deploy({ data: factoryByteCode })
    .send({ gas: gasEstimate, from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop();
};

deploy();
