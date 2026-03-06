import { emergencyContacts } from "../data/contacts";
import { disasters } from "../data/disasters";

const DISASTER_THEMES = {
  EARTHQUAKE: { color: "#FF4136", bg: "#fff5f5", accent: "#ff6b6b", icon: "🌍", label: "Seismic Event" },
  FIRE:       { color: "#FF851B", bg: "#fff8f0", accent: "#ffaa55", icon: "🔥", label: "Fire Emergency" },
  FLOOD:      { color: "#0074D9", bg: "#f0f7ff", accent: "#4da6ff", icon: "🌊", label: "Flood Alert" },
  TYPHOON:    { color: "#7B2FBE", bg: "#f8f0ff", accent: "#b06bff", icon: "🌀", label: "Typhoon Warning" },
  DEFAULT:    { color: "#2ECC40", bg: "#f0fff4", accent: "#55dd66", icon: "🚨", label: "Emergency" },
};

function getContactEmoji(name = "") {
  const n = name.toLowerCase();
  if (n.includes("fire"))                                                       return "🚒";
  if (n.includes("police") || n.includes("security"))                          return "🚔";
  if (n.includes("medical") || n.includes("hospital") || n.includes("health")) return "🏥";
  if (n.includes("rescue"))                                                     return "⛑️";
  if (n.includes("coast"))                                                      return "🚤";
  if (n.includes("hazmat"))                                                     return "☣️";
  if (n.includes("flood") || n.includes("water"))                              return "🌊";
  if (n.includes("evacuation") || n.includes("evac"))                          return "🏃";
  if (n.includes("ndrrmc") || n.includes("national"))                          return "🏛️";
  if (n.includes("admin") || n.includes("office"))                             return "🏢";
  return "📞";
}

function getBadgeLabel(name = "") {
  const n = name.toLowerCase();
  if (n.includes("fire"))                               return "FIRE";
  if (n.includes("police") || n.includes("security"))  return "SECURE";
  if (n.includes("medical") || n.includes("hospital")) return "MEDICAL";
  if (n.includes("rescue"))                             return "RESCUE";
  if (n.includes("coast"))                              return "COAST GRD";
  if (n.includes("hazmat"))                             return "HAZMAT";
  if (n.includes("flood"))                              return "FLOOD";
  if (n.includes("evac"))                               return "EVAC";
  if (n.includes("ndrrmc"))                             return "NATIONAL";
  return "CONTACT";
}

export default function EmergencyContacts({ selected }) {
  const relevantContacts = disasters[selected]?.contacts ?? [];
  const theme = DISASTER_THEMES[selected] ?? DISASTER_THEMES.DEFAULT;

  const sorted = [...emergencyContacts].sort((a, b) => {
    return (relevantContacts.includes(a.name) ? 0 : 1) -
           (relevantContacts.includes(b.name) ? 0 : 1);
  });

  return (
    <section
      className="contacts-panel"
      style={{
        "--theme-color": theme.color,
        "--theme-bg": theme.bg,
        "--theme-accent": theme.accent,
      }}
    >
      {/* Header */}
      <div className="contacts-header">
        <div className="contacts-header-left">
          <span className="contacts-panel-icon">📡</span>
          <div>
            <h2 className="section-title">Emergency Contacts</h2>
            <span className="contacts-disaster-pill" style={{ background: theme.color }}>
              {theme.icon} {theme.label}
            </span>
          </div>
        </div>
        <div className="contacts-live-dot">
          <span className="live-pulse" style={{ background: theme.color }}></span>
          <span className="live-text" style={{ color: theme.color }}>LIVE</span>
        </div>
      </div>

      {/* Hint bar */}
      <div
        className="contacts-hint-bar"
        style={{ background: theme.bg, borderLeft: `4px solid ${theme.color}` }}
      >
        <span className="contacts-hint-icon">⚡</span>
        <p className="contacts-hint">
          Highlighted contacts are <strong>critical</strong> for{" "}
          <strong style={{ color: theme.color }}>{selected}</strong> situations
        </p>
      </div>

      {/* Contact Cards */}
      <div className="contacts-grid">
        {sorted.map((contact, i) => {
          const isRelevant = relevantContacts.includes(contact.name);
          const emoji = contact.icon || getContactEmoji(contact.name);
          const badge = getBadgeLabel(contact.name);

          return (
            
              <a key={i}
              href={`tel:${contact.number}`}
              className={`contact-card ${isRelevant ? "relevant" : ""}`}
              style={isRelevant ? {
                "--card-color": theme.color,
                "--card-bg": theme.bg,
                "--card-accent": theme.accent,
                borderColor: theme.color,
              } : {}}
            >
              {/* Priority ribbon */}
              {isRelevant && (
                <div className="contact-ribbon" style={{ background: theme.color }}>
                  ★ PRIORITY
                </div>
              )}

              {/* Emoji bubble */}
              <div
                className="contact-emoji-wrap"
                style={isRelevant
                  ? { background: theme.color + "22", border: `2.5px solid ${theme.color}` }
                  : { background: "#f0f0f0", border: "2.5px solid #ddd" }
                }
              >
                <span className="contact-emoji">{emoji}</span>
              </div>

              {/* Info */}
              <div className="contact-info">
                {isRelevant && (
                  <span className="contact-badge" style={{ background: theme.color }}>
                    {badge}
                  </span>
                )}
                <span className="contact-name">{contact.name}</span>
                <span className="contact-number">{contact.number}</span>
              </div>

              {/* Call button */}
              <div
                className="contact-call-btn"
                style={isRelevant
                  ? { background: theme.color, color: "#fff" }
                  : { background: "#eee", color: "#555" }
                }
              >
                {isRelevant ? "📞 Call Now" : "📞 Call"}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}