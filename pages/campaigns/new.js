import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form } from "semantic-ui-react";

class NewCampaign extends Component {
  render() {
    return (
      <Layout>
        <h3>Create a new Campaign</h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <input />
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
