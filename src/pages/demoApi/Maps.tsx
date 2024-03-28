import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
interface MapsProps {
  selectPosition?: LatLngExpression;
}

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const position: LatLngExpression = [51.505, -0.09];

function ResetCenterView({
  selectPosition,
}: {
  selectPosition: LatLngExpression;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(selectPosition, map.getZoom(), {
        animate: true,
      });
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps({ selectPosition }: MapsProps) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectPosition && (
        <Marker position={selectPosition} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      {selectPosition && <ResetCenterView selectPosition={selectPosition} />}
    </MapContainer>
  );
}
