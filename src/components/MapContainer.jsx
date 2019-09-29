import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { MAP_API_KEY } from "../config";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapClicked = this.mapClicked.bind(this);
  }

  mapClicked(t, map, coordinate) {
    const { latLng } = coordinate;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.props.selectMark({ lat, lng });
  }

  render() {
    const { data, currentMark } = this.props;
    return (
      <div className="mapContainer">
        <Map
          google={this.props.google}
          zoom={8}
          onClick={this.mapClicked}
          initialCenter={{ lat: 52.527928, lng: 13.403117 }}
        >
          {data && data.length > 0
            ? data.map((mark, index) => (
                <Marker
                  key={index}
                  position={{ lat: mark.latLng.lat, lng: mark.latLng.lng }}
                />
              ))
            : null}
          {currentMark && currentMark.lat && currentMark.lng ? (
            <Marker position={{ lat: currentMark.lat, lng: currentMark.lng }} />
          ) : null}
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(MapContainer);
