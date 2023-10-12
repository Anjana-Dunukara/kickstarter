import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../etherum/campaign";

class Requests extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requestsArr = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requestsArr, requestCount };
  }

  render() {
    const { Header, HeaderCell, Row, Body } = Table;

    return (
      <Layout>
        <h3>This is Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary>Create Request</Button>
        </Link>
      </Layout>
    );
  }
}

export default Requests;
