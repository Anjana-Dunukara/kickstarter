import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../../etherum/factory";
import web3 from "../../../etherum/web3";
import { useRouter } from "next/router";

class NewCampaign extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const Router = useRouter();
    this.setState({ loading: true, errorMessage: "" });

    try {
      window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      Router.push("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a new Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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
          <Message error header="Oops!!" content={this.state.errorMessage} />
          <Button type="submit" primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
