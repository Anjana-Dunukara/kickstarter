import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input } from "semantic-ui-react";
import factory from "../../etherum/factory";
import web3 from "../../etherum/web3";

class NewCampaign extends Component {
  state = {
    minimumContribution: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();

    await factory.methods.createCampaign(this.state.minimumContribution).send({
      from: accounts[0],
    });
  };

  render() {
    return (
      <Layout>
        <h3>Create a new Campaign</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Button type="submit" primary>
            Submit
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
