import React, { Component } from "react";
import { Button, Message, Form, Input } from "semantic-ui-react";
import Campaign from "../etherum/campaign";
import web3 from "../etherum/web3";
import { useRouter } from "../routes";

class CampaignForm extends Component {
  state = {
    contribution: "",
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

      const campaign = Campaign(this.props.address);

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribution, "ether"),
      });
      this.state.contribution = "";
      Router.push(`/campaigns/${this.props.params.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Contribute to this Campaign</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.contribution}
            onChange={(event) =>
              this.setState({ contribution: event.target.value })
            }
          />
        </Form.Field>
        <Message error header="Oops!!" content={this.state.errorMessage} />
        <Button type="submit" primary loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default CampaignForm;
