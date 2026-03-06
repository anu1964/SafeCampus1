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
