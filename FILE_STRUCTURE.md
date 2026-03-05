# BlockEstate Project Structure

## Overview
BlockEstate is a decentralized real estate platform built with Next.js frontend and Solidity smart contracts. The project is organized into three main directories:

```
BlockEstate/
├── client/                    # Next.js frontend application
├── web3/                      # Smart contracts and blockchain logic
├── docs/                      # Project documentation
└── scripts/                   # Utility scripts
```

---

## Directory Structure

### 📁 `client/` - Next.js Frontend Application

The frontend application with React components, pages, and utilities.

```
client/
├── components/                # Reusable React components
│   ├── Auth/                  # Authentication components
│   │   ├── AuthForm.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── Buttons/               # Button components
│   │   ├── Button.tsx
│   │   ├── GhostButton.tsx
│   │   ├── LinkButton.tsx
│   │   └── TextButton.tsx
│   ├── Card/                  # Card component
│   │   ├── Card.module.css
│   │   └── Card.tsx
│   ├── CartItem/              # Shopping cart item components
│   │   ├── CartItem.tsx
│   │   └── Item.tsx
│   ├── Footer/                # Footer component
│   │   ├── Footer.module.css
│   │   └── Footer.tsx
│   ├── Header/                # Header components
│   │   ├── AppHeader.tsx
│   │   ├── Header.module.css
│   │   ├── Header.tsx
│   │   └── TopNav.tsx
│   ├── HeroSection/           # Hero section component
│   ├── Input/                 # Input components
│   ├── Menu/                  # Menu components
│   ├── OverlayContainer/      # Overlay wrapper components
│   ├── PropertyCard/          # Property display card
│   ├── SearchForm/            # Search form component
│   ├── TestiSlider/           # Testimonial slider
│   └── Util/                  # Utility components
├── context/                   # React Context and constants
│   ├── BlockEstate.json       # Context data (JSON)
│   ├── constants.js           # Application constants
│   └── index.js               # Context provider setup
├── models/                    # Data models
│   ├── Property.js            # Property data model
│   └── User.js                # User data model
├── PageComponents/            # Page-specific components
│   ├── AboutPage/
│   ├── ActivityPage/
│   ├── AuthorPage/
│   ├── BlogDetail/
│   ├── BlogPage/
│   ├── CollectionPage/
│   ├── Components/
│   ├── ConnectPage/
│   ├── ContactPage/
│   ├── CreatePage/
│   ├── CreatorPage/
│   ├── DetailPage/
│   ├── EditProfilepage/
│   ├── ExplorePage/
│   ├── ForgetPage/
│   ├── FourmPage/            # Forum page
│   ├── LoginPage/
│   ├── NewsPage/
│   ├── PrivacyPage/
│   ├── ProductPAge/
│   ├── RankingPage/
│   ├── SignUpPage/
│   ├── TermsPage/
│   └── UpcomingPage/
├── pages/                     # Next.js pages (routing)
│   ├── _app.js                # Application wrapper
│   ├── 404.js                 # 404 error page
│   ├── index.js               # Home page
│   ├── indexOld.js            # Old home page (backup)
│   ├── about.js               # About page
│   ├── active.js              # Activity page
│   ├── author.js              # Author page
│   ├── blog.js                # Blog listing page
│   ├── blogdetail.js          # Blog detail page
│   ├── collection.js          # Collections page
│   ├── connect.js             # Connect page
│   ├── contact.js             # Contact page
│   ├── create-property.js     # Create property page
│   ├── create.js              # Create page
│   ├── creator.js             # Creator page
│   ├── detail.js              # Property detail page
│   ├── edit-profile.js        # Edit profile page
│   ├── explor.js              # Explore page
│   ├── forget.js              # Forgot password page
│   ├── fourm.js               # Forum page
│   ├── login.js               # Login page
│   ├── news.js                # News page
│   ├── privacy.js             # Privacy policy page
│   ├── product.js             # Product page
│   ├── ranking.js             # Ranking page
│   ├── signup.js              # Sign up page
│   ├── terms-condition.js     # Terms and conditions page
│   ├── upcoming.js            # Upcoming page
│   ├── update.js              # Update page
│   ├── api/                   # API routes
│   └── category/              # Category routes
├── public/                    # Static files
│   ├── activity/              # Activity images
│   ├── banner/                # Banner images
│   ├── bg/                    # Background images
│   ├── blog/                  # Blog images
│   ├── client/                # Client images
│   ├── collection/            # Collection images
│   ├── connect/               # Connect page images
│   ├── contact/               # Contact page images
│   ├── icons/                 # Icon files
│   ├── js/                    # JavaScript files
│   ├── logo/                  # Logo files
│   ├── portfolio/             # Portfolio images
│   └── profile/               # Profile images
├── styles/                    # Global styles
│   ├── globals.css            # Global CSS
│   └── assets/                # CSS assets
├── utils/                     # Utility functions
│   ├── db.js                  # Database utilities
│   └── index.js               # General utilities
├── eslint.config.mjs          # ESLint configuration
├── jsconfig.json              # JavaScript configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── process.env                # Environment variables
└── README.md                  # Frontend documentation
```

**Key Features:**
- **Next.js Pages Router**: Traditional file-based routing
- **React Components**: Modular, reusable UI components
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code quality linting

---

### 📁 `web3/` - Smart Contracts

Blockchain-related code and smart contracts for the platform.

```
web3/
├── contracts/                 # Smart contracts
│   └── blockestate.sol        # Main BlockEstate smart contract
├── scripts/                   # Deployment and utility scripts
│   ├── deploy.js              # Contract deployment script
│   └── verify/                # Contract verification scripts
├── artifacts/                 # Compiled contract artifacts
│   ├── build-info/            # Build information
│   └── contracts/             # Contract artifacts
├── artifacts-zk/              # Zero-knowledge proof artifacts
│   ├── build-info/
│   └── contracts/
├── cache/                     # Cache files
│   └── solidity-files-cache.json
├── cache-zk/                  # ZK cache files
│   └── solidity-files-cache.json
├── hardhat.config.js          # Hardhat configuration
├── package.json               # Dependencies (Hardhat, etc.)
└── README.md                  # Web3 documentation
```

**Key Features:**
- **Solidity Contracts**: Smart contracts for real estate transactions
- **Hardhat**: Ethereum development framework
- **Deployment Scripts**: Automated contract deployment
- **Contract Verification**: Etherscan verification scripts

---

### 📁 `docs/` - Documentation

Project documentation and guides.

```
docs/
└── [Documentation files]
```

---

### 📁 `scripts/` - Utility Scripts

Standalone utility scripts for database and setup tasks.

```
scripts/
├── fixValidators.js           # Fix validation issues
├── initDB.js                  # Initialize database
└── seedDB.js                  # Seed database with sample data
```

---

### 📁 Root Level Files

```
BlockEstate/
├── .vscode/                   # VS Code settings and configurations
├── .gitignore                 # Git ignore rules
├── package-lock.json          # Lock file for dependencies
└── FILE_STRUCTURE.md          # This file - project structure documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swati0602/blockestate.git
   cd blockestate
   ```

2. **Start the Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

3. **Work with Smart Contracts**
   ```bash
   cd web3
   npm install
   npx hardhat compile
   npx hardhat deploy
   ```

---

## Component Guidelines

### Page Components
Each PageComponent corresponds to a Next.js page in the `pages/` directory. They contain the business logic and layout for that page.

### Reusable Components
Stored in `components/` directory:
- **Auth**: Authentication-related UI
- **Buttons**: Button variations
- **Card**: Card container component
- **CartItem**: Shopping cart item display
- **Footer/Header**: Layout components
- **PropertyCard**: Property listing display
- **SearchForm**: Search interface

### Models
Data models in `models/`:
- **Property.js**: Property data structure and methods
- **User.js**: User data structure and methods

---

## Styling

- **Tailwind CSS**: Primary utility-first CSS framework
- **CSS Modules**: Component-scoped styles (`.module.css` files)
- **Global Styles**: `styles/globals.css` for application-wide styling

---

## API Routes

API routes are defined in `pages/api/` and follow Next.js API route conventions.

---

## Environment Variables

Configuration stored in `process.env` file. Required variables:
- Database connection strings
- Blockchain RPC URLs
- API keys and secrets

---

## Contributing

When adding new features:
1. Create components in `components/` if reusable
2. Create page components if page-specific
3. Maintain folder organization
4. Update this FILE_STRUCTURE.md if adding new directories

---

## Project Status

- **Frontend**: Next.js with React components ✓
- **Smart Contracts**: Solidity contracts with Hardhat ✓
- **Database**: Configured with utility scripts ✓
- **Deployment**: Vercel deployment configured ✓

---

## Links
- **Live Site**: https://blockestate-orpin.vercel.app/
- **GitHub**: https://github.com/swati0602/blockestate
- **Author**: [swati0602](https://github.com/swati0602)

---

*Last Updated: March 2026*
