import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../etherum/campaign";
import { Button, Card, Grid } from "semantic-ui-react";
import web3 from "../../etherum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

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
      address: props.query.address,
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
          "The manager created this camapign and can create requests for withdraw money from the campaign.",
        meta: "Address of the Manager",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description:
          "You must contribute at least this much wei to become an approver.",
        meta: "Minimum Contribution (wei)",
      },
      {
        header: requestCount,
        description:
          "A request tries to withdarw money from the contract.request must be approved by the approvers.",
        meta: "Number of Requests",
      },
      {
        header: approversCount,
        description: "Number of people that already donated to this campaign.",
        meta: "Number of Approvers",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "the balance is how much money this campaign has left to spend",
        meta: "Campaign Balance (ether)",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderSummury()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link href={`/campaigns/${this.props.address}/requests`}>
                <Button primary>View Requests</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
