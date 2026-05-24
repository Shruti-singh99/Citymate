import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    city: "Bangalore",
    duration: "2 hours",
    budget: "",
    timeOfDay: "Anytime",
    interests: [],
  });
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune"];
  const durations = ["1 hour", "2 hours", "3 hours", "4 hours", "Half day"];
  const timesOfDay = ["Anytime", "Morning", "Afternoon", "Evening", "Night"];
  const interestOptions = ["History", "Food", "Nature", "Architecture/Culture", "Shopping", "Art"];

  function handleInterest(interest) {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  async function handleGenerate() {
    setLoading(true);
    setGuide(null);

    const prompt = `You are CityMate, an AI urban exploration assistant.

A user has ${formData.duration} free in ${formData.city}.
Their budget is ₹${formData.budget || "flexible"}.
Time of day: ${formData.timeOfDay}.
Interests: ${formData.interests.length > 0 ? formData.interests.join(", ") : "general"}.

Give them a short, specific, actionable plan. Include:
1. One main recommendation (place or activity) with a reason why it fits
2. A quick food suggestion nearby
3. A practical tip (transport, timing, or budget)

Keep it concise, warm, and useful. Format it clearly.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC21MLJk9f7UB24XvaP-Ma3HiS03pn-jWo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      setGuide(text);
    } catch (error) {
      setGuide("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  const d = darkMode;

  const s = {
    page: { minHeight: "100vh", backgroundColor: d ? "#0f0f0f" : "#f5f5f5", fontFamily: "system-ui, sans-serif", transition: "all 0.3s" },
    header: { backgroundColor: d ? "#111" : "#1a1a1a", padding: "40px", borderBottom: `1px solid ${d ? "#222" : "#ddd"}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    badge: { color: "#888", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" },
    title: { color: "#fff", fontSize: "42px", fontWeight: "800", margin: "0 0 8px", letterSpacing: "-1px" },
    subtitle: { color: "#aaa", fontSize: "15px", margin: 0 },
    toggleBtn: { backgroundColor: d ? "#222" : "#333", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 18px", fontSize: "13px", cursor: "pointer" },
    body: { padding: "32px 40px" },
    card: { maxWidth: "860px", backgroundColor: d ? "#1a1a1a" : "#ffffff", borderRadius: "16px", padding: "32px", border: `1px solid ${d ? "#2a2a2a" : "#e0e0e0"}`, boxShadow: d ? "none" : "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" },
    sectionLabel: { color: "#3b82f6", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" },
    formTitle: { color: d ? "#fff" : "#111", fontSize: "22px", fontWeight: "600", margin: "0 0 24px" },
    row: { display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" },
    field: { display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "160px" },
    label: { color: d ? "#888" : "#555", fontSize: "12px", fontWeight: "500" },
    select: { backgroundColor: d ? "#111" : "#f9f9f9", color: d ? "#fff" : "#111", border: `1px solid ${d ? "#333" : "#ddd"}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px" },
    input: { backgroundColor: d ? "#111" : "#f9f9f9", color: d ? "#fff" : "#111", border: `1px solid ${d ? "#333" : "#ddd"}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px" },
    interests: { display: "flex", gap: "8px", flexWrap: "wrap" },
    chip: { backgroundColor: "transparent", color: d ? "#888" : "#555", border: `1px solid ${d ? "#333" : "#ccc"}`, borderRadius: "20px", padding: "6px 16px", fontSize: "13px", cursor: "pointer" },
    chipActive: { backgroundColor: "#3b82f6", color: "#fff", border: "1px solid #3b82f6", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", cursor: "pointer", fontWeight: "600" },
    generateBtn: { marginTop: "24px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: "600", cursor: "pointer", opacity: loading ? 0.7 : 1 },
    guideCard: { maxWidth: "860px", backgroundColor: d ? "#1a1a1a" : "#ffffff", borderRadius: "16px", padding: "32px", border: `1px solid ${d ? "#2a2a2a" : "#e0e0e0"}`, boxShadow: d ? "none" : "0 2px 12px rgba(0,0,0,0.08)" },
    guideTitle: { color: "#3b82f6", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" },
    guideText: { color: d ? "#ccc" : "#333", fontSize: "15px", lineHeight: "1.8", whiteSpace: "pre-wrap" },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <p style={s.badge}>AI Urban Exploration Assistant</p>
          <h1 style={s.title}>CITYMATE</h1>
          <p style={s.subtitle}>Your smart companion for discovering the best ways to spend free time in any city.</p>
        </div>
        <button style={s.toggleBtn} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
        </button>
      </div>

      <div style={s.body}>
        <div style={s.card}>
          <p style={s.sectionLabel}>Smart city plan</p>
          <h2 style={s.formTitle}>Tell CityMate your free window</h2>

          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>City</label>
              <select style={s.select} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Available Duration</label>
              <select style={s.select} value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })}>
                {durations.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Budget (₹)</label>
              <input style={s.input} type="number" placeholder="e.g. 500" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Time of Day</label>
              <select style={s.select} value={formData.timeOfDay} onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}>
                {timesOfDay.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Interests</label>
            <div style={s.interests}>
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  style={formData.interests.includes(interest) ? s.chipActive : s.chip}
                  onClick={() => handleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button style={s.generateBtn} onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Guide"}
          </button>
        </div>

        {guide && (
          <div style={s.guideCard}>
            <p style={s.guideTitle}>Your CityMate guide</p>
            <p style={s.guideText}>{guide}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;