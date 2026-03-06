import { useState } from "react";

const ITEMS = [
  { id: 1, text: "I know the nearest emergency exit from my classroom" },
  { id: 2, text: "I have emergency contacts saved on my phone" },
  { id: 3, text: "I know the campus assembly point location" },
  { id: 4, text: "I have a basic first aid kit accessible" },
  { id: 5, text: "I have participated in at least one emergency drill" },
  { id: 6, text: "I know how to use a fire extinguisher" },
  { id: 7, text: "I have a 3-day emergency supply kit ready" },
  { id: 8, text: "I know who the campus emergency warden is" },
];

export default function Checklist({ checked, onToggle }) {
  // If used standalone for testing, manage own state
  const [localChecked, setLocalChecked] = useState([]);
  const activeChecked = checked ?? localChecked;
  const handleToggle = onToggle ?? ((id) =>
    setLocalChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  );

  const score = Math.round((activeChecked.length / ITEMS.length) * 100);
  const isPrepared = activeChecked.length >= 6;

  return (
    <section className="checklist-panel">
      <h2 className="section-title">Preparedness Checklist</h2>

      {/* Score Bar */}
      <div className="score-bar-wrapper">
        <div className="score-info">
          <span>Your Score: <strong>{score}%</strong></span>
          <span className={`status-badge ${isPrepared ? "prepared" : "needs-work"}`}>
            {isPrepared ? "✅ Prepared" : "⚠️ Needs Improvement"}
          </span>
        </div>
        <div className="score-bar-track">
          <div
            className="score-bar-fill"
            style={{
              width: `${score}%`,
              background: isPrepared ? "#27ae60" : "#e67e22",
            }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <ul className="checklist">
        {ITEMS.map((item) => {
          const isChecked = activeChecked.includes(item.id);
          return (
            <li
              key={item.id}
              className={`checklist-item ${isChecked ? "checked" : ""}`}
              onClick={() => handleToggle(item.id)}
            >
              <div className={`checkbox ${isChecked ? "checked" : ""}`}>
                {isChecked && "✓"}
              </div>
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>

      {/* Reset Button */}
      <button
        className="reset-btn"
        onClick={() => activeChecked.forEach((id) => handleToggle(id))}
      >
        Reset Checklist
      </button>
    </section>
  );
}


// ════════════════════════════════════════════════════════════
// FILE 2 → src/components/SchemaViewer.jsx
// ════════════════════════════════════════════════════════════

// import { useState } from "react";   ← uncomment this line in the actual file

export default function SchemaViewer({ schema }) {
  const [open, setOpen] = useState(false);

  // Fallback demo schema if used standalone
  const displaySchema = schema ?? {
    disaster_type: "EARTHQUAKE",
    preparedness_score: 0,
    safety_actions: ["Step 1", "Step 2", "Step 3"],
    emergency_contacts: ["Police", "Fire Department", "Ambulance"],
    status: "Needs Improvement",
  };

  return (
    <section className="schema-panel">
      <button className="schema-toggle" onClick={() => setOpen(!open)}>
        <span>{"{ }"} JSON Schema Output</span>
        <span>{open ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {open && (
        <pre className="schema-block">
          {JSON.stringify(displaySchema, null, 2)}
        </pre>
      )}
    </section>
  );
}
