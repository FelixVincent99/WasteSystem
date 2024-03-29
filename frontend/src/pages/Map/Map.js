import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "../../features/collection/collectionSlice";
// import { useNavigate } from 'react-router-dom'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "./Map.css";

const Map = () => {
  const collections = useSelector((state) => state.collections.collections);
  const [selectionDate, setSelectionDate] = useState(new Date());

  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const initFetch = useCallback(() => {
    dispatch(getAllCollections({ date: selectionDate }));
  }, [dispatch, selectionDate]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          onChange={(newValue) => {
            setSelectionDate(new Date(newValue));
            dispatch(getAllCollections({ date: new Date(newValue) }));
          }}
          inputFormat="DD/MM/YYYY"
          value={selectionDate}
          label="Collection Date"
          views={["year", "month", "day"]}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <br />
      <div>
        <strong>Truck Indicator</strong>
      </div>
      <DotIndicator data={collections} />
      <GMap collections={collections} />
    </div>
  );
};

function getCoordinateDegree(origin_lat, origin_lng, next_lat, next_lng) {
  var dLon = (next_lng - origin_lng);
  var dLat = (next_lat - origin_lat);
  var degree = Math.atan2(dLon, dLat);
  degree *= 180 / Math.PI;
  return degree;
}

const renderMarkers = (collections) => {
  var rotationDegree;
  return collections.map((data, index) => {
    if(collections.length !== (index+1) ){
      rotationDegree = getCoordinateDegree(parseFloat(data.lat), parseFloat(data.lng), parseFloat(collections[index+1].lat), parseFloat(collections[index+1].lng));
    }
    return (
      <MarkerF
        key={data.id}
        // onClick = { this.onMarkerClick }
        // title = { location.locName }
        position={{ lat: parseFloat(data.lat), lng: parseFloat(data.lng) }}
        icon={{
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: data.color,
          fillOpacity: 0.9,
          strokeOpacity: 0,
          scale: 3,
          rotation: rotationDegree,
        }}
        // desc = { location.desc }
        // animation = { this.state.animation[i] }
        // name = { location.locName }
      />
    );
  });
};

const GMap = (props) => {
  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 1.5535, lng: 110.3593 }}
      mapContainerClassName="map-container"
    >
      <div>{renderMarkers(props.collections)}</div>
    </GoogleMap>
  );
};

const DotIndicator = (props) => {
  const sensorDataOnly = [];
  props.data.map((data1) => {
    let exists = false;
    sensorDataOnly.map((data2) => {
      if (data2.sensorId === data1.sensorId) exists = true;
      return ;
    });

    if (!exists) {
      sensorDataOnly.push({
        sensorId: data1.sensorId,
        color: data1.color,
        truckNo: data1.truckNo,
      });
    }

    return ;
  });

  return sensorDataOnly.map((data) => {
    return (
      <div key={data.sensorId}>
        <span className="circle" style={{ backgroundColor: data.color }}></span>
        : <span>{data.truckNo == null ? "Sensor is not assigned." : data.truckNo }</span>
      </div>
    );
  });
};

export default Map;
