import React from "react";
// import { render } from "react-dom";
import AddressList from "./AddressList";
import AddForm from "./AddForm";

const Title = ({ markerCount }) => {
  return (
    <div>
      <div>
        <h1>Markers: {markerCount}</h1>
      </div>
    </div>
  );
};

window.id = 0;
class ListWrapper extends React.Component {
  render() {
    const {
      crudCbs,
      data,
      currentMark,
      selectMark,
      currentMarkCandidates,
      getMarkFromString
    } = this.props;
    return (
      <div className="listWrapper">
        <Title markerCount={data.length} />
        <AddForm
          addMark={crudCbs.handleAdd}
          currentMark={currentMark}
          currentMarkCandidates={currentMarkCandidates}
          selectMark={selectMark}
          getMarkFromString={getMarkFromString}
        />
        <AddressList
          addresses={data}
          remove={crudCbs.handleRemove}
          modify={crudCbs.handleModify}
          currentMark={currentMark}
        />
      </div>
    );
  }
}
export default ListWrapper;
