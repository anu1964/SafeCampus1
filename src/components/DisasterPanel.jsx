import { disasters } from "../data/disasters";
import { emergencyContacts } from "../data/contacts";

export default function DisasterPanel({ selected, onSelect }) {
  const disaster = disasters[selected];
  const relevantContacts = emergencyContacts.filter(c =>
    disaster.contacts.includes(c.name)
  );

  return (
    <section className="disaster-panel">
      <h2 className="section-title">Description</h2>

      <div className="disaster-tabs">
        {Object.keys(disasters).map((key) => (
          <button
            key={key}
            className={`disaster-tab ${selected === key ? "active" : ""}`}
            style={selected === key ? { borderColor: disasters[key].color, color: disasters[key].color } : {}}
            onClick={() => onSelect(key)}
          >
            <span className="tab-icon">{disasters[key].icon}</span>
            <span className="tab-label">{key}</span>
          </button>
        ))}
      </div>

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

        <div className="inline-contacts">
          <p className="inline-contacts-title">📞 Emergency Contacts for {selected}</p>
          <div className="inline-contacts-grid">
            {relevantContacts.map((contact, i) => (
              <a key={i} href={`tel:${contact.number}`} className="inline-contact-card">
                <span>{contact.icon}</span>
                <span className="inline-contact-name">{contact.name}</span>
                <span className="inline-contact-number">{contact.number}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}