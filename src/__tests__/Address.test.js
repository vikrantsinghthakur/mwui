import React from "react";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import Address from "../components/Address.jsx";
import { configure } from "enzyme";
import { shallow, mount, render } from "enzyme";

configure({ adapter: new Adapter() });

let wrapper;
const mockData = {
  formatted_address: "Kleiner Wesenberg, 15377 Oberbarnim, Germany",
  id: "ChIJc_wstnnTqUcRdrzMMduxO9Y",
  latLng: {
    lat: 52.593046747923765,
    lng: 14.04444390429694
  }
};

let componentProps = {
  address: mockData,
  id: mockData.id,
  remove: jest.fn(),
  modify: jest.fn()
};

it("renders given address", done => {
  wrapper = mount(<Address {...componentProps} />);
  expect(wrapper.find(new String(mockData.formatted_address))).toBeTruthy();
  expect(wrapper.find(new String(mockData.latLng.lat))).toBeTruthy();
  expect(wrapper.find(new String(mockData.latLng.lng))).toBeTruthy();
  done();
});

it("invokes modify method on clicking edit button", done => {
  const dummyName = "someName";
  wrapper = mount(<Address {...componentProps} />);
  const editButton = wrapper.find("button").first();

  expect(wrapper.find("form").length).toBeFalsy();
  editButton.simulate("click");

  const form = wrapper.find("form").first();
  const input = wrapper.find("input").first();

  expect(wrapper.find("form").length).toBeTruthy();

  input.simulate("change", { target: { value: dummyName } });
  form.simulate("submit", {
    preventDefault: () => {},
    target: [{ value: "" }]
  });

  expect(componentProps.modify).toHaveBeenCalledWith(mockData.id, {
    ...mockData,
    formatted_address: dummyName
  });

  done();
});

it("invokes remove method on clicking delete button", done => {
  wrapper = mount(<Address {...componentProps} />);
  const deleteButton = wrapper.find("button").last();
  deleteButton.simulate("click");

  expect(componentProps.remove).toHaveBeenCalled();
  done();
});
