import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import useCodeSubmit from "./hooks/useCodeSubmit";
import mirrorLogo from "./assets/logo.svg";

const ALL_LANGUAGES = [
  { id: 45, name: "Assembly (NASM 2.14.02)", monacoLang: "plaintext" },
  { id: 46, name: "Bash (5.0.0)", monacoLang: "shell" },
  { id: 47, name: "Basic (FBC 1.07.1)", monacoLang: "plaintext" },
  { id: 104, name: "C (Clang 18.1.8)", monacoLang: "c" },
  { id: 110, name: "C (Clang 19.1.7)", monacoLang: "c" },
  { id: 75, name: "C (Clang 7.0.1)", monacoLang: "c" },
  { id: 103, name: "C (GCC 14.1.0)", monacoLang: "c" },
  { id: 48, name: "C (GCC 7.4.0)", monacoLang: "c" },
  { id: 49, name: "C (GCC 8.3.0)", monacoLang: "c" },
  { id: 50, name: "C (GCC 9.2.0)", monacoLang: "c" },
  { id: 76, name: "C++ (Clang 7.0.1)", monacoLang: "cpp" },
  { id: 105, name: "C++ (GCC 14.1.0)", monacoLang: "cpp" },
  { id: 52, name: "C++ (GCC 7.4.0)", monacoLang: "cpp" },
  { id: 53, name: "C++ (GCC 8.3.0)", monacoLang: "cpp" },
  { id: 54, name: "C++ (GCC 9.2.0)", monacoLang: "cpp" },
  { id: 86, name: "Clojure (1.10.1)", monacoLang: "clojure" },
  { id: 51, name: "C# (Mono 6.6.0.161)", monacoLang: "csharp" },
  { id: 77, name: "COBOL (GnuCOBOL 2.2)", monacoLang: "plaintext" },
  { id: 55, name: "Common Lisp (SBCL 2.0.0)", monacoLang: "plaintext" },
  { id: 90, name: "Dart (2.19.2)", monacoLang: "dart" },
  { id: 56, name: "D (DMD 2.089.1)", monacoLang: "plaintext" },
  { id: 57, name: "Elixir (1.9.4)", monacoLang: "plaintext" },
  { id: 58, name: "Erlang (OTP 22.2)", monacoLang: "plaintext" },
  { id: 87, name: "F# (.NET Core SDK 3.1.202)", monacoLang: "fsharp" },
  { id: 59, name: "Fortran (GFortran 9.2.0)", monacoLang: "plaintext" },
  { id: 60, name: "Go (1.13.5)", monacoLang: "go" },
  { id: 95, name: "Go (1.18.5)", monacoLang: "go" },
  { id: 106, name: "Go (1.22.0)", monacoLang: "go" },
  { id: 107, name: "Go (1.23.5)", monacoLang: "go" },
  { id: 88, name: "Groovy (3.0.3)", monacoLang: "plaintext" },
  { id: 61, name: "Haskell (GHC 8.8.1)", monacoLang: "plaintext" },
  { id: 91, name: "Java (JDK 17.0.6)", monacoLang: "java" },
  { id: 96, name: "JavaFX (JDK 17.0.6)", monacoLang: "java" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", monacoLang: "java" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)", monacoLang: "javascript" },
  { id: 93, name: "JavaScript (Node.js 18.15.0)", monacoLang: "javascript" },
  { id: 97, name: "JavaScript (Node.js 20.17.0)", monacoLang: "javascript" },
  { id: 102, name: "JavaScript (Node.js 22.08.0)", monacoLang: "javascript" },
  { id: 78, name: "Kotlin (1.3.70)", monacoLang: "kotlin" },
  { id: 111, name: "Kotlin (2.1.10)", monacoLang: "kotlin" },
  { id: 64, name: "Lua (5.3.5)", monacoLang: "lua" },
  { id: 79, name: "Objective-C (Clang 7.0.1)", monacoLang: "objective-c" },
  { id: 65, name: "OCaml (4.09.0)", monacoLang: "plaintext" },
  { id: 66, name: "Octave (5.1.0)", monacoLang: "plaintext" },
  { id: 67, name: "Pascal (FPC 3.0.4)", monacoLang: "pascal" },
  { id: 85, name: "Perl (5.28.1)", monacoLang: "perl" },
  { id: 68, name: "PHP (7.4.1)", monacoLang: "php" },
  { id: 98, name: "PHP (8.3.11)", monacoLang: "php" },
  { id: 43, name: "Plain Text", monacoLang: "plaintext" },
  { id: 69, name: "Prolog (GNU Prolog 1.4.5)", monacoLang: "plaintext" },
  { id: 70, name: "Python (2.7.17)", monacoLang: "python" },
  { id: 71, name: "Python (3.8.1)", monacoLang: "python" },
  { id: 92, name: "Python (3.11.2)", monacoLang: "python" },
  { id: 100, name: "Python (3.12.5)", monacoLang: "python" },
  { id: 109, name: "Python (3.13.2)", monacoLang: "python" },
  { id: 113, name: "Python (3.14.0)", monacoLang: "python" },
  { id: 80, name: "R (4.0.0)", monacoLang: "r" },
  { id: 99, name: "R (4.4.1)", monacoLang: "r" },
  { id: 72, name: "Ruby (2.7.0)", monacoLang: "ruby" },
  { id: 73, name: "Rust (1.40.0)", monacoLang: "rust" },
  { id: 108, name: "Rust (1.85.0)", monacoLang: "rust" },
  { id: 81, name: "Scala (2.13.2)", monacoLang: "scala" },
  { id: 112, name: "Scala (3.4.2)", monacoLang: "scala" },
  { id: 82, name: "SQL (SQLite 3.27.2)", monacoLang: "sql" },
  { id: 83, name: "Swift (5.2.3)", monacoLang: "swift" },
  { id: 74, name: "TypeScript (3.7.4)", monacoLang: "typescript" },
  { id: 94, name: "TypeScript (5.0.3)", monacoLang: "typescript" },
  { id: 101, name: "TypeScript (5.6.2)", monacoLang: "typescript" },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    monacoLang: "plaintext",
  },
];

const LANG_GROUPS = [
  {
    label: "C",
    icon: "C",
    color: "#38bdf8",
    ext: "main.c",
    defaultId: 103,
    versions: ALL_LANGUAGES.filter((l) => /^C \(/.test(l.name)),
  },
  {
    label: "C++",
    icon: "C++",
    color: "#f472b6",
    ext: "main.cpp",
    defaultId: 105,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("C++ (")),
  },
  {
    label: "C#",
    icon: "C#",
    color: "#a78bfa",
    ext: "main.cs",
    defaultId: 51,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("C# (")),
  },
  {
    label: "Python",
    icon: "Py",
    color: "#facc15",
    ext: "main.py",
    defaultId: 109,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Python (")),
  },
  {
    label: "JS",
    icon: "JS",
    color: "#fb923c",
    ext: "main.js",
    defaultId: 102,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("JavaScript (")),
  },
  {
    label: "TS",
    icon: "TS",
    color: "#60a5fa",
    ext: "main.ts",
    defaultId: 101,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("TypeScript (")),
  },
  {
    label: "Java",
    icon: "Jv",
    color: "#f87171",
    ext: "Main.java",
    defaultId: 91,
    versions: ALL_LANGUAGES.filter(
      (l) => l.name.startsWith("Java (") || l.name.startsWith("JavaFX ("),
    ),
  },
  {
    label: "Go",
    icon: "Go",
    color: "#34d399",
    ext: "main.go",
    defaultId: 107,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Go (")),
  },
  {
    label: "Rust",
    icon: "Rs",
    color: "#fb7185",
    ext: "main.rs",
    defaultId: 108,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Rust (")),
  },
  {
    label: "R",
    icon: "R",
    color: "#4ade80",
    ext: "main.r",
    defaultId: 99,
    versions: ALL_LANGUAGES.filter((l) => /^R \(/.test(l.name)),
  },
  {
    label: "PHP",
    icon: "PHP",
    color: "#94a3b8",
    ext: "main.php",
    defaultId: 98,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("PHP (")),
  },
  {
    label: "Kotlin",
    icon: "Kt",
    color: "#c084fc",
    ext: "main.kt",
    defaultId: 111,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Kotlin (")),
  },
  {
    label: "Scala",
    icon: "Sc",
    color: "#fca5a5",
    ext: "main.scala",
    defaultId: 112,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Scala (")),
  },
  {
    label: "Ruby",
    icon: "Rb",
    color: "#f43f5e",
    ext: "main.rb",
    defaultId: 72,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Ruby (")),
  },
  {
    label: "Swift",
    icon: "Sw",
    color: "#fdba74",
    ext: "main.swift",
    defaultId: 83,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Swift (")),
  },
  {
    label: "Bash",
    icon: "Sh",
    color: "#86efac",
    ext: "main.sh",
    defaultId: 46,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Bash (")),
  },
  {
    label: "SQL",
    icon: "SQL",
    color: "#5eead4",
    ext: "main.sql",
    defaultId: 82,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("SQL (")),
  },
  {
    label: "Dart",
    icon: "Dt",
    color: "#67e8f9",
    ext: "main.dart",
    defaultId: 90,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Dart (")),
  },
  {
    label: "Lua",
    icon: "Lua",
    color: "#93c5fd",
    ext: "main.lua",
    defaultId: 64,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Lua (")),
  },
  {
    label: "Haskell",
    icon: "Hs",
    color: "#d8b4fe",
    ext: "main.hs",
    defaultId: 61,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Haskell (")),
  },
  {
    label: "OCaml",
    icon: "ML",
    color: "#fcd34d",
    ext: "main.ml",
    defaultId: 65,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("OCaml (")),
  },
  {
    label: "Perl",
    icon: "Pl",
    color: "#a3a3a3",
    ext: "main.pl",
    defaultId: 85,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Perl (")),
  },
  {
    label: "F#",
    icon: "F#",
    color: "#22d3ee",
    ext: "main.fs",
    defaultId: 87,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("F# (")),
  },
  {
    label: "Clojure",
    icon: "Clj",
    color: "#6ee7b7",
    ext: "main.clj",
    defaultId: 86,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Clojure (")),
  },
  {
    label: "Groovy",
    icon: "Gv",
    color: "#fef08a",
    ext: "main.groovy",
    defaultId: 88,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Groovy (")),
  },
  {
    label: "Pascal",
    icon: "Pas",
    color: "#fbbf24",
    ext: "main.pas",
    defaultId: 67,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Pascal (")),
  },
  {
    label: "ObjC",
    icon: "OC",
    color: "#38bdf8",
    ext: "main.m",
    defaultId: 79,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Objective-C (")),
  },
  {
    label: "D",
    icon: "D",
    color: "#fca5a5",
    ext: "main.d",
    defaultId: 56,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("D (")),
  },
  {
    label: "Elixir",
    icon: "Ex",
    color: "#a78bfa",
    ext: "main.ex",
    defaultId: 57,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Elixir (")),
  },
  {
    label: "Erlang",
    icon: "Erl",
    color: "#86efac",
    ext: "main.erl",
    defaultId: 58,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Erlang (")),
  },
  {
    label: "Fortran",
    icon: "For",
    color: "#cbd5e1",
    ext: "main.f90",
    defaultId: 59,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Fortran (")),
  },
  {
    label: "Prolog",
    icon: "Pro",
    color: "#fdba74",
    ext: "main.pl",
    defaultId: 69,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Prolog (")),
  },
  {
    label: "Octave",
    icon: "Oct",
    color: "#67e8f9",
    ext: "main.m",
    defaultId: 66,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Octave (")),
  },
  {
    label: "Asm",
    icon: "Asm",
    color: "#fca5a5",
    ext: "main.asm",
    defaultId: 45,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Assembly (")),
  },
  {
    label: "VB",
    icon: "VB",
    color: "#94a3b8",
    ext: "main.vb",
    defaultId: 84,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Visual Basic")),
  },
  {
    label: "COBOL",
    icon: "Cob",
    color: "#fcd34d",
    ext: "main.cob",
    defaultId: 77,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("COBOL (")),
  },
  {
    label: "Lisp",
    icon: "Lsp",
    color: "#c084fc",
    ext: "main.lisp",
    defaultId: 55,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Common Lisp (")),
  },
  {
    label: "Basic",
    icon: "Bas",
    color: "#86efac",
    ext: "main.bas",
    defaultId: 47,
    versions: ALL_LANGUAGES.filter((l) => l.name.startsWith("Basic (")),
  },
  {
    label: "Text",
    icon: "Txt",
    color: "#475569",
    ext: "main.txt",
    defaultId: 43,
    versions: [ALL_LANGUAGES.find((l) => l.id === 43)],
  },
];

const SNIPPETS = {
  c: '#include <stdio.h>\n\nint main() {\n    printf("chill and code.\\n");\n    return 0;\n}\n',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "chill and code." << endl;\n    return 0;\n}\n',
  csharp:
    'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("chill and code.");\n    }\n}\n',
  python: 'print("chill and code.")\n',
  javascript: 'console.log("chill and code.");\n',
  typescript:
    'const msg: string = "chill and code.";\nconsole.log(msg);\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("chill and code.");\n    }\n}\n',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("chill and code.")\n}\n',
  rust: 'fn main() {\n    println!("chill and code.");\n}\n',
  r: 'cat("chill and code.\\n")\n',
  php: '<?php\necho "chill and code.\\n";\n',
  kotlin: 'fun main() {\n    println("chill and code.")\n}\n',
  scala:
    'object Main extends App {\n    println("chill and code.")\n}\n',
  ruby: 'puts "chill and code."\n',
  swift: 'print("chill and code.")\n',
  shell: '#!/bin/bash\necho "chill and code."\n',
  sql: '-- SQLite\nSELECT "chill and code." AS message;\n',
  dart: 'void main() {\n  print("chill and code.");\n}\n',
  lua: 'print("chill and code.")\n',
  fsharp: 'printfn "chill and code."\n',
  plaintext: "chill and code.\n",
};

const BG = {
  base: "#0a0a0f",
  surface1: "#0f0f17",
  surface2: "#13131c",
  surface3: "#181824",
  border: "#1e1e2e",
  borderHi: "#2a2a3e",
};

function VersionPopover({ group, selectedId, onSelect, onClose, topOffset }) {
  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest("[data-popover]") &&
        !e.target.closest("[data-sidebar-btn]")
      )
        onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      data-popover
      className="fixed z-50 overflow-hidden"
      style={{
        left: "52px",
        top: topOffset,
        minWidth: "260px",
        background: BG.surface3,
        border: `1px solid ${BG.borderHi}`,
        borderLeft: `2px solid ${group.color}`,
        borderRadius: "0 6px 6px 0",
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)`,
      }}
    >
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ borderBottom: `1px solid ${BG.border}` }}
      >
        <span
          className="text-[9px] font-black tracking-[0.25em] uppercase"
          style={{ color: group.color }}
        >
          {group.label}
        </span>
        <span className="text-[9px] tracking-wide" style={{ color: "#3a3a55" }}>
          select version
        </span>
      </div>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "280px", scrollbarWidth: "none" }}
      >
        {group.versions.map((v) => {
          const isActive = selectedId === v.id;
          return (
            <button
              key={v.id}
              onClick={() => {
                onSelect(v);
                onClose();
              }}
              className="w-full text-left px-3 py-1.75 text-[12px] flex items-center justify-between transition-colors"
              style={{
                background: isActive ? `${group.color}12` : "transparent",
                color: isActive ? "#e2e8f0" : "#4a4a6a",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "#8888aa";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "#4a4a6a";
              }}
            >
              <span className="font-mono">{v.name}</span>
              {isActive && (
                <span
                  className="text-[9px] font-bold ml-2 shrink-0"
                  style={{ color: group.color }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TerminalOutput({ loading, error, output }) {
  const hasError = output?.stderr || output?.compile_output;
  return (
    <div className="flex-1 overflow-auto p-5 font-mono text-[14px] leading-relaxed">
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "#2a2a3e" }}>~</span>
        <span style={{ color: "#4a6fa5" }}>$</span>
        <span className="animate-pulse" style={{ color: "#22d3ee" }}>
          _
        </span>
      </div>
      {loading && (
        <div className="flex items-center gap-3" style={{ color: "#3a3a55" }}>
          <span
            className="inline-block w-3 h-3 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#22d3ee", borderTopColor: "transparent" }}
          />
          <span>Running...</span>
        </div>
      )}

      {!loading && error && (
        <pre
          className="whitespace-pre-wrap wrap-break-words text-xs"
          style={{ color: "#f87171" }}
        >
          {`Error: ${error}`}
        </pre>
      )}

      {!loading &&
        output &&
        (output.stdout || output.stderr || output.compile_output ? (
          <pre
            className="whitespace-pre-wrap wrap-break-words text-xs leading-6"
            style={{ color: hasError ? "#f87171" : "#34d399" }}
          >
            {output.stdout}
            {output.stderr}
            {output.compile_output}
          </pre>
        ) : (
          <span className="text-xs italic" style={{ color: "#2a2a45" }}>
            Process exited with no output.
          </span>
        ))}
    </div>
  );
}

export default function App() {
  const editorRef = useRef(null);
  const btnRefs = useRef({});

  const [activeGroup, setActiveGroup] = useState(LANG_GROUPS[0]);
  const [selectedLang, setSelectedLang] = useState(
    ALL_LANGUAGES.find((l) => l.id === LANG_GROUPS[0].defaultId),
  );
  const [popoverGroup, setPopoverGroup] = useState(null);
  const [popoverTop, setPopoverTop] = useState(0);
  const [stdin, setStdin] = useState("");
  const [showStdin, setShowStdin] = useState(false);

  const { output, loading, error, submitCode } = useCodeSubmit();

  const [terminalWidth, setTerminalWidth] = useState(42);
  const isResizing = useRef(false);

  function handleResizerMouseDown(e) {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    function onMouseMove(e) {
      if (!isResizing.current) return;
      const totalWidth = window.innerWidth - 52;
      const newTermWidth = ((window.innerWidth - e.clientX) / totalWidth) * 100;
      setTerminalWidth(Math.min(70, Math.max(20, newTermWidth)));
    }

    function onMouseUp() {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function handleRun() {
    const code = editorRef.current?.getValue() ?? "";
    submitCode(code, selectedLang.id, stdin);
  }

  function handleGroupClick(group) {
    if (group.versions.length === 1) {
      activateGroup(group, group.versions[0]);
      setPopoverGroup(null);
    } else {
      if (popoverGroup?.label === group.label) {
        setPopoverGroup(null);
      } else {
        const btn = btnRefs.current[group.label];
        if (btn) setPopoverTop(btn.getBoundingClientRect().top);
        setPopoverGroup(group);
      }
    }
  }

  function activateGroup(group, lang) {
    setActiveGroup(group);
    setSelectedLang(lang);
    editorRef.current?.setValue(SNIPPETS[lang.monacoLang] ?? "");
  }

  function handleVersionSelect(lang) {
    const group = LANG_GROUPS.find((g) =>
      g.versions.some((v) => v.id === lang.id),
    );
    if (group) activateGroup(group, lang);
  }

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") setPopoverGroup(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div
      className="flex h-screen w-screen overflow-hidden font-mono"
      style={{ background: BG.base }}
    >
      <aside
        className="flex flex-col shrink-0 z-10"
        style={{
          width: "52px",
          background: BG.surface2,
          borderRight: `1px solid ${BG.border}`,
        }}
      >
        <div
          className="h-11 flex items-center justify-center shrink-0"
          style={{ borderBottom: `1px solid ${BG.border}` }}
        >
          <img
            src={mirrorLogo}
            alt="Mirror"
            style={{
              width: "28px",
              height: "28px",
              objectFit: "contain",
              filter: "hue-rotate(10deg) saturate(1.4)",
            }}
          />
        </div>

        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {LANG_GROUPS.map((group) => {
            const isActive = activeGroup.label === group.label;
            return (
              <div key={group.label} className="relative">
                <button
                  ref={(el) => (btnRefs.current[group.label] = el)}
                  data-sidebar-btn
                  onClick={() => handleGroupClick(group)}
                  title={group.label}
                  className="w-full flex flex-col items-center justify-center py-2.5 select-none transition-all duration-100 relative"
                  style={{
                    borderLeft: isActive
                      ? `2px solid ${group.color}`
                      : "2px solid transparent",
                    background: isActive ? `${group.color}0d` : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "#ffffff07";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    className="text-[11px] font-black font-mono leading-none"
                    style={{ color: isActive ? group.color : "#ffffff" }}
                  >
                    {group.icon}
                  </span>
                  {group.versions.length > 1 && (
                    <span
                      className="absolute top-1 right-1 text-[6px] font-bold"
                      style={{ color: isActive ? group.color : "#28283d" }}
                    >
                      {group.versions.length}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </aside>

      {popoverGroup && (
        <VersionPopover
          group={popoverGroup}
          selectedId={selectedLang.id}
          onSelect={handleVersionSelect}
          onClose={() => setPopoverGroup(null)}
          topOffset={popoverTop}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <div
          className="h-9 flex items-center shrink-0"
          style={{
            background: BG.surface3,
            borderBottom: `1px solid ${BG.border}`,
          }}
        >
          <div
            className="flex items-center gap-2 px-4 h-full shrink-0"
            style={{
              background: BG.surface1,
              borderRight: `1px solid ${BG.border}`,
              borderTop: `2px solid ${activeGroup.color}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: activeGroup.color, opacity: 0.8 }}
            />
            <span className="text-[13px]" style={{ color: "#7a7a99" }}>
              {activeGroup.ext}
            </span>
          </div>

          <div className="px-3 flex-1 min-w-0 overflow-hidden flex items-center gap-2">
            <span
              className="text-[12px] px-2 py-0.5 rounded font-mono"
              style={{
                color: activeGroup.color,
                background: `${activeGroup.color}14`,
                border: `1px solid ${activeGroup.color}25`,
              }}
            >
              {selectedLang.name}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 mr-3 shrink-0">
            <button
              onClick={() => setShowStdin((v) => !v)}
              className="text-[13px] px-2.5 py-1 rounded transition-all duration-150 font-mono"
              style={{
                color: showStdin ? "#22d3ee" : "#94a3b8",
                border: `1px solid ${showStdin ? "#22d3ee40" : "#94a3b830"}`,
                background: showStdin ? "#22d3ee0d" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!showStdin) {
                  e.currentTarget.style.color = "#cbd5e1";
                  e.currentTarget.style.borderColor = "#94a3b850";
                }
              }}
              onMouseLeave={(e) => {
                if (!showStdin) {
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.borderColor = "#94a3b830";
                }
              }}
            >
              stdin
            </button>

            <button
              onClick={handleRun}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1 rounded text-[13px] font-bold transition-all duration-150 active:scale-95"
              style={{
                background: loading ? "#1a1a28" : activeGroup.color,
                color: loading ? "#2a2a40" : "#050510",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : `0 0 12px ${activeGroup.color}40`,
              }}
            >
              <span className={loading ? "animate-pulse" : ""}>
                {loading ? "●" : "▶"}
              </span>
              <span>{loading ? "Running" : "Run"}</span>
            </button>
          </div>
        </div>

        {showStdin && (
          <div
            className="px-4 py-2 shrink-0 flex items-center gap-3"
            style={{
              background: BG.surface1,
              borderBottom: `1px solid ${BG.border}`,
            }}
          >
            <span
              className="text-[11px] font-black tracking-[0.25em] uppercase shrink-0"
              style={{ color: activeGroup.color }}
            >
              stdin
            </span>
            <input
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Enter program input…"
              className="flex-1 text-xs px-3 py-1.5 rounded font-mono outline-none transition-colors"
              style={{
                background: BG.surface2,
                color: "#7a7a99",
                border: `1px solid ${BG.border}`,
                caretColor: activeGroup.color,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = `${activeGroup.color}50`)
              }
              onBlur={(e) => (e.currentTarget.style.borderColor = BG.border)}
            />
          </div>
        )}

        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={selectedLang.monacoLang}
            defaultValue={SNIPPETS[selectedLang.monacoLang] ?? ""}
            theme="vs-dark"
            onMount={(editor, monaco) => {
              editorRef.current = editor;

              monaco.editor.defineTheme("mirror", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: {
                  "editor.background": BG.surface1,
                  "editor.lineHighlightBackground": "#ffffff04",
                  "editorLineNumber.foreground": "#1e1e30",
                  "editorLineNumber.activeForeground": "#3a3a55",
                  "editor.selectionBackground": `${activeGroup.color}25`,
                  "editorCursor.foreground": activeGroup.color,
                },
              });
              monaco.editor.setTheme("mirror");
            }}
            options={{
              fontSize: 15,
              fontFamily:
                '"Cascadia Code", "Fira Code", "JetBrains Mono", "Consolas", monospace',
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderLineHighlight: "line",
              padding: { top: 16, bottom: 16 },
              smoothScrolling: true,
              cursorBlinking: "smooth",
              tabSize: 4,
            }}
          />
        </div>
      </div>

      <div
        onMouseDown={handleResizerMouseDown}
        className="shrink-0 flex items-center justify-center group"
        style={{
          width: "5px",
          cursor: "col-resize",
          background: BG.border,
          transition: "background 0.15s",
          position: "relative",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#22d3ee50")}
        onMouseLeave={(e) => (e.currentTarget.style.background = BG.border)}
      >
        <div className="flex flex-col gap-1 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-0.5 rounded-full"
              style={{ background: "#3a3a55" }}
            />
          ))}
        </div>
      </div>

      <div
        className="flex flex-col"
        style={{
          width: `${terminalWidth}%`,
          minWidth: "200px",
          maxWidth: "75vw",
          background: BG.base,
          borderLeft: `1px solid ${BG.border}`,
          flexShrink: 0,
        }}
      >
        <div
          className="h-9 flex items-center px-4 shrink-0"
          style={{
            background: BG.surface3,
            borderBottom: `1px solid ${BG.border}`,
          }}
        >
          <span
            className="text-[13px] font-bold tracking-[0.25em] uppercase"
            style={{ color: "#94a3b8" }}
          >
            Terminal
          </span>

          <div className="ml-auto flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full cursor-pointer transition-all"
                style={{ background: c, opacity: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              />
            ))}
          </div>
        </div>

        <TerminalOutput loading={loading} error={error} output={output} />
      </div>
    </div>
  );
}
