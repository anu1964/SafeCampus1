import { disasters } from "../data/disasters";

export default function DisasterPanel({ selected, onSelect }) {
  const disaster = disasters[selected];

  return (
    <section className="disaster-panel">
      <h2 className="section-title">Select Disaster Type</h2>

      {/* ✅ DROPDOWN — required by problem statement */}
      <select
        className="disaster-dropdown"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="EARTHQUAKE">🏚️ EARTHQUAKE</option>
        <option value="FIRE">🔥 FIRE</option>
        <option value="FLOOD">🌊 FLOOD</option>
        <option value="CYCLONE">🌀 CYCLONE</option>
      </select>

      {/* ✅ Response steps shown immediately on selection */}
      <div className="response-card" style={{ borderTopColor: disaster.color }}>
        <div className="response-header" style={{ background: disaster.color }}>
          <span className="response-icon">{disaster.icon}</span>
          <h3>{selected} — Immediate Response Steps</h3>
        </div>
        <ol className="steps-list">
          {disaster.safety_actions.map((action, i) => (
            <li key={i} className="step-item">
              <span className="step-number" style={{ background: disaster.color }}>{i + 1}</span>
              <span>{action}</span>
            </li>
          ))}
        </ol>
        <div className="evacuation-note">
          <span>🗺️</span>
          <p><strong>Evacuation:</strong> {disaster.evacuation}</p>
        </div>
      </div>
    </section>
  );
}