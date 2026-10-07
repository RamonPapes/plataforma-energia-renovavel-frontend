export default function StatCard({ valor, rotulo }) {
  return (
    <div className="stat">
      <b>{valor}</b>
      <span>{rotulo}</span>
    </div>
  );
}
