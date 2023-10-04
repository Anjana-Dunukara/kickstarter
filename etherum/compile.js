const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (let contractName in compiled.contracts["Campaign.sol"]) {
  const contract = compiled.contracts["Campaign.sol"][contractName];
  fs.outputJSONSync(path.resolve(buildPath, contractName + ".json"), contract);
}
