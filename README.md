# Abandoned, Not Forgotten — Planetary Space Archaeology Archive

An interactive 3D web archive preserving the coordinates, telemetry, and engineering legacy of autonomous spacecraft, rovers, and landers resting on the Moon and Mars.

Built for NASA Space Apps Challenge 2026 by Roman Bovin (IT Lyceum Team).

---

## Overview

Every robotic pioneer sent to the Moon or Mars represents a milestone in human engineering. Even after their batteries deplete or dust covers their solar panels, these machines remain on alien worlds as silent monuments of exploration—and in some cases, like retroreflectors, continue serving science decades later.

Abandoned, Not Forgotten transforms raw planetary coordinates and mission logs into an interactive space-archaeology experience:
- Orbital Hero Experience: Full-screen low-Earth orbit visualization introducing Earth as the launchpad of deep-space exploration.
- Interactive 3D Globes (Moon & Mars): Custom WebGL globes featuring real planetary surface textures, atmospheric limb glow, and interactive radar beacons pinned to verified landing coordinates.
- Detailed Telemetry & Mission Dossiers: Archival imagery, hardware breakdowns in plain language, scientific discoveries, and a "Planned vs. Reality" comparison highlighting machines that outlived their design lifespans by years.

---

## Featured Autonomous Artifacts

### Sector 01: The Moon
- Luna 9 (E-6 No. 13) (1966) — First spacecraft to achieve a soft landing on another celestial body.
- Surveyor 3 (1967) — Robotic soil-sampling lander later visited on-site during Apollo 12.
- Lunokhod 1 (8EL No. 203) (1970–1971) — World's first remote-controlled planetary rover; its laser retroreflector remains active today.
- Lunokhod 2 (8EL No. 204) (1973) — Held the off-world driving distance record (~39–42 km) for over 40 years.
- Yutu-2 (2019–Present) — First rover to operate on the lunar far side inside Von Kármán Crater.
- Vikram Lander & Pragyan Rover (Chandrayaan-3) (2023) — First soft landing near the Lunar South Pole.

### Sector 02: Mars
- Mars 3 Lander (1971) — First spacecraft to attain a soft touchdown on Mars during a global dust storm.
- Viking 1 Lander (1976–1982) — Nuclear-powered meteorological and biological station operating for over 6 Earth years.
- Beagle 2 (2003) — Compact folding lander lost upon landing and rediscovered intact via orbital imaging in 2015.
- Phoenix Mars Lander (2008) — Arctic lander that directly excavated subsurface water ice on Mars.
- Opportunity (MER-B) (2004–2018) — Off-world marathon record holder (45.16 km over 5,111 sols vs. a 90-sol design life).
- InSight Lander (2018–2022) — Geophysical seismic observatory that detected over 1,300 marsquakes.

---

## Tech Stack

- Frontend Framework: React 18 + Vite
- 3D Visualization: Three.js & react-globe.gl (custom HTML radar markers & orbital camera transitions)
- Styling: Tailwind CSS (glassmorphic mission-control UI)
- Icons: Lucide React

---

## NASA & Scientific Data Sources

All landing coordinates, mission timelines, and archival imagery are cross-referenced with open planetary datasets:
- NASA Lunar Reconnaissance Orbiter Camera (LROC) — High-resolution lunar surface imagery and artifact localization.
- NASA Planetary Data System (PDS) — Verified telemetry, sol counts, and mission engineering archives.
- NASA Mars Reconnaissance Orbiter (MRO HiRISE) — Orbital confirmation of Martian landers and rover tracks.
- NASA Space Science Data Coordinated Archive (NSSDC) — Historical spacecraft specifications.

---

## Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/Plohvnnv/abandoned-not-forgotten.git](https://github.com/Plohvnnv/abandoned-not-forgotten.git)
   cd abandoned-not-forgotten
