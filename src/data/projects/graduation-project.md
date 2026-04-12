---
title: "Graduation Project"
description: "A greenhouse monitoring and control system that uses Visible Light Communication to transmit sensor data between Arduino nodes, with a React-based web dashboard for real-time monitoring."
projectType: "freelance"
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

This system collects environmental data from a greenhouse using Arduino-based sensor nodes and transmits it via light signals (VLC) to a receiver node. The data is then relayed through a local server to a backend API, where it is stored and served to a real-time web dashboard. Operators can monitor greenhouse conditions and control actuators (fans, lights, water pump) remotely through the web interface.

## Architecture

```
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

- **VLC-based communication** — sensor data is transmitted via modulated light signals between Arduino nodes, with no RF or Wi-Fi required between hardware units
- **Real-time monitoring** — live dashboard displays current greenhouse conditions
- **Multi-sensor support** — tracks temperature, humidity, light intensity, and soil moisture
- **Actuator control** — remotely toggle fans, grow lights, and water pump from the web interface
- **Persistent storage** — historical sensor data is stored in PostgreSQL

## Tech Stack

- **Hardware:** Arduino (C / C++)
- **Communication:** Visible Light Communication (VLC), Serial port
- **Local Server:** Node.js, TypeScript, SerialPort
- **Backend:** Node.js, Express, TypeScript, DrizzleORM, PostgreSQL
- **Frontend:** React, TypeScript, Vite, TailwindCSS, RechartJS
