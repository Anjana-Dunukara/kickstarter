import React, { Component } from "react";
import Layout from "../../../../../components/Layout";
import { Button, Message, Form, Input } from "semantic-ui-react";
import web3 from "../../../../../etherum/web3";
import Campaign from "../../../../../etherum/campaign";
import { useRouter } from "next/router";

class newRequest extends Component {
  static async getInitialProps(props) {
    const address = props.params.address;

    const campaign = Campaign(props.query.address);

    return { address, campaign };
  }

  state = {
    description: "",
    amount: "",
    recipient: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const Router = useRouter();
    const { campaign, address } = this.props;

    this.setState({ loading: true, errorMessage: "" });

    try {
      window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(
          this.state.description,
          web3.utils.toWei(this.state.amount, "ether"),
          this.state.recipient
        )
        .send({
          from: accounts[0],
        });

      Router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
            ></Input>
          </Form.Field>
          <Form.Field>
            <label>Amount of ether</label>
            <Input
              value={this.state.amount}
              onChange={(event) => {
                this.setState({ amount: event.target.value });
              }}
            ></Input>
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) => {
                this.setState({ recipient: event.target.value });
              }}
            ></Input>
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

export default newRequest;
