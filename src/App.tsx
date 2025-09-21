import React, { useEffect, useMemo, useRef, useState } from "react";

const Icon = ({ d = "M2 12h20", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
);
const icons = {
  Food: (p) => (
    <Icon
      {...p}
      d="M4 10h16M7 6h10m-9 8v4a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-4M6 10V6m12 4V6"
    />
  ),
  Sleep: (p) => (
    <Icon {...p} d="M4 14h16M5 14v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M8 18h8M10 10h.01M14 10h.01" />
  ),
  Mood: (p) => (
    <Icon {...p} d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M8.5 10h.01M15.5 10h.01M8 15c1 .8 2.2 1.2 4 1.2s3-.4 4-1.2" />
  ),
  Energy: (p) => <Icon {...p} d="M13 2L3 14h6l-2 8l10-12h-6l2-8z" />,
  Activity: (p) => <Icon {...p} d="M9 18l-2-3 3-4 2 2 3-5 2 2M5 21h4M15 21h4" />,
  Symptoms: (p) => <Icon {...p} d="M12 2v6M9 5h6M5 12h14M7 12v8h10v-8" />,
  HeartHealth: (p) => (
    <Icon {...p} d="M20.8 8.6a4.6 4.6 0 0 0-7.3-3.6L12 6.1l-1.5-1.1A4.6 4.6 0 0 0 3.2 8.6c0 5.1 6.8 8.9 8.8 10 2-1.1 8.8-4.9 8.8-10z" />
  ),
  Intimacy: (p) => <Icon {...p} d="M12 21s-7-4.5-7-9a4 4 0 0 1 7-2a4 4 0 0 1 7 2c0 4.5-7 9-7 9z" />,
  Back: (p) => <Icon {...p} d="M15 18l-6-6l6-6" />,
  Dashboard: (p) => <Icon {...p} d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" />,
  Track: (p) => <Icon {...p} d="M3 6h18M3 12h18M3 18h18" />,
  Journal: (p) => <Icon {...p} d="M5 3h10l4 4v14H5zM15 3v4h4" />,
  Flags: (p) => <Icon {...p} d="M6 3v18M6 4h10l-2 3l2 3H6" />,
};

const CATEGORIES = [
  {
    id: "Food",
    icon: icons.Food,
    nodes: {
      Liquids: [
        "Water",
        "Coffee",
        "Soda",
        "Milk",
        { label: "Other", input: "text" },
      ],
      Snacks: [
        "Biscuits",
        "Chocolate",
        "Chips",
        { label: "Other", input: "text" },
      ],
      Breakfast: [
        "Toast",
        "Weetbix",
        "Cereal",
        {
          label: "Takeout",
          next: {
            options: [
              "McDonalds",
              "Burger King",
              "Chinese",
              "Pizza",
              { label: "Other", input: "text" },
            ],
          },
        },
        { label: "Other", input: "text" },
      ],
      Lunch: [
        "Toast",
        "Sandwich",
        "Protein",
        {
          label: "Takeout",
          next: {
            options: [
              "McDonalds",
              "Burger King",
              "Chinese",
              "Pizza",
              { label: "Other", input: "text" },
            ],
          },
        },
        { label: "Other", input: "text" },
      ],
      Dinner: {
        Main: [
          "Steak",
          "Chicken",
          "Veg",
          "Salad",
          { label: "Other", input: "text" },
        ],
        Takeout: [
          "McDonalds",
          "Burger King",
          "Chinese",
          "Pizza",
          { label: "Other", input: "text" },
        ],
      },
    },
  },
  {
    id: "Sleep",
    icon: icons.Sleep,
    nodes: {},
  },
  {
    id: "Mood",
    icon: icons.Mood,
    nodes: [
      "Joyful",
      "Calm",
      "Neutral",
      "Irritable",
      "Sad",
      { label: "Other", input: "text" },
    ],
  },
  {
    id: "Energy",
    icon: icons.Energy,
    nodes: ["Low", "Medium", "High", { label: "Other", input: "text" }],
  },
  {
    id: "Activity",
    icon: icons.Activity,
    nodes: [
      "Gym",
      "Walk",
      "Run",
      "Cycle",
      "Yoga",
      { label: "Other", input: "text" },
    ],
  },
  {
    id: "Symptoms",
    icon: icons.Symptoms,
    nodes: [
      "Headache",
      "Stomachache",
      "Fever",
      "Cough",
      "Fatigue",
      "Blindness",
      { label: "Other", input: "text" },
    ],
  },
  {
    id: "HeartHealth",
    icon: icons.HeartHealth,
    nodes: [
      { label: "Palpitations", next: { options: ["One", "A Few", "Many", { label: "Other", input: "text" }] } },
      "Chest tightness",
      "Shortness of breath",
      { label: "Other", input: "text" },
    ],
  },
  {
    id: "Intimacy",
    icon: icons.Intimacy,
    nodes: ["Yes", "No", { label: "Other", input: "text" }],
  },
];

const LS_KEYS = { entries: "dat_entries_v1", journal: "dat_journal_v1" };

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal];
}
const nowISO = () => new Date().toISOString();

const toCSVWide = (rows) => {
  const esc = (s) => '"' + String(s ?? "").replace(/"/g, '""') + '"';
  const header = [
    "timestamp",
    "category",
    "subcategory",
    "option",
    "Duration",
    "HadDream",
    "DreamType",
    "Amount",
  ].map(esc).join(",");

  const body = rows
    .map((r) => {
      let category = r.category;
      let subcategory = "";
      let option = "";
      let Duration = "";
      let HadDream = "";
      let DreamType = "";
      let Amount = "";

      if (category === "Sleep" && r.value && typeof r.value === "object") {
        subcategory = r.value.type || "";
        Duration = r.value.duration || "";
        HadDream = r.value.hadDream || "";
        if (HadDream && HadDream !== "None") {
          DreamType = r.value.dreamType || "";
        }
      } else {
        const parts = Array.isArray(r.path)
          ? r.path.slice()
          : String(r.path || "").split(" / ").filter(Boolean);
        subcategory = parts[0] || "";
        option = typeof r.value === "string" ? r.value : r.value?.label || "";
        if (category === "HeartHealth" && subcategory.toLowerCase() === "palpitations") {
          Amount = option;
          option = "";
        }
      }

      return [
        r.timestamp,
        category,
        subcategory,
        option,
        Duration,
        HadDream,
        DreamType,
        Amount,
      ]
        .map(esc)
        .join(",");
    })
    .join("\n");

  return header + "\n" + body;
};

function download(filename, text) {
  try {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
      a.remove();
    }, 1500);
  } catch (err) {
    const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(text);
    const a = document.createElement("a");
    a.href = uri;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

const shellClass = "min-h-screen bg-black text-[#F6E7B6]";
const containerClass = "max-w-md mx-auto px-4 pb-24 pt-8 text-center";
const panelClass =
  "rounded-2xl border border-yellow-400/20 bg-[linear-gradient(180deg,rgba(255,215,0,0.05),rgba(0,0,0,0.4))] shadow-[0_0_30px_rgba(255,215,0,0.08)]";
const buttonClass =
  "rounded-xl border border-yellow-400/20 hover:bg-yellow-400/10 active:scale-[0.99] transition";
const inputClass =
  "rounded-xl border border-yellow-400/20 bg-black/40 text-[#F6E7B6] placeholder-yellow-200/40 px-3 py-2";
const goldText = "text-yellow-300";

function SectionCard({ title, IconComp, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${panelClass} ${buttonClass} w-full h-28 flex flex-col items-center justify-center gap-2`}
    >
      <div className={`${goldText}`}>
        <IconComp size={28} />
      </div>
      <div className="text-sm tracking-wide">{title}</div>
    </button>
  );
}

function Breadcrumbs({ stack, onBack }) {
  if (!stack?.length) return null;
  return (
    <div className="flex items-center justify-center gap-3 text-xs text-yellow-200/70">
      <button className={`${goldText} underline flex items-center gap-1 rounded-lg px-2 py-1 transition hover:bg-yellow-400/10 hover:shadow-[0_0_12px_rgba(255,215,0,0.35)] hover:text-yellow-200`} onClick={onBack}>
        {icons.Back({ size: 16 })} Back
      </button>
      <span>•</span>
      <div className="truncate">{stack.join(" › ")}</div>
    </div>
  );
}

function OptionButton({ label, onPick }) {
  return (
    <button
      onClick={onPick}
      className={`${panelClass} ${buttonClass} w-full text-left p-3 overflow-hidden`}
    >
      <span className="block truncate">{label}</span>
    </button>
  );
}

function TextPrompt({ placeholder, onSubmit, autoFocus }) {
  const [v, setV] = useState("");
  return (
    <div className="flex gap-2 justify-center">
      <input
        className={`${inputClass} w-2/3`}
        placeholder={placeholder}
        value={v}
        onChange={(e) => setV(e.target.value)}
        autoFocus={autoFocus}
      />
      <button className={`${buttonClass} px-3`} onClick={() => v.trim() && onSubmit(v.trim())}>Add</button>
    </div>
  );
}

function Dashboard({ onPickCategory }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map((c) => (
        <SectionCard key={c.id} title={c.id} IconComp={c.icon} onClick={() => onPickCategory(c)} />
      ))}
    </div>
  );
}

function drillChildren(node) {
  if (Array.isArray(node)) return { list: node, isLeafLevel: true };
  if (node && typeof node === "object") {
    const keys = Object.keys(node);
    return { list: keys.map((k) => ({ key: k, value: node[k] })), isLeafLevel: false };
  }
  return { list: [], isLeafLevel: true };
}

function SleepWizard({ onDone, onSave }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ type: null, duration: null, hadDream: null, dreamType: null, dreamLength: null });
  const go = (k, v) => {
    const next = { ...data, [k]: v };
    setData(next);
    if (k === "type") setStep(1);
    else if (k === "duration") setStep(2);
    else if (k === "hadDream") {
      if (v === "None") { onSave({ value: next }); onDone(); } else setStep(3);
    } else if (k === "dreamType") setStep(4);
    else if (k === "dreamLength") { onSave({ value: next }); onDone(); }
  };
  const back = () => { if (step === 0) return onDone(); setStep(step - 1); };
  const StepBlock = ({ title, options, k }) => {
    const [askText, setAskText] = useState(false);
    return (
      <div className="space-y-4">
        <Breadcrumbs stack={["Sleep", title]} onBack={() => (askText ? setAskText(false) : back())} />
        {!askText ? (
          <div className="space-y-2">
            {options.map((opt, i) =>
              typeof opt === "string" ? (
                <OptionButton key={i} label={opt} onPick={() => go(k, opt)} />
              ) : (
                <OptionButton key={i} label={opt.label || "Other"} onPick={() => setAskText(true)} />
              )
            )}
          </div>
        ) : (
          <TextPrompt placeholder={`Enter Other`} autoFocus onSubmit={(v) => go(k, v)} />
        )}
        <div>
          <button className="underline text-xs text-yellow-200/70 rounded-lg px-2 py-1 transition hover:bg-yellow-400/10 hover:shadow-[0_0_12px_rgba(255,215,0,0.35)] hover:text-yellow-200" onClick={onDone}>Cancel</button>
        </div>
      </div>
    );
  };
  if (step === 0) return <StepBlock title="Type" k="type" options={["Night","Nap",{label:"Other",input:"text"}]} />;
  if (step === 1) return <StepBlock title="Duration" k="duration" options={["4h","5h","6h","7h","8h","9h","10h",{label:"Other",input:"text"}]} />;
  if (step === 2) return <StepBlock title="Had Dream" k="hadDream" options={["None","Normal","Real"]} />;
  if (step === 3) return <StepBlock title="Dream Type" k="dreamType" options={["Normal","Scary","Real",{label:"Other",input:"text"}]} />;
  if (step === 4) return <StepBlock title="Dream Length" k="dreamLength" options={["Short","Medium","Long",{label:"Other",input:"text"}]} />;
  return null;
}

function Drilldown({ category, onDone, onSave }) {
  if (category.id === "Sleep") return <SleepWizard onDone={onDone} onSave={onSave} />;
  const [stack, setStack] = useState([]);
  const [node, setNode] = useState(category.nodes);
  const { list, isLeafLevel } = useMemo(() => drillChildren(node), [node]);
  function pickItem(item) {
    if (isLeafLevel) {
      if (typeof item === "string") {
        onSave({ pathParts: stack.slice(), value: item });
        onDone();
      } else if (item && typeof item === "object") {
        if (item.input === "text") {
          setStack((s) => [...s, item.label || "Other"]);
          setNode({ __TEXT__: item });
        } else if (item.next?.options) {
          setStack((s) => [...s, item.label]);
          setNode(item.next.options);
        } else {
          onSave({ pathParts: stack.slice(), value: item.label });
          onDone();
        }
      }
    } else {
      const key = item.key;
      setStack((s) => [...s, key]);
      setNode(item.value);
    }
  }
  function onBack() {
    if (!stack.length) return onDone();
    const newStack = stack.slice(0, -1);
    setStack(newStack);
    let n = category.nodes;
    for (const k of newStack) n = n[k];
    setNode(n);
  }
  return (
    <div className="space-y-4">
      <Breadcrumbs stack={[category.id, ...stack]} onBack={onBack} />
      {typeof node === "object" && !Array.isArray(node) && node.__TEXT__ ? (
        <TextPrompt
          placeholder={`Enter ${node.__TEXT__.label || "Other"}`}
          autoFocus
          onSubmit={(text) => {
            onSave({ pathParts: stack.slice(), value: text });
            onDone();
          }}
        />
      ) : (
        <div className="space-y-2">
          {list.map((item, idx) => {
            const label = isLeafLevel ? (typeof item === "string" ? item : item.label) : item.key;
            return <OptionButton key={idx} label={label} onPick={() => pickItem(item)} />;
          })}
        </div>
      )}
      <div>
        <button className="underline text-xs text-yellow-200/70 rounded-lg px-2 py-1 transition hover:bg-yellow-400/10 hover:shadow-[0_0_12px_rgba(255,215,0,0.35)] hover:text-yellow-200" onClick={onDone}>Cancel</button>
      </div>
    </div>
  );
}

function Track({ entries, setEntries }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [expanded, setExpanded] = useState(new Set());
  const toggle = (id) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const filtered = useMemo(
    () =>
      entries
        .filter((e) => !cat || e.category === cat)
        .filter((e) =>
          q
            ? (
                e.category +
                " " +
                (Array.isArray(e.path) ? e.path.join(" / ") : e.path) +
                " " +
                JSON.stringify(e.value) +
                " " +
                e.timestamp
              )
                .toLowerCase()
                .includes(q.toLowerCase())
            : true,
        )
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    [entries, q, cat],
  );
  const rm = (idx) => {
    const copy = entries.slice();
    copy.splice(idx, 1);
    setEntries(copy);
  };
  const sleepSummary = (v) => {
    if (!v || typeof v !== "object") return "";
    const parts = [v.type, v.duration, v.hadDream];
    if (v.hadDream && v.hadDream !== "None") parts.push(v.dreamType, v.dreamLength);
    return parts.filter(Boolean).join(" • ");
  };
  const genericSummary = (val) => {
    const raw = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
    return raw.replace(/\s+/g, " ").trim();
  };
  const renderExpanded = (e) => {
    const v = e.value;
    if (e.category === "Sleep" && v && typeof v === "object") {
      const rows = [
        ["Sleep", v.type],
        ["Duration", v.duration],
        ["Had Dream", v.hadDream],
        ...(v.hadDream && v.hadDream !== "None" ? [["Dream Type", v.dreamType], ["Dream Length", v.dreamLength]] : []),
      ];
      return (
        <div className="mt-2 text-sm space-y-1">
          {rows.map(([k, val]) => (
            <div key={k} className="grid grid-cols-2 gap-2">
              <div className="text-yellow-200/80">{k}:</div>
              <div className="font-medium break-words">{val || "—"}</div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="mt-2 text-sm break-words">
        <span className="text-yellow-200/80">Value:</span>{" "}
        <span className="font-medium">{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
      </div>
    );
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <input
          className={`${inputClass} flex-1`}
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className={`${inputClass}`} value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.id}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            className={`${buttonClass} px-3`}
            onClick={() => download(`track_${new Date().toISOString().slice(0, 10)}.csv`, toCSVWide(filtered))}
          >
            Export
          </button>
          <button
            className={`${buttonClass} px-3 ${filtered.length ? '' : 'opacity-40 cursor-not-allowed'}`}
            disabled={!filtered.length}
            onClick={() => {
              if (!filtered.length) return;
              if (!confirm(`Delete ${filtered.length} filtered entr${filtered.length === 1 ? 'y' : 'ies'}? This cannot be undone.`)) return;
              const ids = new Set(filtered.map((e) => e.id));
              setEntries(entries.filter((e) => !ids.has(e.id)));
              setExpanded(new Set());
            }}
          >
            Delete filtered
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.length === 0 && <div className="text-sm text-yellow-200/70">No entries yet.</div>}
        {filtered.map((e, i) => {
          const isOpen = expanded.has(e.id);
          const summary = e.category === "Sleep" ? sleepSummary(e.value) : genericSummary(e.value);
          return (
            <div
              key={e.id}
              className={`${panelClass} p-3 text-left cursor-pointer select-none`}
              onClick={() => toggle(e.id)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="text-[11px] text-yellow-200/70 whitespace-nowrap">{new Date(e.timestamp).toLocaleString()}</div>
                <div className="text-yellow-200/40">•</div>
                <div className="font-medium whitespace-nowrap">{e.category}</div>
                <div className="text-yellow-200/40">•</div>
                <div className="text-xs text-yellow-100/80 whitespace-nowrap">{Array.isArray(e.path) ? e.path.join(" / ") : e.path}</div>
              </div>
              <div className={`mt-1 ${isOpen ? "whitespace-normal break-words" : "whitespace-nowrap overflow-hidden text-ellipsis"}`}>
                {summary || "—"}
              </div>
              {isOpen && renderExpanded(e)}
              <div className="pt-2 text-right">
                <button
                  className="underline text-xs"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    rm(i);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Journal({ journal, setJournal }) {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(new Set());
  const toggle = (id) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const add = () => {
    const t = text.trim();
    if (!t) return;
    setJournal([{ id: crypto.randomUUID(), timestamp: nowISO(), text: t }, ...journal]);
    setText("");
  };
  const rm = (id) => setJournal(journal.filter((j) => j.id !== id));
  const exportCSV = () => {
    const header = '"timestamp","text"';
    const body = journal.map((j) => '"' + j.timestamp + '","' + j.text.replace(/"/g, '""') + '"').join("\n");
    download(`journal_${new Date().toISOString().slice(0, 10)}.csv`, header + "\n" + body);
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <input
          className={`${inputClass} flex-1`}
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <>
          <button className={`${buttonClass} px-3`} onClick={add}>Add</button>
          <button className={`${buttonClass} px-3`} onClick={exportCSV}>Export</button>
        </>
      </div>
      <div className="space-y-2">
        {journal.length === 0 && <div className="text-sm text-yellow-200/70">No entries yet.</div>}
        {journal.map((j) => {
          const isOpen = expanded.has(j.id);
          const firstLine = j.text.split(/\n/)[0];
          return (
            <div
              key={j.id}
              className={`${panelClass} p-3 text-left cursor-pointer select-none`}
              onClick={() => toggle(j.id)}
            >
              <div className="text-[11px] text-yellow-200/70">{new Date(j.timestamp).toLocaleString()}</div>
              <div className={isOpen ? "whitespace-pre-wrap break-words" : "whitespace-nowrap overflow-hidden text-ellipsis"}>
                {isOpen ? j.text : firstLine}
              </div>
              <div className="pt-2 text-right">
                <button
                  className="text-xs underline"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    rm(j.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Flags({ entries }) {
  const byDay = new Map();
  for (const e of entries) {
    const day = e.timestamp.slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day).push(e);
  }
  const rows = [];
  for (const [day, list] of byDay.entries()) {
    const foods = list.filter((e) => e.category === "Food");
    const moods = list.filter((e) => e.category === "Mood");
    rows.push({ day, foods: foods.length, moods: moods.length });
  }
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className={`${panelClass} w-full text-left text-sm`}>
          <thead>
            <tr className="border-b border-yellow-400/20">
              <th className="py-2 px-3">Day</th>
              <th className="py-2 px-3">Food entries</th>
              <th className="py-2 px-3">Mood entries</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .sort((a, b) => (a.day < b.day ? 1 : -1))
              .map((r) => (
                <tr key={r.day} className="border-b border-yellow-400/10">
                  <td className="py-2 px-3">{r.day}</td>
                  <td className="py-2 px-3">{r.foods}</td>
                  <td className="py-2 px-3">{r.moods}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("Dashboard");
  const [entries, setEntries] = useLocalStorage(LS_KEYS.entries, []);
  const [journal, setJournal] = useLocalStorage(LS_KEYS.journal, []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [drilling, setDrilling] = useState(false);
  const { show, el: toastEl } = useToast();
  useEffect(() => {
    try {
      const iconKeys = ["Food", "Sleep", "Mood", "Energy", "Activity", "Symptoms", "HeartHealth", "Intimacy", "Dashboard", "Track", "Journal", "Flags"];
      iconKeys.forEach((k) => { console.assert(typeof icons[k] === "function", `Icon missing or not a function: ${k}`); });
      CATEGORIES.forEach((c) => { console.assert(c.id && icons[c.id] && c.icon, `Bad category config: ${c.id}`); console.assert(Array.isArray(c.nodes) || typeof c.nodes === "object", `Category nodes must be array or object: ${c.id}`); });
      const leaf = drillChildren(["A", { label: "Other", input: "text" }]);
      console.assert(leaf.isLeafLevel && leaf.list.length === 2, "drillChildren leaf failed");
      const branch = drillChildren({ X: ["Y"] });
      console.assert(!branch.isLeafLevel && branch.list.length === 1, "drillChildren branch failed");
      const csv = toCSVWide([{ timestamp: "2025-01-01T00:00:00Z", category: "Sleep", path: ["Night"], value: { type: "LastNight", duration: "4h", hadDream: "Real", dreamType: "Normal" } }]);
      console.assert(csv.startsWith('"timestamp","category","subcategory","option","Duration","HadDream","DreamType","Amount"'), "toCSVWide header missing");
      console.assert(csv.split("\n").length === 2, "toCSVWide should have 2 lines");
      const hh = CATEGORIES.find((c) => c.id === "HeartHealth");
      const palp = Array.isArray(hh?.nodes) ? hh.nodes.find((n) => n?.label === "Palpitations") : null;
      console.assert(palp && palp.next && Array.isArray(palp.next.options), "Palpitations missing nested options");
      console.assert(palp.next.options.includes("One") && palp.next.options.includes("A Few") && palp.next.options.includes("Many"), "Nested options incomplete");
      console.assert(typeof download === "function", "download() not defined");
      console.assert(typeof OptionButton === "function", "OptionButton not defined");
    } catch (e) {
      console.error("Self-tests failed:", e);
    }
  }, []);
  function useToast() {
    const [msg, setMsg] = useState(null);
    const timer = useRef(null);
    const show = (text) => {
      setMsg(text);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 1200);
    };
    const el = (
      <div
        className={`fixed left-1/2 -translate-x-1/2 bottom-24 px-4 py-2 rounded-2xl shadow-lg text-sm bg-yellow-500/20 text-yellow-200 border border-yellow-400/30 ${msg ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        role="status"
        aria-live="polite"
      >
        {msg}
      </div>
    );
    return { show, el };
  }
  function saveEntry(category, pathParts, value) {
    const e = { id: crypto.randomUUID(), timestamp: nowISO(), category, path: Array.isArray(pathParts) ? pathParts : pathParts ? [pathParts] : [], value };
    setEntries([e, ...entries]);
    show("Saved");
  }
  return (
    <div className={shellClass}>
      <div className={containerClass}>
        <h1 className="text-3xl font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.25)] mb-6">Daily Activity Tracker</h1>
        <main className="space-y-6">
          {tab === "Dashboard" && !drilling && (
            <Dashboard
              onPickCategory={(c) => {
                setActiveCategory(c);
                setDrilling(true);
              }}
            />
          )}
          {tab === "Dashboard" && drilling && activeCategory && (
            <Drilldown
              category={activeCategory}
              onDone={() => {
                setDrilling(false);
                setActiveCategory(null);
              }}
              onSave={({ pathParts, value }) => {
                const pp = Array.isArray(pathParts) ? pathParts : [];
                saveEntry(activeCategory.id, pp, value);
              }}
            />
          )}
          {tab === "Track" && <Track entries={entries} setEntries={setEntries} />}
          {tab === "Journal" && <Journal journal={journal} setJournal={setJournal} />}
          {tab === "Flags" && <Flags entries={entries} />}
        </main>
        <footer className="pt-8 text-center text-[11px] text-yellow-200/60">Offline-first • LocalStorage only</footer>
      </div>
      <nav className="fixed z-50 bottom-0 left-0 right-0 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 bg-black/70 backdrop-blur border-t border-yellow-400/20">
        <div className="max-w-md mx-auto px-4 grid grid-cols-4 gap-2">
          {[
            { id: "Dashboard", icon: icons.Dashboard },
            { id: "Track", icon: icons.Track },
            { id: "Journal", icon: icons.Journal },
            { id: "Flags", icon: icons.Flags },
          ].map((t) => (
            <button
              key={t.id}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl ${tab === t.id ? "bg-yellow-400/10 border border-yellow-400/30" : ""}`}
              onClick={() => {
                setTab(t.id);
                setDrilling(false);
                setActiveCategory(null);
              }}
            >
              <div className={`${goldText}`}>{t.icon({ size: 22 })}</div>
              <span className="text-[11px] tracking-wide">{t.id}</span>
            </button>
          ))}
        </div>
      </nav>
      {toastEl}
    </div>
  );
}
