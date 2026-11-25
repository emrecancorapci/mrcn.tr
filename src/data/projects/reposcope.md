---
featured: true
title: "Reposcope"
description: "A desktop app + CLI that turns git status, dependency freshness, and health findings across every local repository into one live screen, updated from filesystem events."
projectType: oss
year: 2026
status: "ongoing"
version: "0.1.0"
mainTags: ["rust", "tauri", "desktop"]
blocks:
  [
    {
      title: "Key Capabilities",
      type: "list",
      onTop: true,
      content:
        [
          "Live git status across all repositories, driven by filesystem events instead of polling",
          "Git actions in one place: pull, push, sync, branch switching",
          "Dependency freshness read directly from manifests (npm, Cargo)",
          "Health findings (hygiene, leaked secrets, security advisories) at info, warning, and error severities",
          "Colored tags, layered notes, and project folder restructuring",
          "Environment checks: installed runtimes vs each project's pinned versions",
          "One shared Rust core powering both the desktop app and the CLI",
        ],
    },
    {
      title: "Stack",
      type: "records",
      onTop: false,
      content:
        [
          ["App shell", "Tauri 2 (Rust backend + system webview)"],
          ["Frontend", "React + TypeScript + Tailwind CSS v4 + shadcn/ui"],
          ["Domain logic", "crates/core (zero Tauri dependencies, shared with the CLI)"],
          ["Local state", "SQLite (rusqlite)"],
        ],
    },
    {
      title: "Tags",
      type: "tags",
      onTop: false,
      content:
        [
          "rust",
          "tauri",
          "desktop-app",
          "event-driven",
          "filesystem-watching",
          "git",
          "sqlite",
          "cli",
          "developer-tools",
        ],
    },
  ]
---

I juggle a lot of local projects, and the routine was always the same: open a folder, run `git status`, glance at the lockfile, wonder whether that `.env` ever got committed, move to the next folder, repeat. Nothing about that loop is hard, but it repeats ten times a day across twenty folders. Reposcope came from wanting one screen that answers a single question: **which of my projects need attention right now?**

For the shell I picked Tauri 2 over Electron. The dashboard is a long-running desktop app, so binary size and memory matter, and the system webview means the UI feels native instead of shipping a browser per user. The more interesting decision is `crates/core`: all the domain logic (scanning, git, dependencies, health, tags, notes, watching, storage) lives there with zero Tauri dependencies. The desktop app is one frontend over that crate, and a CLI (`po`) is the second. Two interfaces share one implementation, so no git or dependency logic is duplicated.

One principle I refused to compromise on: **the app never polls for git status.** A timer-based dashboard always shows you the past. Instead, a filesystem watcher (the `notify` crate) with debouncing notices the moment anything changes on disk. Affected repos refresh, and the backend pushes Tauri events that the UI subscribes to:

```
filesystem event → debounce → refresh → Tauri event → UI
```

The UI never polls the backend either, and the same rule applies end to end. Status reads land around 0.37 ms per repo on a 100-repo benchmark, because the dashboard reads only what changed instead of re-reading everything on a timer.

Dependency checking reads manifest files directly (`package.json`, `Cargo.toml`) behind one trait per ecosystem. The split is deliberate: parsing stays offline, and freshness checks stay opt-in:

```rust
pub trait ManifestAdapter {
    fn ecosystem(&self) -> &'static str;
    fn detect(&self, repo_root: &Path) -> bool;
    fn parse_manifest(&self, repo_root: &Path) -> Result<Option<ManifestInfo>>;
}
```

That trait grew into the part I am proudest of: the project health model. Every check produces findings at three severities (info, warning, error) that roll up into per-repo badges. Hygiene runs fully offline: does `.gitignore` actually cover the `.env` variants? Is an env file _tracked right now_? Are README and LICENSE present? A deeper history walk asks whether an `.env`-style file was ever committed and whether the committed content contains real `KEY=value` assignments, because a leaked credential calls for a rotation suggestion, not only a history-rewrite hint. Security advisories map installed versions against OSV. That check is opt-in and clearly labeled, since it is the only one that touches the network.

For git itself I ended up with a hybrid: `git2` for local reads (status, branches, ahead/behind) and the system `git` for network operations (fetch, pull, push). The user's existing SSH config and credential helpers keep working, which is the hard part to get right, and local reads stay fast without subprocess spam.
