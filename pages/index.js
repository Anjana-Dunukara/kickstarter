import React, { Component } from "react";
import factory from "../etherum/factory";

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCamapigns().call();
    console.log(campaigns);
  }

  render() {
    return <div>This is Index!!!</div>;
  }
}

export default CampaignIndex;
