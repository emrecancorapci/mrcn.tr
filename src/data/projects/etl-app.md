---
title: "ETL Web Application"
description: "Application that takes data from a server and transforms it into a desired format and then loads it into another server."
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
			content: [
				"backend",
				"frontend",
				"auth",
				"testing",
				"cron-jobs",
				"extract-transform-load",
				"data-transformation",
				"ui",
        "deployment"
				],
		}
  ]
---

In short, the application enables data flow between two different servers occurring at varying intervals. The server is equipped with various measures and capabilities to handle potential disruptions in the data stream. The application also offers an interface to add new devices for tracking and to monitor existing ones.

The application connects to source and destination servers, each having its own independent authentication mechanism. Authentication continuity is maintained by logging into both servers at distinct intervals. Since the data retrieval and upload frequencies differ, data is fetched from the source server every 5 minutes and retained for one hour.

At the end of the hour, the collected data is averaged and transmitted to the destination server. If an issue occurs during transmission, the process automatically retries. At the end of the day, the time intervals for any missing data are requested from the destination server. The data corresponding to these missing intervals is fetched from the source server and pushed to the destination server, ensuring all data is completely delivered within the day.

Historical data synchronization can also be manually triggered via the user interface. All these operations run independently for each device; therefore, synchronization may take longer—especially following multi-day disruptions due to accumulated data backlog.

Despite limitations and incomplete documentation on the destination server, a stable architecture was delivered through a flexible design capable of successfully handling all edge cases.
