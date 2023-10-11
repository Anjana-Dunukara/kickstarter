import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../etherum/campaign";
import { Card } from "semantic-ui-react";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summury = await campaign.methods.getSummury().call();
    return {
      minimumContribution: summury[0],
      balance: summury[1],
      requestCount: summury[2],
      approversCount: summury[3],
      manager: summury[4],
    };
  }

  renderSummury() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        description:
          "The manager created this Camapign and can create requests for withdraw money from the campaign",
        meta: "Address of the manager",
        Style: { overflowWrap: "break-word" },
      },
    ];

    <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderSummury()}
      </Layout>
    );
  }
}

export default CampaignShow;
