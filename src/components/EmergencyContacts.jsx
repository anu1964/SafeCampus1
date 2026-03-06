export default function EmergencyContacts() {
  const contacts = [
    { name: "Police",            number: "100",          icon: "🚔" },
    { name: "Fire Department",   number: "101",          icon: "🚒" },
    { name: "Ambulance",         number: "102",          icon: "🚑" },
    { name: "Disaster Helpline", number: "108",          icon: "🆘" },
    { name: "Campus Security",   number: "1800-000-0000",icon: "🏫" },
  ];

  return (
    <section className="contacts-panel">
      <h2 className="section-title">Emergency Contacts</h2>
      <div className="contacts-grid">
        {contacts.map((contact, i) => (
          <a key={i} href={`tel:${contact.number}`} className="contact-card">
            <span className="contact-icon">{contact.icon}</span>
            <span className="contact-name">{contact.name}</span>
            <span className="contact-number">{contact.number}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
