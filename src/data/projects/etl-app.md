---
title: "ETL Web Application"
description: "An application that pulls data from a remote server at regular intervals, transforms it into the desired format, and loads it into another server."
projectType: freelance
year: 2024
status: "completed"
version: "1.2.1"
mainTags: ["typescript", "express", "react"]
blocks:
  [
    {
      title: "Technologies",
      type: "tags",
      content:
        [
          "typescript",
          "express",
          "react",
          "shadcn-ui",
          "tailwindcss",
          "vite",
          "vitest",
          "supertest",
          "nock",
          "esbuild",
          "pm2",
          "nginx",
          "ubuntu",
          "linux",
        ],
    },
    {
      title: "Features",
      type: "tags",
      content:
        [
          "backend",
          "frontend",
          "auth",
          "testing",
          "cron-jobs",
          "extract-transform-load",
          "data-transformation",
          "ui",
          "deployment",
        ],
    },
  ]
---

The app moves data between two servers that run on different schedules. It is built to ride out the disruptions that show up in this kind of data stream, and it ships with an interface for adding devices to track and monitoring the ones already there.

It connects to a source and a destination server, each with its own authentication mechanism. Logging into both at separate intervals keeps the sessions alive. Retrieval and upload frequencies differ: data is fetched from the source server every 5 minutes and kept for one hour.

![App Schema](/images/etl-app-schema.png)

At the end of the hour, the collected data is averaged and sent to the destination server. If transmission fails, it retries automatically. At the end of the day, the destination server reports the intervals where data is missing, the app refetches those intervals from the source, and pushes them over. Everything lands within the day.

Historical sync can also be triggered manually from the UI. Each device runs these operations independently, so synchronization can take a while after multi-day disruptions, when the backlog has piled up.

The destination server had its limitations and incomplete documentation, but I kept the design flexible, and it handled every edge case that came up.
