import { useState } from "react";
import DisasterPanel from "./components/DisasterPanel";
import Checklist from "./components/Checklist";
import EmergencyContacts from "./components/EmergencyContacts";
import SchemaViewer from "./components/SchemaViewer";
import { disasters } from "./data/disasters";
import { checklistItems } from "./data/checklist";
import { emergencyContacts } from "./data/contacts";
import "./App.css";

export default function App() {
  const [selectedDisaster, setSelectedDisaster] = useState("EARTHQUAKE");
  const [checked, setChecked] = useState([]);

  const toggleCheck = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const schema = {
    disaster_type: selectedDisaster,
    preparedness_score: Math.round((checked.length / checklistItems.length) * 100),
    safety_actions: disasters[selectedDisaster].safety_actions,
    emergency_contacts: emergencyContacts.map((c) => c.name),
    status: checked.length >= 6 ? "Prepared" : "Needs Improvement",
  };
  <EmergencyContacts selected={selectedDisaster} />

  console.log("SafeCampus Schema:", schema);

  return (
    <div className="app">
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
      </div>

      <main className="container">
        <DisasterPanel selected={selectedDisaster} onSelect={setSelectedDisaster} />
        <div className="two-col">
          <Checklist checked={checked} onToggle={toggleCheck} />
          <EmergencyContacts />
        </div>
        <SchemaViewer schema={schema} />
      </main>

      <footer className="footer">
        <p>SafeCampus © 2026 — Built for HACKARENA</p>
      </footer>
    </div>
  );
}