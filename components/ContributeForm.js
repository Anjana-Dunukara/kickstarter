import React, { Component } from "react";
import { Button, Message, Form, Input } from "semantic-ui-react";

class CampaignForm extends Component {
  state = {
    contribution: "",
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
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
