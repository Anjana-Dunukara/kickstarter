import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";

class Requests extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;

    return { address };
  }

  render() {
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
