# BIS NIDAAN - Smart India Hackathon 2026 🇮🇳

![BIS NIDAAN](https://img.shields.io/badge/Smart_India_Hackathon-2026-orange?style=for-the-badge)
![Problem Statement](https://img.shields.io/badge/PS_ID-26107-blue?style=for-the-badge)
![Theme](https://img.shields.io/badge/Theme-Smart_Automation-brightgreen?style=for-the-badge)

**Problem Statement Title:** AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers
**Team Name:** 404 Minds_1 (Team ID: 159680)

<p align="center">
  <em>AI That Doesn’t Just Answer — It Explains, Verifies and Guides.</em>
</p>

---

## ⚠️ The Existing Problem
- **Scattered Information:** BIS standards & services are spread across disjointed portals, PDFs, and documents.
- **Complex Compliance:** Finding the correct standard, certification, and testing requirements is extremely difficult for MSMEs.
- **No Intelligent Guidance:** Users lack simple, contextual, and source-backed answers in a single centralized place.

## 💡 Proposed Solution: BIS NIDAAN
Our solution is an integrated, unified ecosystem built on an evidence-first AI and Hyperledger blockchain.

- **AI BIS Assistant:** Answers BIS queries in simple, multilingual language with direct source citations.
- **Intent Router:** Identifies the query type (structured, safety, verification, RAG) and routes it to the correct service.
- **Standard Mapper & Compliance Navigator:** Finds applicable IS standards and guides manufacturers through certification steps.
- **Product Trust (Blockchain):** Uses DataMatrix codes and Hyperledger Fabric for immutable, secure certification and recall verification.
- **Product Intelligence:** Provides nutrition, ingredient, and safety guidance using verified data and fixed rules.
- **Consumer Support:** Offers lab search, recall alerts, reviews, and trackable grievance filing.

### 🌟 Unique Value Proposition
1. **One-Stop BIS Platform:** Standards, certification, verification, and grievances all in one place.
2. **Evidence-First AI:** Reliable answers backed strictly by verified BIS sources.
3. **Tamper-Evident Trust:** Secure certification and recall records using a permissioned blockchain.
4. **Human-in-the-Loop Security:** Flags suspicious/counterfeit activity for expert verification.
5. **Inclusive Access:** Multilingual support bridging the gap for all Indian citizens.

---

## 🏗️ Technical Architecture & Approach

### System Workflow
1. **User Interaction Layer:** 
   - React.js Web Dashboards (for BIS & Manufacturers).
   - Flutter Mobile App (for Consumers, MSMEs, Students).
   - Supports text, voice, and multilingual input.
2. **API Gateway & Intent Router:** Authentication and execution path decision (Structured / Safety / Verification / RAG).
3. **Application Layer (Java Spring Boot):** Handles core APIs, QR generation, grievance routing, lab lookup.
4. **AI & Knowledge Layer:** 
   - LangChain / LlamaIndex orchestration.
   - Self-hosted LLMs (Llama 3 / Qwen / Mistral).
   - IndicTrans2 for seamless Indian language translation.
5. **Data Layer (PostgreSQL):** Stores structured data, user records, scan logs, and vector embeddings (`pgvector`).
6. **Blockchain Layer (Hyperledger Fabric):** Permissioned ledger storing verifiable certification & recall records via Java Chaincode.

---

## 📊 Feasibility and Viability

### Feasibility
- **Technical:** RAG, hybrid search, NLP, and source validation enable highly accurate, trusted answers.
- **Financial:** Modular, cloud-ready architecture ensures low cost and highly scalable deployment.
- **Operational:** Automated retrieval, citations, and knowledge updates reduce manual effort for BIS administrators.
- **Social:** Multilingual, simple interactions make complex standards accessible to MSMEs and everyday consumers.

### Viability
- **Sustainable:** A scalable platform that can seamlessly expand across future BIS standards and services.
- **Impactful:** Drastically reduces the time spent finding standards, certification, and testing requirements.
- **Supportive:** Strengthens access to BIS services through intelligent, guided assistance.
- **Adoptable:** Natural-language, user-friendly experience encourages much wider nationwide adoption.

### Potential Challenges & Solutions
| Challenge | Solution |
| :--- | :--- |
| **Complex & Updated Standards:** BIS standards update regularly, making it hard to provide accurate information. | **Version-aware Retrieval:** Uses metadata, version control, and real-time updates for accuracy. |
| **AI Hallucination:** Generative AI might provide unverified information affecting compliance. | **Evidence-first Responses:** Grounded exclusively in official BIS documents with clause-level citations. |
| **Multilingual Barriers:** Complex terminology creates communication barriers. | **Multilingual NLP Layer:** Provides simplified, easy-to-understand explanations across Indian languages. |

---

## 🚀 Impact & Benefits
*Smarter access to standards. Stronger compliance. A safer tomorrow.*

### For Citizens / Consumers
- Get trusted, easy-to-understand information.
- Make safer and highly informed purchase decisions.

### For MSMEs / Businesses
- Reduce time and cost for compliance.
- Improve market access and foster business growth.

### For BIS / Government
- Greater transparency and standardization.
- Improved reach and efficiency of all BIS services.

---

## 📚 Key Research & References
Built on trusted standards and real-world solutions towards a safer and more transparent India.

- **BIS Portals:** [Indian Standards & Certification](https://www.bis.gov.in/), [Recognised Labs](https://www.bis.gov.in/laboratorys/list-of-bis-recognized-lab/)
- **Consumer Help:** [National Consumer Helpline (NCH)](https://consumerhelpline.gov.in/)
- **Technologies:** 
  - [LangChain RAG](https://python.langchain.com/) & [LlamaIndex](https://www.llamaindex.ai/)
  - [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/)
  - [pgvector](https://github.com/pgvector/pgvector)
  - [IndicTrans2 (AI4Bharat)](https://github.com/AI4Bharat/IndicTrans2)

---
*Created for Smart India Hackathon 2026 by 404 Minds_1*
