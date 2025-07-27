import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
};

const center = {
  lat: -1.2921,
  lng: 36.8219,
};

const IncidentMap = () => {
  const [mapType, setMapType] = useState("roadmap");
  const [zoom, setZoom] = useState(12);
  const [mapRef, setMapRef] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/incidents")
      .then((res) => {
        setIncidents(res.data.incidents);
      })
      .catch((err) => {
        console.error("Failed to load incidents:", err);
      });
  }, []);

  const onLoad = useCallback((map) => {
    setMapRef(map);
  }, []);

  const changeMapType = (type) => {
    setMapType(type);
    if (mapRef) {
      mapRef.setMapTypeId(type);
    }
  };

  const handleZoom = (direction) => {
    if (!mapRef) return;
    const newZoom = direction === "in" ? zoom + 1 : zoom - 1;
    setZoom(newZoom);
    mapRef.setZoom(newZoom);
  };

  return (
    <div className="relative">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          mapTypeId={mapType}
          onLoad={onLoad}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            styles: [],
          }}
        >
          {incidents.map((incident, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(incident.latitude),
                lng: parseFloat(incident.longitude),
              }}
              title={incident.title}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded shadow-md space-y-2">
        <div className="font-bold text-sm mb-1">Map Type</div>
        {["roadmap", "satellite", "hybrid", "terrain"].map((type) => (
          <button
            key={type}
            className={`text-sm px-3 py-1 rounded ${
              mapType === type ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => changeMapType(type)}
          >
            {type}
          </button>
        ))}

        <div className="mt-3 font-bold text-sm">Zoom</div>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleZoom("in")}
          >
            +
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleZoom("out")}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentMap;