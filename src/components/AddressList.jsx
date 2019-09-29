import React from "react";
import Address from "./Address";
import CardGroup from "react-bootstrap/CardGroup";

const AddressList = ({ addresses, remove, modify }) => {
  // Map through the todos
  const addressNode = addresses.map((address, index) => {
    return (
      <Address
        address={address}
        key={index}
        id={index}
        remove={remove}
        modify={modify}
      />
    );
  });
  return <CardGroup style={{ marginTop: "30px" }}>{addressNode}</CardGroup>;
};

export default AddressList;
