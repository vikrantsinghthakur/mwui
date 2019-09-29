import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      address: props.formatted_address
    };
    this.startEdit = this.startEdit.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  startEdit() {
    this.setState({ editing: true });
  }
  updateAddress() {
    if (!this.state.address) return;
    const currentAddress = this.props.address;
    const payload = {
      formatted_address: this.state.address,
      id: currentAddress.id,
      latLng: {
        lat: currentAddress.latLng.lat,
        lng: currentAddress.latLng.lng
      }
    };
    this.props.modify(currentAddress.id, payload);
    this.setState({ editing: false });
  }

  handleAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  render() {
    return (
      // eslint-disable-next-line
      <Card style={{ minWidth: "18rem", margin: "10px" }} border="light">
        {this.state.editing ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              this.updateAddress();
            }}
          >
            <input
              className="form-control col-md-12"
              onChange={e => this.handleAddressChange(e)}
            />
            <br />
          </form>
        ) : (
          <span>
            <Card.Title style={{ color: "blue" }}>
              {this.props.address.formatted_address}
            </Card.Title>
          </span>
        )}
        <br />
        <span>
          {`Latitude: ${this.props.address.latLng.lat}`}
          <br />
          {`Longitude: ${this.props.address.latLng.lng}`}
        </span>
        <ButtonToolbar>
          <Button size="sm" variant="primary" onClick={() => this.startEdit()}>
            Edit
          </Button>
          <span className="buttonSpace">or</span>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              this.props.remove(this.props.address.id);
            }}
          >
            Delete
          </Button>
        </ButtonToolbar>
      </Card>
    );
  }
}

export default Address;
