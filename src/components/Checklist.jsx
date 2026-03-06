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
      <div className="score-bar-wrapper">
        <div className="score-info">
          <span>Your Score: <strong>{score}%</strong></span>
          <span className={`status-badge ${isPrepared ? "prepared" : "needs-work"}`}>
            {isPrepared ? "✅ Prepared" : "⚠️ Needs Improvement"}
          </span>
        </div>
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: `${score}%`, background: isPrepared ? "#27ae60" : "#e67e22" }} />
        </div>
      </div>
      <ul className="checklist">
        {ITEMS.map((item) => {
          const isChecked = activeChecked.includes(item.id);
          return (
            <li key={item.id} className={`checklist-item ${isChecked ? "checked" : ""}`} onClick={() => handleToggle(item.id)}>
              <div className={`checkbox ${isChecked ? "checked" : ""}`}>{isChecked && "✓"}</div>
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
      <button className="reset-btn" onClick={() => activeChecked.forEach((id) => handleToggle(id))}>
        Reset Checklist
      </button>
    </section>
  );
}