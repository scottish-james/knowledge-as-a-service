# Knowledge Governance Application - Demo UI

A React-based demonstration interface exploring concepts for managing organisational knowledge assets with robust governance, quality assessment, and AI integration capabilities.

**🔗 [View the live demo](https://scottish-james.github.io/knowledge-as-a-service/)**

## 🏛️ Overview

This demo UI demonstrates potential workflows for:
- **Document Upload & Processing**: Simulated OCR conversion with quality assessment
- **Knowledge Governance**: Security classification, ownership assignment, and review scheduling
- **AI Integration**: Conceptual vector database configuration and API key generation
- **Quality Assurance**: Mock document scoring and duplicate detection

**Note**: This is a demonstration interface with simulated functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/scottish-james/knowledge-as-a-service.git
   cd knowledge-as-a-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Deployment

The application is configured for GitHub Pages deployment:

```bash
npm run build
```

The build artefacts will be generated in the `build/` directory, ready for deployment.

## 📁 Project Structure

```
knowledge-governance-app/
├── public/
│   └── index.html              # HTML template with Tailwind CSS
├── src/
│   ├── App.js                  # Main governance workflow
│   ├── index.js                # React entry point
│   └── knowledgeConsumption.js # AI integration component
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── package.json                # Project configuration
└── README.md                   # This file
```

## 🔧 Demo Features

### Document Governance Workflow (Simulated)

1. **Upload & Processing Demo**
    - Mock drag-and-drop document upload interface
    - Simulated OCR conversion with sample text output
    - Example confidence scoring and error correction workflow

2. **Quality Assessment Simulation**
    - Demo scoring across multiple dimensions:
        - Completeness (85%)
        - Clarity (92%)
        - Structure (78%)
        - Freshness (65%)
    - Sample entity detection and classification
    - Mock duplicate document identification

3. **Governance Configuration Interface**
    - Security classification selection (Public, Internal, Confidential)
    - Department and knowledge type assignment forms
    - Primary and backup owner designation
    - Review frequency scheduling interface
    - Tag and category management

4. **Review & Submission Mockup**
    - Final review summary interface
    - Quality gate validation display
    - Simulated knowledge base integration confirmation

### AI Knowledge Consumption Demo

- **Document Discovery**: Sample semantic search interface
- **Vector Database Configuration**: Conceptual embeddings with metadata filtering
- **API Integration Demo**: Mock secure key generation with example HMAC-SHA256 keys
- **Usage Tracking Concepts**: Simulated analytics for change impact analysis
- **Code Examples**: Real integration examples in Python, JavaScript, and cURL

## 🛡️ Demo Security & Governance Concepts

### Data Classification Levels (Conceptual)

- **Public**: Accessible to all users
- **Internal**: Company employees only
- **Confidential**: Restricted access with audit trails

### API Security Examples

- Example HMAC-SHA256 signed API keys
- Mock cryptographically bound document selections
- Simulated rate limiting (1000 requests/minute)
- Sample request ID tracking for audit purposes

### Usage Analytics Concepts

- Conceptual chunk-level usage tracking
- Mock change impact analysis
- Simulated risk assessment for document updates
- Example frequency analysis for AI consumption patterns

**Note**: All security examples and API keys shown are for demonstration purposes only and are not functional.

## 🎨 User Interface

Built with modern web technologies:
- **React 18**: Component-based architecture
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Consistent iconography
- **Responsive Design**: Mobile and desktop optimised

### Design Principles

- **Accessibility**: WCAG 2.1 AA compliant
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Performance**: Optimised bundle size and lazy loading



### Analytics & Monitoring Concepts

### Usage Tracking Features (Conceptual)

- **Chunk Frequency Analysis**: Concept for monitoring which document sections are accessed most
- **Impact Notifications**: Mock alerts before document updates affect AI systems
- **Risk Assessment**: Simulated evaluation of potential disruption to workflows
- **Usage Analytics**: Example detailed consumption pattern reports


### Roadmap

Reach out with any feature suggestions to help improve the demo. We're building out a section to show how to update documents that have already been uploaded.

---

## 📞 Contact

For questions about this demo, please reach out to the team.