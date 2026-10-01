# 04_Rules.md — Operational Rules, Detection Logic & Constraints

## NETRA — Network Early Threat Recognition & Analysis

**Document Version:** 1.0  
**Project Identifier:** SIH 2026 • Problem Statement 26145  
**Core Standard:** Defensible Threat Inference Under Strict Unidirectional Constraints

---

## 1. Purpose & Guiding Principles

This document establishes the binding operational rules, scientific boundaries, detection heuristics, and engineering constraints governing NETRA. These rules prevent architectural violations (such as attempting active probing or inline blocking), define how evidence must be accumulated and fused, and mandate strict safeguards against baseline poisoning.

---

## 2. Core SIH & System Boundary Rules

### Rule 1.1: Strict Passive & Unidirectional Operation (Non-Negotiable)
- **Zero Transmission:** Under no operational condition shall NETRA transmit an Ethernet frame, IP packet, TCP RST/ACK, ARP query, or ICMP message back onto the monitored network tap.
- **Physical Decoupling:** Ingestion must execute over an RX-only physical link, optical tap, or data diode.
- **No Handshakes or Challenge Probing:** The system must never attempt to actively verify an endpoint by sending SYN probes, banner grabs, or DNS queries. All inference must be derived solely from passively observed traffic.

### Rule 1.2: No Payload Decryption
- **End-to-End Privacy Preservation:** In accordance with modern cryptographic standards and SIH mandates, NETRA shall never perform TLS termination, man-in-the-middle (MITM) decryption, or packet payload cracking.
- **Metadata-Only Analysis:** All behavioral intelligence must be derived from transport headers, packet dimensions, inter-arrival dynamics, DNS query metadata, and plaintext TLS Client/Server Hello handshakes (e.g., SNI, cipher suites, JA3/JA4 fingerprints).

### Rule 1.3: No Inline Blocking or Discard Enforcement
- **Intelligence, Not Enforcement:** NETRA is an early threat recognition and intelligence engine, not an inline firewall or IPS. It produces structured alerts, risk scores, confidence ratings, and forensic evidence for SOC analysts and incident responders.
- **No In-Band Discard Commands:** NETRA does not drop packets or disrupt network traffic.

### Rule 1.4: Scientific Honesty Regarding IP & MAC Attribution
- **No Internet Geolocation by MAC Address:** MAC addresses are Layer-2 local link identifiers that do not traverse routed WAN boundaries. MAC addresses must never be used to claim geographical attacker location.
- **Contextual Geo-IP / ASN Lookups:** IP geolocation and ASN data are treated strictly as contextual threat intelligence signals from local offline caches, not as definitive proof of physical attacker identity.

### Rule 1.5: Truth in Market Claims
- **Defensible Novelty:** NETRA does not claim to have "invented AI-based IDS" or "invented metadata machine learning."
- **Actual Novelty Claim:** NETRA's defensible contribution is its **integrated streaming multi-view evidence fusion architecture**, **entity-specific behavioral memory with poisoning safeguards**, and **explicit uncertainty modeling under strict unidirectional, metadata-only constraints**.

---

## 3. Threat-Specific Detection Matrix & Detection Rules

NETRA governs threat identification through a dual-layer strategy combining deterministic heuristic rules and multi-model machine learning.

| Threat Category | Key Observable Signals | Primary Detector | Supporting Detectors |
|---|---|---|---|
| **1. SYN Flood** | SYN packet surge, short flows, extreme SYN-to-ACK ratio imbalance, high source IP dispersion | Heuristic Rules + XGBoost | Isolation Forest + Temporal Model |
| **2. UDP Reflection / Amplification** | Sudden surge in inbound UDP datagrams, extreme response-size-to-request ratio, port concentration (e.g., NTP 123, DNS 53, SSDP 1900) | XGBoost Classifier | Heuristic Rules + Isolation Forest |
| **3. Spoofed-Source Flood** | Extreme source IP entropy, non-routable/bogon IP surges, rapid single-packet flow bursts, volume spike | Heuristic Rules + Isolation Forest | XGBoost Classifier |
| **4. C2 Beaconing** | Strict inter-arrival time (IAT) periodicity, low IAT standard deviation, repeated external destination, small consistent flow sizes, high temporal autocorrelation | Temporal Model (TCN) | XGBoost + Behavioral Memory |
| **5. Domain Generation Algorithm (DGA)** | High Shannon character entropy in domain names, elevated digit-to-letter ratios, unusual n-gram distributions, burst of NXDOMAIN status codes | XGBoost Classifier | Heuristic Rules + Isolation Forest |
| **6. DNS Tunnelling** | Abnormally long query strings ($> 65$ chars), high-entropy subdomains, elevated query frequency per host, uncommon record types (TXT, NULL) | XGBoost Classifier | Heuristic Rules + Temporal Model |
| **7. Encrypted Malware Delivery** | Rare/unseen TLS Client Hello JA3/JA4 hash in host baseline, atypical cipher suites, self-signed or suspicious SNI, unusual packet size sequence | XGBoost + Temporal Model | Isolation Forest + Local Threat Intel |
| **8. Port Scanning / Reconnaissance** | High destination port diversity from single source, high fan-out ratio, elevated source IP out-degree, short incomplete connection attempts | Heuristic Rules + XGBoost | Isolation Forest |
| **9. Covert Data Exfiltration** | Large outbound byte volume deviation ($> 5\times$ historical baseline), anomalous outbound-to-inbound byte ratio, newly observed destination endpoint | Behavioral Memory + XGBoost | Isolation Forest + Heuristic Rules |

---

## 4. Feature Extraction & Engineering Rules

### Rule 4.1: Standardized Micro-Batch Windows
- Feature extraction operates over discrete sliding time windows of **1.0 to 5.0 seconds** (default: 2.0s).
- Long-running flows are evaluated incrementally at each window boundary rather than awaiting session termination.

### Rule 4.2: Feature Sanitization & Leakage Prevention
- **No IP Address Memorization as Features:** Raw IP addresses must never be passed directly as numeric features to machine learning models (to avoid memorizing specific testbed IPs). IP addresses are used only for entity memory lookups and graph degree calculations.
- **Zero Lookahead:** All features computed for window $t_k$ must rely exclusively on packets observed at or before $t_k$.

### Rule 4.3: High-Entropy Handling
- Character and byte entropy calculations must use standard Shannon entropy:
  $$H(X) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)$$
- Domain name entropy is evaluated specifically on the leftmost subdomain labels, excluding standard Second-Level Domains (SLDs) and Top-Level Domains (TLDs).

---

## 5. Behavioral Memory & Anti-Poisoning Rules

### Rule 5.1: Zero Unchecked Auto-Retraining
- Continuous, automated online retraining of neural network weights or tree ensembles on live unvalidated traffic is strictly prohibited. Unchecked retraining allows an adversary to slowly poison detection boundaries by normalizing malicious behavior.

### Rule 5.2: Quarantine of High-Risk Traffic
- Any flow or micro-batch that triggers a Risk Score $\ge 50$ or activates a high-confidence rule trigger is permanently excluded from updating the entity's normal behavioral baseline.

### Rule 5.3: Exponential Moving Average (EMA) Updates
- Legitimate, verified benign traffic updates statistical baselines using a bounded exponential moving average:
  $$\mu_t = (1 - \alpha)\mu_{t-1} + \alpha x_t, \quad \alpha \in [0.01, 0.05]$$
- Maximum allowable single-day baseline drift is capped at $20\%$ to prevent gradual baseline hijacking.

### Rule 5.4: Baseline Versioning & Rollback
- The memory engine must persist daily baseline snapshots in PostgreSQL. If anomalous false-negative rates or configuration errors occur, operators must be able to roll back entity baselines to a known-clean historical version.

---

## 6. Evidence Handling & Alert Generation Rules

### Rule 6.1: No "Black-Box" Alerts
- Every generated alert must answer the question **"Why was this alert raised?"**
- An alert is invalid if it contains only a raw risk score or class label. It must include a structured `evidence` array containing at least two verifiable supporting observations (e.g., beacon periodicity delta, baseline volume deviation ratio, JA3 rarity indicator, SHAP top contributing features).

### Rule 6.2: Tripartite Output Mandate
Every security inference must output four explicit dimensions:
1. **Threat Class:** Specific attack category or `BENIGN`.
2. **Risk Score ($0 \dots 100$):** Overall severity and operational urgency.
3. **Confidence ($0 \dots 100\%$):** Post-calibrated probability of the assigned class.
4. **Uncertainty (`LOW`, `MEDIUM`, `HIGH`):** Quantified signal ambiguity resulting from partial unidirectional visibility.

### Rule 6.3: Alert Suppression & Incident De-Duplication
- A continuous C2 beaconing session transmitting packets every 30 seconds must not emit 120 separate alerts per hour.
- Identical flow alerts between the same source and destination within an active incident window (default: 10 minutes) must be grouped into an ongoing **Incident Thread**, incrementing the incident flow count and updating the timeline without flooding the analyst queue.