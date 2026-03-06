import { useState } from "react";
import DisasterPanel from "./components/DisasterPanel";
import Checklist from "./components/Checklist";
import EmergencyContacts from "./components/EmergencyContacts";
import { disasters } from "./data/disasters";
import { checklistItems } from "./data/checklist";
import { emergencyContacts } from "./data/contacts";
import "./App.css";

const DISASTER_OPTIONS = [
  { value: "EARTHQUAKE", label: "🌍 Earthquake" },
  { value: "FIRE",       label: "🔥 Fire"       },
  { value: "FLOOD",      label: "🌊 Flood"       },
  { value: "CYCLONE",    label: "🌀 Cyclone"     },
];

export default function App() {
  const [selectedDisaster, setSelectedDisaster] = useState("EARTHQUAKE");
  const [checked, setChecked] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleCheck = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelect = (value) => {
    setSelectedDisaster(value);
    setDropdownOpen(false);
  };

  const currentOption = DISASTER_OPTIONS.find((o) => o.value === selectedDisaster);

  console.log("SafeCampus Schema:", {
    disaster_type: selectedDisaster,
    preparedness_score: Math.round((checked.length / checklistItems.length) * 100),
    safety_actions: disasters[selectedDisaster].safety_actions,
    emergency_contacts: emergencyContacts.map((c) => c.name),
    status: checked.length >= 6 ? "Prepared" : "Needs Improvement",
  });

  return (
    <div className="app" style={{ fontFamily: "'Bookman Old Style', 'Bookman', 'URW Bookman L', Georgia, serif" }}>
      <header className="navbar">
        <div className="navbar-brand">
          <span className="brand-icon">🛡️</span>
          <span className="brand-name">SafeCampus</span>
        </div>
        <span className="navbar-tagline">Emergency Preparedness System</span>
      </header>

      <div className="hero">
        <h1>Know What To Do <span className="hero-accent">When It Matters Most</span></h1>
        <p>Interactive disaster response guidance for students and campus staff</p>

        {/* ── Dropdown ── */}
        <div className="hero-dropdown-wrap">
          <button
            className="hero-dropdown-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span>{currentOption ? currentOption.label : "🚨 Select Disaster Type"}</span>
            <span className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}>▾</span>
          </button>

          {dropdownOpen && (
            <div className="hero-dropdown-menu">
              {DISASTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`hero-dropdown-item ${opt.value === selectedDisaster ? "active" : ""}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="ddi-label">{opt.label}</span>
                  <span className="ddi-arrow">{opt.value === selectedDisaster ? "✓" : "→"}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="container">
        <DisasterPanel selected={selectedDisaster} onSelect={setSelectedDisaster} />
        <div className="two-col">
          <Checklist checked={checked} onToggle={toggleCheck} />
          <EmergencyContacts selected={selectedDisaster} />
        </div>
      </main>

      <footer className="footer">
        <p>SafeCampus © 2026 — Built for HACKARENA</p>
      </footer>
    </div>
  );
}