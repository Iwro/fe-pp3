"use client";

import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  latitudInicial: number;
  longitudInicial: number;
  onChangeUbicacion: (lat: number, lng: number) => void;
}

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({
  latitudInicial,
  longitudInicial,
  onChangeUbicacion,
}: Props) {
  const [position, setPosition] = useState<[number, number]>([
    latitudInicial,
    longitudInicial,
  ]);
  const markerRef = useRef<L.Marker>(null);

  // Permite al usuario mover el marker o hacer click en el mapa para cambiarlo
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onChangeUbicacion(lat, lng);
    },
  });

  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const { lat, lng } = marker.getLatLng();
      setPosition([lat, lng]);
      onChangeUbicacion(lat, lng);
    }
  };

  return (
    <Marker
      draggable
      eventHandlers={{ dragend: handleDragEnd }}
      position={position}
      icon={icon}
      ref={markerRef}
    />
  );
}

export default function MapTallerEditable({
  latitudInicial,
  longitudInicial,
  onChangeUbicacion,
}: Props) {
  return (
    <MapContainer
      center={[latitudInicial, longitudInicial]}
      zoom={15}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        latitudInicial={latitudInicial}
        longitudInicial={longitudInicial}
        onChangeUbicacion={onChangeUbicacion}
      />
    </MapContainer>
  );
}