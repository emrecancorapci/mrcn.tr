---
featured: true
title: "Graduation Project"
description: "A greenhouse control system uses Visible Light Communication to transmit sensor data between Arduino nodes, with a dashboard for real-time monitoring."
projectType: freelance
year: 2022
status: "completed"
mainTags: ["cpp", "typescript", "arduino", "web"]
blocks:
  [
    {
      title: "About",
      type: "records",
      content:
        [
          ["Year", "2022-2023"],
          ["Project Type", "School Project"],
          ["Status", "Finished"],
          ["Role", "Software Developer"],
        ],
    },
    {
      title: "Technologies",
      type: "tags",
      content:
        [
          "cpp",
          "typescript",
          "arduino",
          "web",
          "react",
          "tailwindcss",
          "rechart-js",
          "drizzle-orm",
          "postgresql",
          "serialport-js",
        ],
    },
    {
      title: "Features",
      type: "tags",
      content:
        [
          "backend",
          "frontend",
          "visible-light-communication",
          "serial-communication",
          "data-visualization",
          "data-analysis",
          "ui",
          "database",
        ],
    },
  ]
---

## Overview

The system collects environmental data from a greenhouse with Arduino-based sensor nodes and sends it to a receiver node over light signals (VLC). From there the data goes through a local server into a backend API, which stores it and serves it to a real-time web dashboard. Operators can watch greenhouse conditions and toggle actuators (fans, lights, water pump) from the web interface.

## Architecture

```text
[Transmitter (Arduino)]
        │
        │  Visible Light Communication
        ▼
[Receiver (Arduino)]
        │
        │  Serial Communication
        ▼
[Local Server (Node.js)]
        │
        │  HTTP / WebSocket
        ▼
[Backend Server (Node.js + PostgreSQL)]
        │
        │  REST API
        ▼
[Frontend Dashboard (React + TypeScript)]
```

## Modules

| Module           | Description                                                 | Tech                              |
| ---------------- | ----------------------------------------------------------- | --------------------------------- |
| `transmitter`    | Reads sensor data and encodes it into light signals         | Arduino / C++                     |
| `receiver`       | Decodes incoming light signals and forwards data via serial | Arduino / C++                     |
| `local-server`   | Bridges serial port data to the backend server              | Node.js / TypeScript              |
| `backend-server` | REST API that stores and exposes sensor data                | Node.js / TypeScript / PostgreSQL |
| `frontend`       | Web dashboard for real-time monitoring and control          | React / TypeScript / Tailwind CSS |

## Features

- **VLC-based communication**: sensor data travels between Arduino nodes as modulated light signals, with no RF or Wi-Fi between the hardware units
- **Real-time monitoring**: the live dashboard shows current greenhouse conditions
- **Multi-sensor support**: tracks temperature, humidity, light intensity, and soil moisture
- **Actuator control**: fans, grow lights, and the water pump toggle from the web interface
- **Persistent storage**: historical sensor data lives in PostgreSQL

## Tech Stack

- **Hardware:** Arduino (C / C++)
- **Communication:** Visible Light Communication (VLC), Serial port
- **Local Server:** Node.js, TypeScript, SerialPort
- **Backend:** Node.js, Express, TypeScript, DrizzleORM, PostgreSQL
- **Frontend:** React, TypeScript, Vite, TailwindCSS, RechartJS
