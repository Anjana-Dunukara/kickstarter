import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/d9dab30341e64603baa3fc7bbeba814b"
  );

  web3 = new Web3(provider);
}

export default web3;
