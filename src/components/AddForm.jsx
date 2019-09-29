import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.createMark = this.createMark.bind(this);
  }

  setAdding() {
    this.setState({ adding: true });
  }

  handleChange(e) {
    this.props.getMarkFromString(e.target.value, e.timeStamp);
  }

  createMark(mark) {
    this.setState({ adding: false });
    const payLoad = {};
    payLoad.formatted_address = mark.formatted_address;
    const latLng = mark.geometry.location;
    payLoad.latLng = { lat: latLng.lat, lng: latLng.lng };
    payLoad.id = mark.place_id;
    this.props.addMark(payLoad);
  }

  render() {
    let input;
    const { currentMark, currentMarkCandidates } = this.props;
    if (!this.state.adding) {
      return (
        <Button size="sm" variant="primary" onClick={this.setAdding.bind(this)}>
          Add
        </Button>
      );
    }
    return (
      <>
        {this.state.adding && !currentMark ? (
          <>
            <div>Click on map to add marker or type address below</div>
            <input
              className="form-control col-md-12"
              onChange={e => this.handleChange(e)}
            />
          </>
        ) : null}
        {currentMarkCandidates && currentMarkCandidates.length > 0 ? (
          <div>
            Please pick an address for your current marker:
            <ListGroup>
              {currentMarkCandidates.map((mark, index) => (
                <ListGroup.Item
                  onClick={() => {
                    this.createMark(mark);
                  }}
                  key={index}
                >
                  {mark.formatted_address}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ) : (
          <div />
        )}
        {currentMark ? (
          <>
            Current latitude: {currentMark.lat}
            <br />
            Current longitude: {currentMark.lng}
            <br />
          </>
        ) : null}
        {
          // <Button size="sm" disabled={!currentMark || !currentMark.label}>
          //   Add
          // </Button>
        }
      </>
    );
  }
}

export default AddForm;
