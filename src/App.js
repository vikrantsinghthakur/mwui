import React, { Component } from "react";
import ListWrapper from "./components/ListWrapper";
import MapContainer from "./components/MapContainer";
import * as api from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentMark: null,
      currentCandidates: null
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.selectMark = this.selectMark.bind(this);
    this.getMarkFromString = this.getMarkFromString.bind(this);
    this.searchVal = "";
    this.lastTimeStamp = 0;
  }

  componentDidMount() {
    api.getAddresses().then(res => {
      this.setState({ data: res.data });
    });
  }

  handleAdd(params) {
    this.setState({ currentMark: null, currentCandidates: null });
    api.addNewAddress(params).then(res => {
      this.state.data.push(res.data);
      this.setState({ data: this.state.data });
    });
  }

  handleRemove(id) {
    const remainder = this.state.data.filter(obj => {
      if (obj.id !== id) return obj;
      return null;
    });
    api.removeAddress(id).then(res => {
      this.setState({ data: remainder });
    });
  }

  handleModify(id, newObj) {
    const modified = this.state.data.map(obj => {
      if (id === obj.id) {
        return newObj;
      }
      return obj;
    });
    api.modifyAddress(id, newObj).then(res => {
      this.setState({ data: modified });
    });
  }

  selectMark(mark) {
    this.setState({ currentMark: mark });
    api.selectMark(mark).then(res => {
      this.setState({ currentCandidates: res.data });
    });
  }

  getMarkFromString(string, timeStamp) {
    if (timeStamp > this.lastTimeStamp) {
      this.lastTimeStamp = timeStamp;
      this.searchVal = string;
    }
    api.stringSearchMark(string).then(res => {
      if (res.config.url.split("/").pop() === this.searchVal) {
        this.setState({
          currentCandidates: res.data.results
        });
      }
    });
  }

  render() {
    const { handleRemove, handleModify, handleAdd, state } = this;
    const crudCbs = { handleRemove, handleModify, handleAdd };
    return (
      <div className="appContainer">
        <MapContainer
          crudCbs={crudCbs}
          currentMark={state.currentMark}
          selectMark={this.selectMark}
          data={state.data}
        />
        <ListWrapper
          crudCbs={crudCbs}
          currentMark={state.currentMark}
          currentMarkCandidates={state.currentCandidates}
          selectMark={this.selectMark}
          getMarkFromString={this.getMarkFromString}
          data={state.data}
        />
      </div>
    );
  }
}

export default App;
