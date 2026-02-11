import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function UberMap() {

  const [pickup, setPickup] = useState({ lat: 30.2672, lng: -97.7431 });
  const [drop, setDrop] = useState({ lat: 30.2800, lng: -97.7600 });

  const [drivers, setDrivers] = useState([]);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [eta, setEta] = useState(null);

  // Load route & drivers
  const loadRoute = async () => {
    try {

      // Drivers
      const driversRes = await axios.get(
        "https://localhost:7048/api/uber/drivers"
      );

      setDrivers(driversRes.data);

      // Route
      const routeRes = await axios.post(
        "https://localhost:7048/api/uber/route",
        {
          pickupLat: parseFloat(pickup.lat),
          pickupLng: parseFloat(pickup.lng),
          dropLat: parseFloat(drop.lat),
          dropLng: parseFloat(drop.lng)
        }
      );

      setRoute(routeRes.data.polyline);
      setDistance(routeRes.data.distance);
      setEta(routeRes.data.eta);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <h2>🚖 Mini Uber Demo</h2>

      {/* Pickup Input */}
      <div>
        <h4>Pickup Location</h4>
        <input
          type="number"
          placeholder="Latitude"
          value={pickup.lat}
          onChange={(e) =>
            setPickup({ ...pickup, lat: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Longitude"
          value={pickup.lng}
          onChange={(e) =>
            setPickup({ ...pickup, lng: e.target.value })
          }
        />
      </div>

      {/* Drop Input */}
      <div>
        <h4>Drop Location</h4>
        <input
          type="number"
          placeholder="Latitude"
          value={drop.lat}
          onChange={(e) =>
            setDrop({ ...drop, lat: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Longitude"
          value={drop.lng}
          onChange={(e) =>
            setDrop({ ...drop, lng: e.target.value })
          }
        />
      </div>

      {/* Button */}
      <button onClick={loadRoute}>
        Show Route
      </button>

      {distance && (
        <>
          <p><b>Distance:</b> {distance} km</p>
          <p><b>ETA:</b> {eta} mins</p>
        </>
      )}

      {/* Map */}
      <MapContainer
        center={[pickup.lat, pickup.lng]}
        zoom={13}
        style={{ height: "500px", marginTop: "20px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pickup */}
        <Marker position={[pickup.lat, pickup.lng]}>
          <Popup>Pickup</Popup>
        </Marker>

        {/* Drop */}
        <Marker position={[drop.lat, drop.lng]}>
          <Popup>Drop</Popup>
        </Marker>

        {/* Drivers */}
        {drivers.map(d => (
          <Marker key={d.id} position={[d.lat, d.lng]}>
            <Popup>Driver: {d.name}</Popup>
          </Marker>
        ))}

        {/* Route */}
        {route.length > 0 && (
          <Polyline
            positions={route.map(p => [p.lat, p.lng])}
          />
        )}

      </MapContainer>

    </div>
  );
}

export default UberMap;
