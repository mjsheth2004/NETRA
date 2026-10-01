# NETRA Documentation

## Network Early Threat Recognition & Analysis
> **"SEE THE THREAT. BEFORE IT STRIKES."**

**SIH 2026 • Problem Statement 26145**  
**Title:** AI-Based Detection of Cyber Threats in Unidirectional IP Traffic  
**Architecture:** Passive, Read-Only, Metadata-Based Threat Inference Under Partial Observability

---

## 1. Project Overview

**NETRA** (Network Early Threat Recognition & Analysis) is a passive, streaming, explainable AI threat-inference engine designed for highly secure network enclaves, data diodes, and optical tap links where conventional bidirectional network monitoring is impossible. 

In these unidirectional environments, conventional intrusion detection systems fail because:
- **No return path exists:** The monitor cannot transmit TCP ACKs, reset packets, or handshake challenges.
- **No active probing is allowed:** The monitoring engine cannot scan suspect endpoints.
- **Payloads are opaque:** Modern traffic is end-to-end encrypted (TLS 1.3, QUIC, DoH), and mandates forbid deep packet decryption.
- **Attacks are temporal:** Stealthy C2 beacons, slow port scans, and covert exfiltration develop across time windows.

NETRA addresses this challenge by analyzing unidirectional IP traffic through **multi-view metadata feature extraction**, **entity-specific behavioral memory**, and **learned multi-model evidence fusion** (combining deterministic rules, supervised classification via XGBoost, unsupervised anomaly detection via Isolation Forest, and temporal sequence modeling via Temporal Convolutional Networks). NETRA generates structured, calibrated, and explainable security intelligence without ever transmitting a single packet or decrypting a payload.

---

## 2. Core Detection & Inference Pipeline

```
ONE-WAY TRAFFIC
      │
      ▼
1. Passive Ingestion ────────► PCAP replay / Live RX-only tap socket (Zero TX)
      │
      ▼
2. Flow & Micro-Batching ───► 5-tuple flow aggregation into 1–5s sliding windows
      │
      ▼
3. Multi-View Features ─────► Volumetric, Timing/IAT, DNS, TLS/QUIC, Fan-Out, Graph
      │
      ▼
4. Behavior Index ──────────► Compact window-level behavioral representation
      │
      ▼
5. Multi-Model Detection ───► Rules + XGBoost + Isolation Forest + TCN Sequence Model
      │
      ▼
6. Behavioral Memory ───────► Entity statistical profiles, deviation scoring & anti-poisoning
      │
      ▼
7. Evidence Fusion ─────────► Threat Class + Risk (0–100) + Confidence + Uncertainty
      │
      ▼
8. Explainable Alerts ──────► Structured SIH JSON with SHAP evidence & temporal timeline
      │
      ▼
9. SOC Dashboard ───────────► Real-time alert feed, forensic drill-down, throughput & latency
```

---

## 3. Supported Threat Classes

NETRA provides targeted detection logic, features, and multi-model coverage for nine critical threat categories:
1. **SYN Flood:** Volumetric surges, flow truncation, SYN/ACK ratio anomalies.
2. **UDP Reflection / Amplification:** Inbound rate spikes, asymmetric response-to-request volume, service port concentration.
3. **Spoofed-Source Flood:** Extreme source IP entropy, non-routable bogon IP surges.
4. **C2 Beaconing:** Strict inter-arrival time (IAT) periodicity, repeated destinations, low IAT variance.
5. **Domain Generation Algorithms (DGA):** High Shannon character entropy, elevated digit ratios, abnormal n-gram distributions.
6. **DNS Tunnelling:** Abnormally long query strings ($> 65$ chars), high-entropy subdomains, high query rates.
7. **Encrypted Malware Delivery:** Rare TLS Client Hello JA3/JA4 hashes, atypical cipher suites, destination novelty.
8. **Port Scanning & Reconnaissance:** High destination port/IP diversity, elevated source out-degree, short incomplete flows.
9. **Covert Data Exfiltration:** Significant outbound byte volume deviations ($> 5\times$ baseline), anomalous outbound-to-inbound ratios.

---

## 4. Documentation Index

The complete technical specification and architecture for NETRA is documented in the following referenced modules:

| Document | Title | Description |
|---|---|---|
| [`01_SRS.md`](file:///d:/Projects/NETRA/docs/01_SRS.md) | **Software Requirements Specification** | Formal SRS containing problem statement, stakeholders, functional requirements, NFRs, system constraints, inputs/outputs, and acceptance criteria. |
| [`02_Project_Requirements.md`](file:///d:/Projects/NETRA/docs/02_Project_Requirements.md) | **Project Requirements & Scope** | Scope tiering (MVP vs Stretch vs Future), technical requirements, software/hardware toolchains, ML specifications, and network traffic prerequisites. |
| [`03_Architecture.md`](file:///d:/Projects/NETRA/docs/03_Architecture.md) | **System & Pipeline Architecture** | Comprehensive end-to-end architecture, 9-stage data pipeline, streaming micro-batch design, dataflow diagrams, and key architectural guarantees. |
| [`04_Rules.md`](file:///d:/Projects/NETRA/docs/04_Rules.md) | **Operational Rules & Constraints** | Strict SIH constraints (read-only, no active probing, no payload decryption, no inline blocking), threat detection matrix, and feature extraction rules. |
| [`05_Phases.md`](file:///d:/Projects/NETRA/docs/05_Phases.md) | **Implementation Roadmap** | 11-phase development roadmap from initial PCAP ingestion to multi-model fusion, testing, ablation studies, and final demonstration packaging. |
| [`06_Design.md`](file:///d:/Projects/NETRA/docs/06_Design.md) | **Detailed System Design** | Detailed component specifications, internal data structures, sequence diagrams, SOC dashboard wireframes, and explainability architecture. |
| [`07_Memory.md`](file:///d:/Projects/NETRA/docs/07_Memory.md) | **Behavioral Memory Architecture** | Entity-specific statistical baselines, temporal baseline comparison, controlled EMA updates, rollback checkpoints, and anti-poisoning defenses. |
| [`08_Database_Design.md`](file:///d:/Projects/NETRA/docs/08_Database_Design.md) | **Database Architecture & Schema** | Relational schema and data dictionary for flows, micro-batches, features, detections, alerts, evidence, baselines, and model registries. |
| [`09_Testing.md`](file:///d:/Projects/NETRA/docs/09_Testing.md) | **QA, Validation & Ablation Plan** | Testing tiers, scenario-based train/test splitting, 5-system scientific ablation study, target metrics (Precision, Recall, F1, FPR), and live replay scenarios. |
| [`10_Deployment.md`](file:///d:/Projects/NETRA/docs/10_Deployment.md) | **Deployment & Operations Guide** | Practical single-host Docker Compose deployment topology, environment configuration, container specifications, and security hardening guidelines. |

---

## 5. Technology Stack Summary

- **Ingestion & Traffic:** PCAP replay, live raw sockets, NetFlow / IPFIX / sFlow (`scapy`, `dpkt`, `pyshark`).
- **Feature Pipeline:** Python 3.10+, `polars`, `numpy`, `scipy`, `pandas`.
- **Detection Models:** Heuristic Rule Engine, `xgboost`, `scikit-learn` (Isolation Forest), `torch` (PyTorch TCN).
- **Explainability:** `shap` (TreeSHAP), temporal receptive field attribution.
- **Backend Service:** `fastapi`, `uvicorn`, `pydantic`.
- **Database:** `PostgreSQL 15+` (with optional TimescaleDB extension).
- **Frontend Dashboard:** `React`, `TypeScript`, `Vite`, `Tailwind CSS`.
- **Packaging:** `Docker`, `Docker Compose`.
