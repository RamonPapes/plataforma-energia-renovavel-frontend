import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { corCi, fmtCi } from "../utils/formatadores";

export default function MapaVulnerabilidade({ ranking }) {
  return (
    <MapContainer center={[-13, -52]} zoom={4} className="mapa" scrollWheelZoom={false}>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ranking.filter((r) => r.lat != null).map((r) => (
        <CircleMarker key={r.municipio_id} center={[r.lat, r.lng]} radius={7 + (1 - r.ci) * 14} pathOptions={{ color: corCi(r.ci), fillOpacity: 0.65 }}>
          <Tooltip>{r.posicao}º {r.nome}/{r.uf} — Ci {fmtCi(r.ci)}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
