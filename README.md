<div align="center">

```
███╗   ███╗██╗██████╗ ██████╗  ██████╗ ██████╗
████╗ ████║██║██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
██╔████╔██║██║██████╔╝██████╔╝██║   ██║██████╔╝
██║╚██╔╝██║██║██╔══██╗██╔══██╗██║   ██║██╔══██╗
██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╔╝██║  ██║
╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
··················································
╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
▓▓║ ╚═╝ ▓▓║▓▓║▓▓║  ▓▓║▓▓║  ▓▓║╚▓▓▓▓▓▓╔╝▓▓║  ▓▓║
▒▒║╚▒▒╔╝▒▒║▒▒║▒▒╔══▒▒╗▒▒╔══▒▒╗▒▒║   ▒▒║▒▒╔══▒▒╗
▒▒╔▒▒▒▒╔▒▒║▒▒║▒▒▒▒▒▒╔╝▒▒▒▒▒▒╔╝▒▒║   ▒▒║▒▒▒▒▒▒╔╝
░░░░╗ ░░░░║░░║░░╔══░░╗░░╔══░░╗░░╔═══░░╗░░╔══░░╗
░░░╗   ░░░╗░░╗░░░░░░╗ ░░░░░░╗  ░░░░░░╗ ░░░░░░╗
```

### *Reflection of your code.*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Now-4f46e5?style=for-the-badge&logoColor=white)](https://mirror-frontend-lyart.vercel.app/)
[![Backend](https://img.shields.io/badge/⚙️%20Backend-Render-10b981?style=for-the-badge)](https://mirror-backend-ueox.onrender.com)
[![License](https://img.shields.io/badge/📄%20License-MIT-f59e0b?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/🤝%20PRs-Welcome-ec4899?style=for-the-badge)](https://github.com/chandrakant-T/Mirror/pulls)

<br/>

![Mirror Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=120&section=header&text=Online%20Code%20Compiler&fontSize=28&fontColor=ffffff&animation=fadeIn)

</div>

<br/>

> **Mirror** is not just another code runner.
> It's a clean, distraction-free space where your code meets its reflection — instant execution, real feedback, zero friction.
> Built for developers who care about the craft.

<br/>

---

## ⚡ What Makes Mirror Different?

<table>
<tr>
<td width="50%">

### 🧠 VS Code — in your browser
Powered by **Monaco Editor**, the exact engine behind VS Code. Full syntax highlighting, IntelliSense, and a familiar feel — no setup, no install.

</td>
<td width="50%">

### 🌍 50+ Languages. One Platform.
From Python to Rust, C to JavaScript — Mirror speaks your language. Backed by **Judge0 CE**, the industry-standard open-source judge.

</td>
</tr>
<tr>
<td width="50%">

### 🔌 stdin? No Problem.
Test your programs with real input. Mirror supports **custom stdin** so your interactive programs run exactly as they should.

</td>
<td width="50%">

### 🩺 Honest Error Reporting
No more guessing games. Mirror surfaces `stdout`, `stderr`, `compile_output`, and execution metadata — all at once.

</td>
</tr>
</table>

<br/>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| 🎨 **Frontend** | React + Vite | Lightning-fast UI with hot reload |
| ✍️ **Editor** | Monaco Editor | VS Code–grade editing experience |
| 🔗 **HTTP Client** | Axios | Clean API communication |
| ⚙️ **Backend** | Node.js + Express | Lightweight, fast REST API |
| ⚖️ **Compiler** | Judge0 CE API | Sandboxed multi-language execution |
| 🚀 **Frontend Host** | Vercel | Global edge deployment |
| 🐳 **Backend Host** | Render | Always-on backend service |

</div>

<br/>

---

## 📁 Project Structure

```
🪞 Mirror/
│
├── 🗂️  Backend/
│   ├── routes/
│   │   ├── code.js           ─── POST /code/submit
│   │   └── languages.js      ─── GET  /languages
│   ├── .env                  ─── environment config
│   ├── server.js             ─── Express entry point
│   └── package.json
│
└── 🖥️  Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Editor.jsx          ─── Monaco code editor
    │   │   ├── Navbar.jsx          ─── Top navigation
    │   │   ├── LanguageSelector.jsx─── Language dropdown
    │   │   ├── OutputPanel.jsx     ─── Execution results
    │   │   └── StdinPanel.jsx      ─── Custom input panel
    │   ├── hooks/
    │   │   └── useCodeSubmit.js    ─── Submission logic & state
    │   ├── utils/
    │   │   └── api.js              ─── Axios API wrapper
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

<br/>

---

## 🚀 Get It Running Locally

> Make sure you have **Node.js 18+** and **npm** installed.

### Step 1 — Clone

```bash
git clone https://github.com/chandrakant-T/Mirror.git
cd Mirror
```

---

### Step 2 — Backend

```bash
cd Backend
npm install
```

Create your `.env`:

```env
PORT=3000
JUDGE0_URL=https://ce.judge0.com/submissions?base64_encoded=false&wait=true
```

Fire it up:

```bash
npm run shh
```

> 🟢 Backend live at `http://localhost:3000`

---

### Step 3 — Frontend

```bash
cd ../Frontend
npm install
```

Create your `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Start dev server:

```bash
npm run dev
```

> 🟢 Frontend live at `http://localhost:5173`

<br/>

---

## 🔌 API Reference

### `GET /languages`
> Returns all supported language options.

```json
[
  { "id": 63, "name": "JavaScript" },
  { "id": 71, "name": "Python 3"   },
  { "id": 54, "name": "C++"        },
  { "id": 50, "name": "C"          },
  { "id": 62, "name": "Java"       }
]
```

---

### `POST /code/submit`
> Submits source code for sandboxed execution.

**Request**
```json
{
  "source_code": "print('Hello, Mirror!')",
  "language_id": 71,
  "stdin": ""
}
```

**Response**
```json
{
  "stdout":         "Hello, Mirror!\n",
  "stderr":          null,
  "compile_output":  null,
  "status": {
    "id":          3,
    "description": "Accepted"
  },
  "time":   "0.021",
  "memory":  7920
}
```

<br/>

---

## 🗺️ Roadmap

```
 ✅  Monaco Editor integration
 ✅  Judge0 CE execution engine
 ✅  Custom stdin support
 ✅  stderr + compile error surfacing
 ✅  Deployed on Vercel + Render

 🔜  Self-hosted Judge0 on Oracle Cloud VPS (bye rate limits)
 🔜  User authentication + code history
 🔜  Rate limiting & abuse protection
 🔜  Full IntelliSense via language servers
 🔜  Collaborative real-time editing (multiplayer!)
 🔜  Shareable code snippets via URL
```

<br/>

---

## 🚢 Deployment

| What | Where | Why |
|:---|:---:|:---|
| Frontend | **Vercel** | Instant global CDN, zero-config deploys |
| Backend | **Render** | Free tier, always-on services |
| Compiler | **Judge0 CE** → Oracle Cloud VPS *(planned)* | Remove rate limits, full control |

<br/>

---

## 👥 The Team

<table>
<tr>
<td align="center" width="50%">
  <b>Chandrakant Trivedi</b><br/>
  Backend & Integration<br/>
  <a href="https://github.com/chandrakant-T">@chandrakant-T</a>
</td>
<td align="center" width="50%">
  <b>Tejsavi Kamboj</b><br/>
  Frontend & UI Design<br/>
  ✨ Made it look this good
</td>
</tr>
</table>

<br/>

---

## 🤝 Contributing

Got an idea? Found a bug? PRs are warmly welcome.

```bash
# 1. Fork it
# 2. Create your feature branch
git checkout -b feature/something-cool

# 3. Commit your changes
git commit -m "feat: add something cool"

# 4. Push and open a PR
git push origin feature/something-cool
```

<br/>

---

## 📄 License

**Mirror** is open source under the [MIT License](LICENSE). Use it, fork it, build on it.

<br/>

---

<div align="center">

```
If your code is wrong, Mirror will tell you.
If your code is right, Mirror will show you.
```

**Made with 🖤 by Chandrakant & Tejsavi**

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=100&section=footer)

</div>
