import React from "react";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import AddForm from "../components/AddForm";
import { configure } from "enzyme";
import { shallow, mount, render } from "enzyme";

configure({ adapter: new Adapter() });

let wrapper;
const mockData1 = {
  formatted_address: "Kleiner Wesenberg, 15377 Oberbarnim, Germany",
  id: "ChIJc_wstnnTqUcRdrzMMduxO9Y",
  latLng: {
    lat: 52.593046747923765,
    lng: 14.04444390429694
  }
};

const mockData2 = {
  formatted_address: "Kleiner Wesenberg, 15377 Oberbarnim, Germany",
  place_id: "ChIJc_wstnnTqUcRdrzMMduxO9Y",
  geometry: {
    location: {
      lat: 52.593046747923765,
      lng: 14.04444390429694
    }
  }
};

let componentProps = {
  addMark: jest.fn(),
  getMarkFromString: jest.fn()
};
let activeMarker = {
  lat: mockData1.latLng.lat,
  lng: mockData1.latLng.lng,
  label: "title"
};
let currentCandidates = [mockData1];
const dummyName = "someName";

it("renders input field only after clicking add button", done => {
  wrapper = mount(<AddForm {...componentProps} />);
  expect(wrapper.find("input").length).toBeFalsy();
  const addButton = wrapper.find("button").first();
  addButton.simulate("click");
  expect(wrapper.find("input").length).toBeTruthy();

  done();
});

it("calls method to fetch location suggestions", done => {
  wrapper = mount(<AddForm {...componentProps} />);
  wrapper
    .find("button")
    .first()
    .simulate("click");
  const input = wrapper.find("input").first();
  input.simulate("change", { target: { value: dummyName } });
  expect(componentProps.getMarkFromString).toHaveBeenCalled();
  done();
});

it("calls method to create new marker", done => {
  wrapper = mount(<AddForm {...componentProps} />);
  wrapper
    .find("button")
    .first()
    .simulate("click");
  const input = wrapper.find("input").first();
  input.simulate("change", { target: { value: dummyName } });
  const newProps = {
    ...componentProps,
    currentMark: activeMarker,
    currentMarkCandidates: [mockData2]
  };
  wrapper.setProps(newProps);
  const listItem = wrapper.find(".list-group-item").first();
  expect(listItem).toBeTruthy();
  listItem.simulate("click");
  expect(newProps.addMark).toHaveBeenCalledWith(mockData1);
  done();
});
