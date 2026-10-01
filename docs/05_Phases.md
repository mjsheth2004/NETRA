# 05_Phases.md — Implementation Roadmap & Milestones

## NETRA — Network Early Threat Recognition & Analysis

**Document Version:** 1.0  
**Project Identifier:** SIH 2026 • Problem Statement 26145  
**Execution Strategy:** Incremental, Test-Driven Development from Ingestion Baseline to Full Multi-Model Fusion

---

## 1. Development Roadmap Overview

The implementation of NETRA is structured into **11 sequential phases** mapped to the SIH engineering roadmap. Each phase delivers a working, testable module that integrates cleanly into the unidirectional threat inference pipeline.

```mermaid
gantt
    title NETRA Development Roadmap
    dateFormat  YYYY-MM-DD
    section Core Pipeline
    Phase 1: Environment & PCAP Ingestion       :p1, 2026-10-01, 5d
    Phase 2: Flow & Micro-Batching Engine       :p2, after p1, 5d
    Phase 3: Multi-View Feature Engineering     :p3, after p2, 6d
    section Multi-Model Detection
    Phase 4: Deterministic Rule Engine          :p4, after p3, 4d
    Phase 5: Supervised XGBoost Classifier      :p5, after p3, 6d
    Phase 6: Isolation Forest Anomaly Engine    :p6, after p5, 4d
    Phase 7: Behavioral Memory & Anti-Poisoning :p7, after p6, 5d
    Phase 8: Temporal Sequence Model (TCN)      :p8, after p7, 6d
    section Fusion & Presentation
    Phase 9: Evidence Fusion & Calibration      :p9, after p8, 5d
    Phase 10: Explainable Alerting & Dashboard  :p10, after p9, 6d
    Phase 11: Benchmark, Ablation & Packaging   :p11, after p10, 5d
```

---

## 2. Phase-by-Phase Breakdown

### Phase 1: Environment Setup & Passive Traffic Ingestion
- **Objective:** Establish the development environment and construct the passive ingestion pipeline capable of replaying standard `.pcap` files and binding to unidirectional NICs.
- **Key Tasks:**
  1. Configure Python 3.10+ virtual environment, install base dependencies (`scapy`, `dpkt`, `polars`, `numpy`).
  2. Implement `PCAPReplayEngine` supporting variable playback rates (1x, 2x, 5x, 10x, wire speed).
  3. Implement `LivePassiveSniffer` using raw sockets in promiscuous mode with transmission (TX) disabled.
  4. Ensure zero-transmission validation using an external packet analyzer.
- **Exit Criteria:** Successfully ingest a 1 GB PCAP capture at $> 20,000 \text{ packets/sec}$ with zero packet transmission on the interface.

### Phase 2: Flow Assembly & Micro-Batch Streaming
- **Objective:** Convert continuous packet streams into structured 5-tuple logical flows and implement sliding micro-batch windowing.
- **Key Tasks:**
  1. Construct in-memory flow table indexed by `(Src IP, Dst IP, Src Port, Dst Port, Protocol)`.
  2. Implement micro-batch coordinator supporting sliding temporal windows from 1.0 to 5.0 seconds (default: 2.0s).
  3. Implement flow timeout and state eviction logic (idle timeout: 15s; active timeout: 60s).
- **Exit Criteria:** Micro-batches are emitted deterministically every 2.0 seconds with $< 50 \text{ ms}$ processing jitter under sustained traffic.

### Phase 3: Multi-View Feature Engineering Pipeline
- **Objective:** Transform raw flow batches into multidimensional numerical feature vectors across all required views.
- **Key Tasks:**
  1. Compute volumetric and packet length statistics (mean, std, min, max, bytes/sec, packets/sec).
  2. Implement temporal inter-arrival time (IAT) analysis (mean, variance, burstiness, periodicity).
  3. Implement fan-out diversity metrics (destination IP/port Shannon entropy, unique endpoint ratios).
  4. Build DNS metadata parser (query length, subdomain depth, character entropy, n-gram likelihood, NXDOMAIN ratio).
  5. Build TLS/QUIC Client Hello parser extracting SNI, cipher suites, extensions, and computing JA3/JA4 hashes.
  6. Assemble compact Behavior Index vector per entity.
- **Exit Criteria:** Feature extraction completes in $< 200 \text{ ms}$ for a batch of 10,000 flows without memory leaks.

### Phase 4: Deterministic Heuristic Rule Engine
- **Objective:** Implement high-speed heuristic detection for unambiguous attack signatures.
- **Key Tasks:**
  1. Define rule definitions in declarative YAML/JSON (`rules.yaml`).
  2. Implement detection rules for:
     - SYN flood (extreme SYN/ACK imbalance, high rate).
     - Spoofed flood (bogon IP surge, high entropy).
     - DNS tunnel (query length $> 65$, entropy $> 4.2$).
     - Port scan (fan-out $> 100$ ports/sec).
     - Known malicious JA3 hash matching against local cache.
  3. Output structured rule scores and trigger metadata.
- **Exit Criteria:** 100% detection of synthetic SYN floods and high-entropy DNS tunnels with zero false positives on known-clean benchmark PCAP.

### Phase 5: Supervised ML Layer (XGBoost Classifier)
- **Objective:** Train, calibrate, and serve an XGBoost model for multi-class classification across known threat families.
- **Key Tasks:**
  1. Prepare labeled training datasets from public benchmarks (CIC-IDS-2017/2018, UNSW-NB15, CTU-13) and synthetic lab captures.
  2. Apply scenario-based train/test splitting (zero random flow splitting to prevent data leakage).
  3. Train multi-class XGBoost classifier with hyperparameter tuning.
  4. Apply isotonic regression for probability calibration.
  5. Integrate TreeSHAP for fast real-time feature attribution.
- **Exit Criteria:** Multi-class Macro F1 $\ge 0.92$ on held-out test scenarios; inference latency $< 100 \text{ ms}$ per batch.

### Phase 6: Unsupervised Anomaly Detection (Isolation Forest)
- **Objective:** Deploy an anomaly detection model capable of flagging novel or zero-day attack vectors.
- **Key Tasks:**
  1. Train Isolation Forest strictly on clean, benign network baselines.
  2. Tune contamination parameter ($\approx 0.02$) and tree count (150 estimators).
  3. Normalize outlier decision scores to a continuous range $s \in [0, 1]$.
  4. Validate on unseen attack classes held out from Phase 5 training.
- **Exit Criteria:** Detect $\ge 80\%$ of held-out attack variants with a False Positive Rate (FPR) $\le 2.0\%$ on clean traffic.

### Phase 7: Behavioral Memory Engine & Anti-Poisoning
- **Objective:** Build the entity-specific statistical memory engine to track normal host behavior over time.
- **Key Tasks:**
  1. Implement statistical profile store per IP entity (packet rate distributions, typical port sets, known peer lists, regular active hours).
  2. Implement real-time baseline deviation scoring ($z$-score deltas, ratio spikes).
  3. Implement anti-poisoning quarantine: prevent flows with $Risk \ge 50$ from updating baselines.
  4. Implement exponential moving average updates ($\alpha = 0.05$) and snapshot versioning in PostgreSQL.
- **Exit Criteria:** Successfully detect exfiltration and novel peer connections by baseline comparison; verify that injected attacks do not shift baseline thresholds.

### Phase 8: Temporal Sequence Modeling (PyTorch TCN)
- **Objective:** Implement a 1D Dilated Temporal Convolutional Network to capture multi-window temporal progressions.
- **Key Tasks:**
  1. Construct sliding temporal window buffer ($T = 16$ time steps).
  2. Build PyTorch TCN architecture with dilated causal convolutions and residual connections.
  3. Train model on multi-stage attack sequences (e.g., slow port scan $\rightarrow$ brute force $\rightarrow$ C2 beacon $\rightarrow$ exfiltration).
  4. Export model checkpoint for low-latency CPU/GPU inference.
- **Exit Criteria:** Reliable detection of jittered C2 beacons (30s ± 3s intervals) where single-flow classifiers fail.

### Phase 9: Evidence Fusion & Calibration Layer
- **Objective:** Synthesize multi-model outputs into a compound decision vector with explicit uncertainty quantification.
- **Key Tasks:**
  1. Implement fusion layer combining Rule triggers, XGBoost probabilities, Isolation Forest anomaly scores, TCN temporal scores, and Behavioral Memory deltas.
  2. Compute final Risk Score ($0 \dots 100$), Confidence ($0 \dots 100\%$), Threat Class, and Uncertainty (`LOW`/`MEDIUM`/`HIGH`).
  3. Perform threshold calibration to minimize false alarm rates.
- **Exit Criteria:** Compound decision output generated in $< 50 \text{ ms}$ per batch with calibrated confidence aligned to empirical precision.

### Phase 10: Explainable Alerting & Real-Time Dashboard
- **Objective:** Build the incident correlation engine, SIH-standard alert generator, and responsive SOC dashboard.
- **Key Tasks:**
  1. Construct FastAPI alert dispatcher and WebSocket streaming service.
  2. Implement alert suppression and incident de-duplication (correlating repeated beacon flows into single incident threads).
  3. Build React/Vite dashboard displaying:
     - Real-time alert feed with severity color-coding.
     - Forensic evidence drawer displaying SHAP contributions and baseline dials.
     - Temporal attack progression timeline.
     - System telemetry (throughput in Mbps/flows/sec, pipeline latency).
- **Exit Criteria:** End-to-end alert rendered on the dashboard $< 1.5 \text{ seconds}$ after packet observation on the wire.

### Phase 11: Benchmark, Ablation Study & Demo Packaging
- **Objective:** Execute rigorous scientific evaluation, document benchmark results, and package the complete system for reproducible demonstration.
- **Key Tasks:**
  1. Run 5-system ablation study:
     - Baseline 1: Rules only
     - Baseline 2: XGBoost only
     - Baseline 3: XGBoost + Rules
     - Baseline 4: XGBoost + Isolation Forest
     - Full Proposed System: Rules + XGBoost + Isolation Forest + TCN + Behavioral Memory + Evidence Fusion
  2. Benchmark throughput and end-to-end detection latency on standard evaluation hardware.
  3. Package services using Docker Compose (`docker-compose.yml`).
  4. Create scripted demonstration replay scenarios for live jury evaluation.
- **Exit Criteria:** Docker container launches with a single command; recorded ablation results prove measurable false-positive reduction and superior unknown-attack recall.