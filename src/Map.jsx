import { GoogleMap, Marker, Circle, useLoadScript } from "@react-google-maps/api";

export default function Gmap({ center }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: null,
  });

  if (!isLoaded) return ;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={center}
      zoom={15}
    >
      <Marker position={center} />
      <Circle
        center={center}
        radius={500}
        options={{ fillColor: "blue", fillOpacity: 0.2, strokeColor: "blue" }}
      />
    </GoogleMap>
  );
}