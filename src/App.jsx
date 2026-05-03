import { useState } from "react";

const SEED_CLIENTS = [
  { id: 1, name: "Carlos M.", phone: "831-555-0192", address: "Salinas, CA", notes: "Regular — oil changes monthly" },
  { id: 2, name: "Rosa T.", phone: "831-555-0347", address: "Monterey, CA", notes: "Referred by Carlos" },
];
const SEED_JOBS = [
  { id: 1, clientId: 1, date: "2026-04-28", description: "Oil change + tire rotation", status: "completed", amount: 120 },
  { id: 2, clientId: 2, date: "2026-05-01", description: "Brake pad replacement (front)", status: "completed", amount: 280 },
  { id: 3, clientId: 1, date: "2026-05-03", description: "AC diagnostic", status: "pending", amount: 75 },
];
const SEED_INVOICES = [
  { id: 1, clientId: 1, jobId: 1, date: "2026-04-28", items: [{ desc: "Oil change", qty: 1, price: 80 }, { desc: "Tire rotation", qty: 1, price: 40 }], total: 120, status: "paid" },
  { id: 2, clientId: 2, jobId: 2, date: "2026-05-01", items: [{ desc: "Front brake pads", qty: 1, price: 120 }, { desc: "Labor (2hrs @ $80)", qty: 1, price: 160 }], total: 280, status: "sent" },
];

const S = {
  app: { minHeight: "100vh", backgroundColor: "#0d0d0d", color: "#f0ebe0", fontFamily: "'Courier New', Courier, monospace" },
  header: { borderBottom: "2px solid #b91c1c", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0d0d0d" },
  logo: { fontSize: "26px", fontWeight: 900, letterSpacing: "8px", color: "#f0ebe0" },
  logoAccent: { color: "#b91c1c" },
  tagline: { fontSize: "10px", letterSpacing: "3px", color: "#4b5563", textTransform: "uppercase" },
  nav: { display: "flex", gap: 0, padding: "0 24px", backgroundColor: "#111111", borderBottom: "1px solid #1f1f1f", overflowX: "auto" },
  navBtn: (a) => ({ padding: "14px 18px", background: "none", border: "none", color: a ? "#b91c1c" : "#4b5563", cursor: "pointer", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", borderBottom: a ? "2px solid #b91c1c" : "2px solid transparent", fontFamily: "'Courier New', monospace", whiteSpace: "nowrap" }),
  main: { padding: "24px", maxWidth: "960px", margin: "0 auto" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" },
  statCard: { backgroundColor: "#111", border: "1px solid #1f1f1f", padding: "20px", borderRadius: "2px" },
  statNum: { fontSize: "32px", fontWeight: 900, color: "#b91c1c", lineHeight: 1 },
  statLabel: { fontSize: "9px", letterSpacing: "2px", color: "#4b5563", textTransform: "uppercase", marginTop: "6px" },
  card: { backgroundColor: "#111", border: "1px solid #1f1f1f", borderRadius: "2px", padding: "20px", marginBottom: "16px" },
  sectionTitle: { fontSize: "10px", letterSpacing: "3px", color: "#4b5563", textTransform: "uppercase", marginBottom: "16px", borderLeft: "3px solid #b91c1c", paddingLeft: "12px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: "9px", letterSpacing: "2px", color: "#4b5563", textTransform: "uppercase", padding: "8px 12px", borderBottom: "1px solid #1f1f1f" },
  td: { padding: "12px", borderBottom: "1px solid #0d0d0d", fontSize: "13px", color: "#d1cfc9" },
  tdMuted: { padding: "12px", borderBottom: "1px solid #0d0d0d", fontSize: "12px", color: "#4b5563" },
  badge: (s) => ({ display: "inline-block", padding: "2px 8px", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 700, borderRadius: "2px", backgroundColor: s === "completed" || s === "paid" ? "#14532d33" : s === "pending" || s === "sent" ? "#7c2d1233" : "#1e3a5f33", color: s === "completed" || s === "paid" ? "#4ade80" : s === "pending" || s === "sent" ? "#fb923c" : "#60a5fa", border: `1px solid ${s === "completed" || s === "paid" ? "#4ade8033" : s === "pending" || s === "sent" ? "#fb923c33" : "#60a5fa33"}` }),
  label: { fontSize: "9px", letterSpacing: "2px", color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "6px" },
  input: { width: "100%", backgroundColor: "#0d0d0d", border: "1px solid #1f1f1f", color: "#f0ebe0", padding: "10px 12px", borderRadius: "2px", fontSize: "13px", fontFamily: "'Courier New', monospace", boxSizing: "border-box", outline: "none" },
  select: { width: "100%", backgroundColor: "#0d0d0d", border: "1px solid #1f1f1f", color: "#f0ebe0", padding: "10px 12px", borderRadius: "2px", fontSize: "13px", fontFamily: "'Courier New', monospace", boxSizing: "border-box", outline: "none" },
  textarea: { width: "100%", backgroundColor: "#0d0d0d", border: "1px solid #1f1f1f", color: "#f0ebe0", padding: "10px 12px", borderRadius: "2px", fontSize: "13px", fontFamily: "'Courier New', monospace", boxSizing: "border-box", outline: "none", resize: "vertical", minHeight: "80px" },
  btn: { backgroundColor: "#b91c1c", color: "#f0ebe0", border: "none", padding: "11px 24px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "'Courier New', monospace" },
  btnSm: { backgroundColor: "#b91c1c", color: "#f0ebe0", border: "none", padding: "6px 14px", fontSize: "9px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "'Courier New', monospace" },
  btnGhost: { backgroundColor: "transparent", color: "#4b5563", border: "1px solid #1f1f1f", padding: "9px 18px", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "'Courier New', monospace" },
  row: { display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" },
  col: { flex: 1, minWidth: "140px" },
  fg: { marginBottom: "14px" },
  quoteBox: { backgroundColor: "#0d0d0d", border: "1px solid #1f1f1f", borderRadius: "2px", padding: "20px", whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.9", color: "#d1cfc9", minHeight: "180px" },
  dot: (on) => ({ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: on ? "#4ade80" : "#4b5563", display: "inline-block", marginRight: "8px" }),
  divider: { border: "none", borderTop: "1px solid #1f1f1f", margin: "20px 0" },
};

export default function Sueldo() {
  const [tab, setTab] = useState("dashboard");
  const [clients, setClients] = useState(SEED_CLIENTS);
  const [jobs, setJobs] = useState(SEED_JOBS);
  const [invoices, setInvoices] = useState(SEED_INVOICES);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_ANTHROPIC_KEY || "");
  const [showKeyInput, setShowKeyInput] = useState(false);

  const [nc, setNc] = useState({ name: "", phone: "", address: "", notes: "" });
  const [nj, setNj] = useState({ clientId: "", date: "", description: "", status: "pending", amount: "" });
  const [ni, setNi] = useState({ clientId: "", date: new Date().toISOString().split("T")[0], items: [{ desc: "", qty: 1, price: "" }] });
  const [qf, setQf] = useState({ jobType: "", vehicle: "", parts: "", hours: "", rate: "80", notes: "" });
  const [qResult, setQResult] = useState("");
  const [qLoading, setQLoading] = useState(false);
  const [qError, setQError] = useState("");
  const [viewInvoice, setViewInvoice] = useState(null);
  const [copied, setCopied] = useState(false);

  const clientName = (id) => clients.find(c => c.id === Number(id))?.name || "—";

  const addClient = () => {
    if (!nc.name.trim()) return;
    setClients([...clients, { ...nc, id: Date.now() }]);
    setNc({ name: "", phone: "", address: "", notes: "" });
  };

  const addJob = () => {
    if (!nj.description.trim() || !nj.clientId) return;
    setJobs([...jobs, { ...nj, id: Date.now(), clientId: Number(nj.clientId), amount: parseFloat(nj.amount) || 0 }]);
    setNj({ clientId: "", date: "", description: "", status: "pending", amount: "" });
  };

  const updateJobStatus = (id, status) => setJobs(jobs.map(j => j.id === id ? { ...j, status } : j));

  const invoiceTotal = () => ni.items.reduce((s, i) => s + (parseFloat(i.price) || 0) * (parseInt(i.qty) || 0), 0);

  const addInvoice = () => {
    if (!ni.clientId) return;
    const total = invoiceTotal();
    setInvoices([...invoices, { ...ni, id: Date.now(), clientId: Number(ni.clientId), total, status: "sent" }]);
    setNi({ clientId: "", date: new Date().toISOString().split("T")[0], items: [{ desc: "", qty: 1, price: "" }] });
  };

  const addInvoiceItem = () => setNi({ ...ni, items: [...ni.items, { desc: "", qty: 1, price: "" }] });
  const updateItem = (idx, field, val) => {
    const items = [...ni.items];
    items[idx] = { ...items[idx], [field]: val };
    setNi({ ...ni, items });
  };
  const removeItem = (idx) => setNi({ ...ni, items: ni.items.filter((_, i) => i !== idx) });

  const generateQuote = async () => {
    if (!qf.jobType) return;
    if (!apiKey) { setQError("Add your Anthropic API key in Settings (top right) to use AI Quote."); return; }
    setQLoading(true);
    setQResult("");
    setQError("");
    try {
      const prompt = `You are a pricing assistant for an independent mobile mechanic. Generate a professional job quote.

Job Type: ${qf.jobType}
Vehicle/Equipment: ${qf.vehicle || "Not specified"}
Parts Needed: ${qf.parts || "TBD"}
Estimated Hours: ${qf.hours || "TBD"}
Labor Rate: $${qf.rate}/hr
Notes: ${qf.notes || "None"}

Write a clean, professional quote with itemized parts, labor cost, and TOTAL. Keep it concise and ready to send to a client.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      if (!text) throw new Error("No response");
      setQResult(text);
    } catch {
      setQError("Error generating quote. Check your API key and try again.");
    }
    setQLoading(false);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(qResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = jobs.filter(j => j.status === "completed").reduce((s, j) => s + j.amount, 0);
  const pendingCount = jobs.filter(j => j.status === "pending").length;
  const unpaidCount = invoices.filter(i => i.status !== "paid").length;

  const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "clients", label: "Clients" },
    { id: "jobs", label: "Jobs" },
    { id: "invoices", label: "Invoices" },
    { id: "quote", label: "AI Quote" },
  ];

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={S.logo}>SUEL<span style={S.logoAccent}>DO</span></div>
          <div style={S.tagline}>Mobile Trades Platform</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {showKeyInput ? (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                style={{ ...S.input, width: "260px", fontSize: "11px" }}
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-ant-... (Anthropic API key)"
              />
              <button style={S.btnSm} onClick={() => setShowKeyInput(false)}>Save</button>
            </div>
          ) : (
            <button style={S.btnGhost} onClick={() => setShowKeyInput(true)}>
              {apiKey ? "✓ API Key Set" : "⚙ API Key"}
            </button>
          )}
          <div>
            <span style={S.dot(true)} />
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#4b5563" }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {TABS.map(t => (
          <button key={t.id} style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div style={S.main}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <div style={S.statGrid}>
              <div style={S.statCard}>
                <div style={S.statNum}>${totalEarned.toLocaleString()}</div>
                <div style={S.statLabel}>Total Earned</div>
              </div>
              <div style={S.statCard}>
                <div style={S.statNum}>{jobs.length}</div>
                <div style={S.statLabel}>Total Jobs</div>
              </div>
              <div style={S.statCard}>
                <div style={{ ...S.statNum, color: pendingCount > 0 ? "#fb923c" : "#b91c1c" }}>{pendingCount}</div>
                <div style={S.statLabel}>Pending Jobs</div>
              </div>
              <div style={S.statCard}>
                <div style={S.statNum}>{clients.length}</div>
                <div style={S.statLabel}>Clients</div>
              </div>
            </div>

            {unpaidCount > 0 && (
              <div style={{ backgroundColor: "#7c2d1222", border: "1px solid #7c2d1244", borderRadius: "2px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "#fb923c", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>⚠ {unpaidCount} UNPAID INVOICE{unpaidCount > 1 ? "S" : ""}</span>
                <button style={S.btnSm} onClick={() => setTab("invoices")}>View</button>
              </div>
            )}

            <div style={S.sectionTitle}>Recent Jobs</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Client</th>
                    <th style={S.th}>Description</th>
                    <th style={S.th}>Date</th>
                    <th style={S.th}>$</th>
                    <th style={S.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...jobs].reverse().slice(0, 6).map(j => (
                    <tr key={j.id}>
                      <td style={S.td}>{clientName(j.clientId)}</td>
                      <td style={S.td}>{j.description}</td>
                      <td style={S.tdMuted}>{j.date}</td>
                      <td style={S.td}>${j.amount}</td>
                      <td style={S.td}><span style={S.badge(j.status)}>{j.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CLIENTS */}
        {tab === "clients" && (
          <div>
            <div style={S.sectionTitle}>Add Client</div>
            <div style={S.card}>
              <div style={S.row}>
                <div style={S.col}>
                  <label style={S.label}>Name *</label>
                  <input style={S.input} value={nc.name} onChange={e => setNc({ ...nc, name: e.target.value })} placeholder="Full name" />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Phone</label>
                  <input style={S.input} value={nc.phone} onChange={e => setNc({ ...nc, phone: e.target.value })} placeholder="831-555-0000" />
                </div>
              </div>
              <div style={S.row}>
                <div style={S.col}>
                  <label style={S.label}>Address</label>
                  <input style={S.input} value={nc.address} onChange={e => setNc({ ...nc, address: e.target.value })} placeholder="City, State" />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Notes</label>
                  <input style={S.input} value={nc.notes} onChange={e => setNc({ ...nc, notes: e.target.value })} placeholder="Any notes..." />
                </div>
              </div>
              <button style={S.btn} onClick={addClient}>+ Add Client</button>
            </div>

            <div style={S.sectionTitle}>All Clients ({clients.length})</div>
            {clients.map(c => (
              <div key={c.id} style={{ ...S.card, padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{c.name}</div>
                    <div style={{ fontSize: "12px", color: "#4b5563" }}>{c.phone}{c.address ? ` · ${c.address}` : ""}</div>
                    {c.notes && <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", fontStyle: "italic" }}>{c.notes}</div>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10px", color: "#4b5563", letterSpacing: "1px" }}>
                      {jobs.filter(j => j.clientId === c.id).length} job{jobs.filter(j => j.clientId === c.id).length !== 1 ? "s" : ""}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#b91c1c", marginTop: "2px" }}>
                      ${jobs.filter(j => j.clientId === c.id && j.status === "completed").reduce((s, j) => s + j.amount, 0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JOBS */}
        {tab === "jobs" && (
          <div>
            <div style={S.sectionTitle}>Log a Job</div>
            <div style={S.card}>
              <div style={S.row}>
                <div style={S.col}>
                  <label style={S.label}>Client *</label>
                  <select style={S.select} value={nj.clientId} onChange={e => setNj({ ...nj, clientId: e.target.value })}>
                    <option value="">Select client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div style={S.col}>
                  <label style={S.label}>Date</label>
                  <input style={S.input} type="date" value={nj.date} onChange={e => setNj({ ...nj, date: e.target.value })} />
                </div>
              </div>
              <div style={S.row}>
                <div style={{ flex: 2, minWidth: "200px" }}>
                  <label style={S.label}>Description *</label>
                  <input style={S.input} value={nj.description} onChange={e => setNj({ ...nj, description: e.target.value })} placeholder="What did you do?" />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Amount ($)</label>
                  <input style={S.input} type="number" value={nj.amount} onChange={e => setNj({ ...nj, amount: e.target.value })} placeholder="0.00" />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Status</label>
                  <select style={S.select} value={nj.status} onChange={e => setNj({ ...nj, status: e.target.value })}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <button style={S.btn} onClick={addJob}>+ Log Job</button>
            </div>

            <div style={S.sectionTitle}>Job History ({jobs.length})</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Client</th>
                    <th style={S.th}>Description</th>
                    <th style={S.th}>Date</th>
                    <th style={S.th}>Amount</th>
                    <th style={S.th}>Status</th>
                    <th style={S.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...jobs].reverse().map(j => (
                    <tr key={j.id}>
                      <td style={S.td}>{clientName(j.clientId)}</td>
                      <td style={S.td}>{j.description}</td>
                      <td style={S.tdMuted}>{j.date}</td>
                      <td style={{ ...S.td, fontWeight: 700 }}>${j.amount}</td>
                      <td style={S.td}><span style={S.badge(j.status)}>{j.status}</span></td>
                      <td style={S.td}>
                        {j.status === "pending" && (
                          <button style={S.btnSm} onClick={() => updateJobStatus(j.id, "completed")}>Mark Done</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVOICES */}
        {tab === "invoices" && (
          <div>
            {viewInvoice ? (
              <div>
                <button style={S.btnGhost} onClick={() => setViewInvoice(null)}>← Back</button>
                <div style={{ marginTop: "20px" }}>
                  <div style={{ ...S.card, borderColor: "#b91c1c22" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                      <div>
                        <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "4px" }}>SUEL<span style={{ color: "#b91c1c" }}>DO</span></div>
                        <div style={{ fontSize: "10px", color: "#4b5563", marginTop: "4px" }}>Auto On Da Go Repair & Services</div>
                        <div style={{ fontSize: "10px", color: "#4b5563" }}>Salinas, CA · 831</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#4b5563" }}>INVOICE #{viewInvoice.id}</div>
                        <div style={{ fontSize: "12px", color: "#d1cfc9", marginTop: "4px" }}>{viewInvoice.date}</div>
                        <div style={{ marginTop: "8px" }}><span style={S.badge(viewInvoice.status)}>{viewInvoice.status}</span></div>
                      </div>
                    </div>
                    <div style={{ fontSize: "10px", color: "#4b5563", letterSpacing: "1px", marginBottom: "4px" }}>BILL TO</div>
                    <div style={{ fontWeight: 700, marginBottom: "20px" }}>{clientName(viewInvoice.clientId)}</div>
                    <hr style={S.divider} />
                    <table style={{ ...S.table, marginBottom: "16px" }}>
                      <thead>
                        <tr>
                          <th style={S.th}>Description</th>
                          <th style={{ ...S.th, textAlign: "center" }}>Qty</th>
                          <th style={{ ...S.th, textAlign: "right" }}>Price</th>
                          <th style={{ ...S.th, textAlign: "right" }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewInvoice.items.map((item, i) => (
                          <tr key={i}>
                            <td style={S.td}>{item.desc}</td>
                            <td style={{ ...S.td, textAlign: "center" }}>{item.qty}</td>
                            <td style={{ ...S.td, textAlign: "right" }}>${item.price}</td>
                            <td style={{ ...S.td, textAlign: "right", fontWeight: 700 }}>${(item.qty * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <hr style={S.divider} />
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "10px", color: "#4b5563", letterSpacing: "2px", marginBottom: "4px" }}>TOTAL DUE</div>
                      <div style={{ fontSize: "28px", fontWeight: 900, color: "#b91c1c" }}>${viewInvoice.total.toFixed(2)}</div>
                    </div>
                    <hr style={S.divider} />
                    <div style={{ fontSize: "11px", color: "#4b5563" }}>Thank you for your business. Payment due upon receipt.</div>
                  </div>
                  {viewInvoice.status !== "paid" && (
                    <button style={S.btn} onClick={() => { setInvoices(invoices.map(i => i.id === viewInvoice.id ? { ...i, status: "paid" } : i)); setViewInvoice({ ...viewInvoice, status: "paid" }); }}>Mark as Paid</button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div style={S.sectionTitle}>Create Invoice</div>
                <div style={S.card}>
                  <div style={S.row}>
                    <div style={S.col}>
                      <label style={S.label}>Client *</label>
                      <select style={S.select} value={ni.clientId} onChange={e => setNi({ ...ni, clientId: e.target.value })}>
                        <option value="">Select client</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div style={S.col}>
                      <label style={S.label}>Date</label>
                      <input style={S.input} type="date" value={ni.date} onChange={e => setNi({ ...ni, date: e.target.value })} />
                    </div>
                  </div>
                  <div style={S.sectionTitle}>Line Items</div>
                  {ni.items.map((item, i) => (
                    <div key={i} style={{ ...S.row, alignItems: "flex-end" }}>
                      <div style={{ flex: 3, minWidth: "160px" }}>
                        {i === 0 && <label style={S.label}>Description</label>}
                        <input style={S.input} value={item.desc} onChange={e => updateItem(i, "desc", e.target.value)} placeholder="Parts, labor, etc." />
                      </div>
                      <div style={{ width: "70px" }}>
                        {i === 0 && <label style={S.label}>Qty</label>}
                        <input style={S.input} type="number" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} min="1" />
                      </div>
                      <div style={{ width: "100px" }}>
                        {i === 0 && <label style={S.label}>Price ($)</label>}
                        <input style={S.input} type="number" value={item.price} onChange={e => updateItem(i, "price", e.target.value)} placeholder="0.00" />
                      </div>
                      {ni.items.length > 1 && (
                        <button style={{ ...S.btnGhost, padding: "9px 10px", color: "#b91c1c" }} onClick={() => removeItem(i)}>✕</button>
                      )}
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
                    <button style={S.btnGhost} onClick={addInvoiceItem}>+ Add Line</button>
                    <div style={{ marginLeft: "auto", fontSize: "13px", color: "#4b5563" }}>
                      Total: <span style={{ color: "#b91c1c", fontWeight: 900, fontSize: "18px" }}>${invoiceTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  <hr style={S.divider} />
                  <button style={S.btn} onClick={addInvoice}>Generate Invoice</button>
                </div>

                <div style={S.sectionTitle}>All Invoices ({invoices.length})</div>
                <div style={S.card}>
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={S.th}>#</th>
                        <th style={S.th}>Client</th>
                        <th style={S.th}>Date</th>
                        <th style={S.th}>Total</th>
                        <th style={S.th}>Status</th>
                        <th style={S.th}>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...invoices].reverse().map(inv => (
                        <tr key={inv.id}>
                          <td style={S.tdMuted}>#{inv.id}</td>
                          <td style={S.td}>{clientName(inv.clientId)}</td>
                          <td style={S.tdMuted}>{inv.date}</td>
                          <td style={{ ...S.td, fontWeight: 700 }}>${inv.total.toFixed(2)}</td>
                          <td style={S.td}><span style={S.badge(inv.status)}>{inv.status}</span></td>
                          <td style={S.td}><button style={S.btnSm} onClick={() => setViewInvoice(inv)}>Open</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI QUOTE */}
        {tab === "quote" && (
          <div>
            <div style={S.sectionTitle}>AI Quote Generator</div>
            <div style={{ fontSize: "11px", color: "#4b5563", marginBottom: "20px", letterSpacing: "1px" }}>
              Describe the job — AI builds a professional quote you can send in seconds.
            </div>
            {!apiKey && (
              <div style={{ backgroundColor: "#1e3a5f22", border: "1px solid #1e3a5f55", borderRadius: "2px", padding: "12px 16px", marginBottom: "16px", fontSize: "11px", color: "#60a5fa", letterSpacing: "1px" }}>
                ℹ Add your Anthropic API key (top right) to unlock AI Quote generation.
              </div>
            )}
            <div style={S.card}>
              <div style={S.row}>
                <div style={{ flex: 2, minWidth: "180px" }}>
                  <label style={S.label}>Job Type *</label>
                  <input style={S.input} value={qf.jobType} onChange={e => setQf({ ...qf, jobType: e.target.value })} placeholder="Brake job, oil change, AC recharge..." />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Vehicle</label>
                  <input style={S.input} value={qf.vehicle} onChange={e => setQf({ ...qf, vehicle: e.target.value })} placeholder="2018 Honda Civic..." />
                </div>
              </div>
              <div style={S.row}>
                <div style={{ flex: 2, minWidth: "180px" }}>
                  <label style={S.label}>Parts Needed</label>
                  <input style={S.input} value={qf.parts} onChange={e => setQf({ ...qf, parts: e.target.value })} placeholder="Brake pads, rotors, filter..." />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Est. Hours</label>
                  <input style={S.input} type="number" value={qf.hours} onChange={e => setQf({ ...qf, hours: e.target.value })} placeholder="2" />
                </div>
                <div style={S.col}>
                  <label style={S.label}>Labor $/hr</label>
                  <input style={S.input} type="number" value={qf.rate} onChange={e => setQf({ ...qf, rate: e.target.value })} placeholder="80" />
                </div>
              </div>
              <div style={S.fg}>
                <label style={S.label}>Additional Notes</label>
                <textarea style={S.textarea} value={qf.notes} onChange={e => setQf({ ...qf, notes: e.target.value })} placeholder="Any extra details about the job..." />
              </div>
              <button style={{ ...S.btn, opacity: qLoading ? 0.6 : 1 }} onClick={generateQuote} disabled={qLoading}>
                {qLoading ? "Generating..." : "⚡ Generate Quote"}
              </button>
            </div>

            {(qResult || qLoading || qError) && (
              <div>
                <div style={S.sectionTitle}>Your Quote</div>
                <div style={S.quoteBox}>
                  {qLoading && <span style={{ color: "#4b5563", letterSpacing: "2px", fontSize: "11px" }}>Building your quote...</span>}
                  {qError && <span style={{ color: "#fb923c" }}>{qError}</span>}
                  {qResult}
                </div>
                {qResult && (
                  <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                    <button style={S.btn} onClick={copyQuote}>{copied ? "✓ Copied!" : "Copy Quote"}</button>
                    <button style={S.btnGhost} onClick={() => { setQResult(""); setQError(""); }}>Clear</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid #1f1f1f", padding: "16px 24px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#2a2a2a" }}>SUELDO · BUILT FOR THE GRIND</div>
        <div style={{ fontSize: "9px", letterSpacing: "1px", color: "#2a2a2a" }}>831 · AUTO ON DA GO</div>
      </div>
    </div>
  );
}
