// Stable offline paged quiz (50 items)
// - No scrolling (fixed viewport)
// - Debounced buttons (prevents double-trigger)
// - Case-insensitive + space-insensitive + punctuation-lite checking
// - Wrong: must type correct answer to proceed OR Skip (counts wrong)

const RAW = [
  { id: 1, q: "The part of a computing system that manages all hardware and software.", a: ["Operating System", "OS"] },
  { id: 2, q: "The component of a computer system that refers to the physical machine and its electronic parts.", a: ["Hardware"] },
  { id: 3, q: "The component of a computer system that consists of programs.", a: ["Software"] },
  { id: 4, q: "The operating system manager responsible for controlling main memory (RAM).", a: ["Memory Manager"] },
  { id: 5, q: "The operating system manager that decides how the CPU is allocated.", a: ["Processor Manager"] },
  { id: 6, q: "The operating system manager that keeps track of files and enforces access restrictions.", a: ["File Manager"] },
  { id: 7, q: "The operating system manager that monitors devices such as printers, disks, and terminals.", a: ["Device Manager"] },
  { id: 8, q: "The manager found only in operating systems with networking capability.", a: ["Network Manager"] },
  { id: 9, q: "The operating system component that is unique to each operating system and allows users to interact with the system.", a: ["User Command Interface", "Command Interface"] },
  { id: 10, q: "The task performed by subsystem managers that involves continuously watching system resources.", a: ["Monitor resources", "Monitor its resources continuously", "Monitoring resources"] },
  { id: 11, q: "The task that determines who gets what resources, when, and how much.", a: ["Enforce policies", "Enforce the policies"] },
  { id: 12, q: "The task of reclaiming a resource when it is no longer needed.", a: ["Deallocate", "Deallocate the resource", "Deallocation"] },
  { id: 13, q: "The manager responsible for preserving the memory space occupied by the operating system.", a: ["Memory Manager"] },
  { id: 14, q: "The table created to track which user is using which section of memory in a multiuser environment.", a: ["Memory allocation table", "Allocation table", "Memory table"] },
  { id: 15, q: "The scheduler that handles jobs as they enter the system.", a: ["Job Scheduler"] },
  { id: 16, q: "The scheduler that manages individual processes within jobs.", a: ["Process Scheduler"] },
  { id: 17, q: "The operating system manager that selects the most efficient way to allocate devices.", a: ["Device Manager"] },
  { id: 18, q: "The action performed by the File Manager when a file is accessed.", a: ["Open", "Open the file", "Opening the file"] },
  { id: 19, q: "The action performed by the File Manager when a file is released.", a: ["Close", "Close the file", "Closing the file"] },
  { id: 20, q: "The essential hardware component that performs calculations and processing.", a: ["CPU", "Central Processing Unit"] },
  { id: 21, q: "A large computer used in the past that required an air-conditioned room and had high cost.", a: ["Mainframe", "Mainframe computer"] },
  { id: 22, q: "A computer developed to meet the needs of smaller institutions and was cheaper than mainframes.", a: ["Minicomputer", "Mini computer"] },
  { id: 23, q: "A computer system introduced for military operations and weather forecasting.", a: ["Supercomputer", "Super computer"] },
  { id: 24, q: "A computer developed for single users in the late 1970s.", a: ["Microcomputer", "Micro computer"] },
  { id: 25, q: "The distinguishing characteristic of a microcomputer.", a: ["Single-user status", "Single user", "Single-user"] },
  { id: 26, q: "The most powerful type of microcomputer used for engineering and technical applications.", a: ["Workstation", "Workstations"] },
  { id: 27, q: "The law stating that computing power rises exponentially over time.", a: ["Moore's Law", "Moores Law"] },
  { id: 28, q: "The classification factor used for modern computers instead of memory capacity.", a: ["Processor capacity"] },
  { id: 29, q: "The type of operating system that relied on punched cards or tape for input.", a: ["Batch", "Batch system", "Batch systems"] },
  { id: 30, q: "The measurement used to determine the efficiency of batch systems.", a: ["Throughput"] },
  { id: 31, q: "The type of operating system that provides faster turnaround than batch systems.", a: ["Interactive", "Interactive system", "Interactive systems"] },
  { id: 32, q: "The fastest operating system type used in time-critical environments.", a: ["Real-time", "Real-time system", "Real time system"] },
  { id: 33, q: "A requirement stating that a system must be 100 percent responsive at all times.", a: ["100 percent responsive", "100% responsive"] },
  { id: 34, q: "The operating system type that combines batch and interactive processing.", a: ["Hybrid", "Hybrid system", "Hybrid systems"] },
  { id: 35, q: "The operating system type used inside other products to add features and capabilities.", a: ["Embedded", "Embedded system", "Embedded systems"] },
  { id: 36, q: "The decade when computers had no standard operating system software.", a: ["1940s"] },
  { id: 37, q: "The technology used in computers during the 1940s.", a: ["Vacuum tubes", "Vacuum tube technology"] },
  { id: 38, q: "The concept introduced in the 1950s that grouped programs with similar requirements.", a: ["Job scheduling"] },
  { id: 39, q: "The technique introduced between I/O and the CPU to reduce discrepancy in speed.", a: ["Buffer", "Buffering"] },
  { id: 40, q: "The concept introduced in the 1960s that allowed multiple programs to be loaded at once.", a: ["Multiprogramming"] },
  { id: 41, q: "The memory solution developed in the 1970s to overcome physical memory limitations.", a: ["Virtual memory"] },
  { id: 42, q: "The computing feature introduced in the 1980s that allowed executing programs in parallel.", a: ["Multiprocessing"] },
  { id: 43, q: "The 1990s demand that sparked the proliferation of networking capability.", a: ["Internet capability", "Internet"] },
  { id: 44, q: "A primary design feature of modern operating systems that supports online connectivity.", a: ["Internet and Web access", "Web access", "Internet access"] },
  { id: 45, q: "The software design approach that allows modifying parts of an operating system without disrupting the whole.", a: ["Object-oriented design", "Object oriented design", "OOP"] },
  { id: 46, q: "The modernization trend where the operating system kernel is reorganized and limited to essential functions.", a: ["Kernel reorganization", "Reorganized kernel", "Small kernel"] },
  { id: 47, q: "A portion of a program that can run independently of other portions.", a: ["Thread", "Threads"] },
  { id: 48, q: "The multiprocessing configuration where all CPUs are equal and share memory and I/O under one OS.", a: ["Symmetric multiprocessing", "SMP"] },
  { id: 49, q: "The multiprocessing configuration where one master CPU controls the system and others do specific tasks.", a: ["Asymmetric multiprocessing", "AMP"] },
  { id: 50, q: "A computing model where multiple independent computers (nodes) work together over a network.", a: ["Distributed processing"] }
];

// Randomize each load
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Normalize: lower, remove spaces, remove most punctuation
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[“”‘’]/g, "'")
    .replace(/[^a-z0-9%']/g, "");
}

const Q = shuffle(RAW);

let idx = 0;
let score = 0;
let lock = false;

// log entries: {id, question, userAnswer, correctAnswer, status}
const log = [];

const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const qText = document.getElementById("qText");
const ans = document.getElementById("answer");
const fb = document.getElementById("feedback");
const mini = document.getElementById("mini");
const skipBtn = document.getElementById("skip");
const checkBtn = document.getElementById("check");

const res = document.getElementById("result");
const scoreEl = document.getElementById("score");
const review = document.getElementById("review");

qTotal.textContent = Q.length;

function setFeedback(kind, html) {
  fb.classList.remove("hidden", "ok", "bad");
  fb.classList.add(kind);
  fb.innerHTML = html;
}
function clearFeedback() {
  fb.classList.add("hidden");
  fb.classList.remove("ok", "bad");
  fb.innerHTML = "";
}

function isCorrect(user, accepted) {
  const u = norm(user);
  if (!u) return false;
  return accepted.map(norm).includes(u);
}

function render() {
  lock = false;
  clearFeedback();
  ans.value = "";
  qNum.textContent = String(idx + 1);
  qText.textContent = Q[idx].q;
  mini.textContent = `Correct so far: ${score}/${Q.length}`;
  setTimeout(() => ans.focus(), 0);
}

function next() {
  idx++;
  if (idx < Q.length) {
    render();
  } else {
    finish();
  }
}

function record(status, userAnswer) {
  log.push({
    id: Q[idx].id,
    question: Q[idx].q,
    userAnswer: userAnswer || "",
    correctAnswer: Q[idx].a[0],
    status
  });
}

checkBtn.addEventListener("click", () => {
  if (lock) return;
  lock = true;

  const user = ans.value;
  const ok = isCorrect(user, Q[idx].a);

  if (ok) {
    score++;
    record("Correct", user);
    next();
  } else {
    setFeedback("bad", `Wrong. <b>Correct answer:</b> ${Q[idx].a[0]}<br>Type the correct answer to continue, or click <b>Skip</b>.`);
    lock = false;
  }
});

skipBtn.addEventListener("click", () => {
  if (lock) return;
  lock = true;
  record("Wrong / Skipped", ans.value);
  next();
});

// Enter key = Check
ans.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkBtn.click();
  }
});

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function finish() {
  res.classList.remove("hidden");
  scoreEl.textContent = `Score: ${score} / ${Q.length}`;

  review.innerHTML = "";
  log.forEach((r, i) => {
    const ok = r.status === "Correct";
    const div = document.createElement("div");
    div.className = "review-item " + (ok ? "ok" : "bad");
    div.innerHTML = `
      <div><b>${i + 1}.</b> ${esc(r.question)}</div>
      <p><b>Your answer:</b> ${r.userAnswer ? esc(r.userAnswer) : "<i>(blank)</i>"}</p>
      <p><b>Correct answer:</b> ${esc(r.correctAnswer)}</p>
      <p><b>Status:</b> ${esc(r.status)}</p>
    `;
    review.appendChild(div);
  });
}

// start
render();
