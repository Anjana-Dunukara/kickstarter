import { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "../routes";

class menu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link className="item" href="/">
          Kickstart
        </Link>

        <Menu.Menu position="right">
          <Link className="item" href="/">
            Campaigns
          </Link>

          <Link className="item" href="/campaigns/new">
            +
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default menu;
