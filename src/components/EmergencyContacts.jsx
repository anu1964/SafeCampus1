import { emergencyContacts } from "../data/contacts";
import { disasters } from "../data/disasters";

export default function EmergencyContacts({ selected }) {
  const relevantContacts = disasters[selected]?.contacts ?? [];

  return (
    <section className="contacts-panel">
      <h2 className="section-title">Emergency Contacts</h2>
      <p className="contacts-hint">
        ⚡ Highlighted contacts are critical for <strong>{selected}</strong>
      </p>
      <div className="contacts-grid">
        {emergencyContacts.map((contact, i) => {
          const isRelevant = relevantContacts.includes(contact.name);
          return (
            <a key={i} href={`tel:${contact.number}`} className={`contact-card ${isRelevant ? "relevant" : ""}`}>
              <span className="contact-icon">{contact.icon}</span>
              <span className="contact-name">{contact.name}</span>
              <span className="contact-number">{contact.number}</span>
              {isRelevant && <span className="contact-badge">CALL NOW</span>}
            </a>
          );
        })}
      </div>
    </section>
  );
}