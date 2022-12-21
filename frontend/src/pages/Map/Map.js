import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "../../features/collection/collectionSlice";
// import { useNavigate } from 'react-router-dom'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { TextField } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "./Map.css";

const Map = () => {
  const collections = useSelector((state) => state.collections.collections);
  const [selectionDate, setSelectionDate] = useState(new Date());
  console.log(collections);

  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const initFetch = useCallback(() => {
    dispatch(getAllCollections({'date': selectionDate}));
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
            dispatch(getAllCollections({'date': new Date(newValue)}));
          }}
          inputFormat="DD/MM/YYYY"
          value={selectionDate}
          label="Collection Date"
          views={["year", "month", "day"]}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <br />
      <GMap collections={collections} />
    </div>
  );
};

const renderMarkers = (collections) => {
  const iconMarker = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Location_dot_red.svg/96px-Location_dot_red.svg.png",
    scaledSize: new window.google.maps.Size(10, 10),
  };

  return collections.map((data) => {
    return (
      <MarkerF
        key={data.id}
        // onClick = { this.onMarkerClick }
        // title = { location.locName }
        position={{ lat: parseFloat(data.lat), lng: parseFloat(data.lng) }}
        icon={iconMarker}
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

export default Map;
