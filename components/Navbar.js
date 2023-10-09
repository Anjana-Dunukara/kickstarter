import { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class menu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu style={{ marginTop: "10px" }}>
        <Menu.Item
          name="kickstart"
          active={activeItem === "kickstart"}
          onClick={this.handleItemClick}
        >
          Kickstart
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="Campaigns"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
          >
            Campaigns
          </Menu.Item>

          <Menu.Item
            icon="add"
            active={activeItem === "add"}
            onClick={this.handleItemClick}
          ></Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default menu;
