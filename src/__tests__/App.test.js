import { shallow, mount, render } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import App from "../App.js";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as api from "../api";

configure({ adapter: new Adapter() });

beforeAll(() => {
  //window.fetch = jest.fn(); if running browser environment
});

let wrapper;

beforeEach(() => {
  //wrapper = shallow(<App />);
  // jest.mock(api);
});

afterEach(() => {
  // wrapper.unmount();
});

it("must show the title text", done => {
  api.getAddresses = jest.fn();
  api.getAddresses.mockReturnValue(Promise.resolve({ status: 200, data: [] }));
  wrapper = mount(<App />);
  expect(wrapper.find(".appContainer")).toBeTruthy();
  expect(wrapper.find("Markers")).toBeTruthy();
  done();
});

it("renders leaf node of DOM tree", done => {
  const mockData = {
    formatted_address: "Kleiner Wesenberg, 15377 Oberbarnim, Germany",
    id: "ChIJc_wstnnTqUcRdrzMMduxO9Y",
    latLng: {
      lat: 52.593046747923765,
      lng: 14.04444390429694
    }
  };
  api.getAddresses = jest.fn();
  api.getAddresses.mockReturnValue(
    Promise.resolve({ status: 200, data: [mockData] })
  );
  wrapper = mount(<App />);
  expect(wrapper.find(new String(mockData.formatted_address))).toBeTruthy();
  expect(wrapper.find(new String(mockData.latLng.lat))).toBeTruthy();
  expect(wrapper.find(new String(mockData.latLng.lng))).toBeTruthy();
  done();
});
