# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Schema Markup Generator - a React-based web application that helps users create SEO-friendly structured data for Webflow projects. The tool generates JSON-LD schema markup for 5 different schema types: LocalBusiness, Article, Product, Event, and Organization.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

**Tech Stack:**
- React 18 with functional components and hooks
- Vite as build tool and dev server
- Tailwind CSS for styling (via CDN in index.html)
- Lucide React for icons

**Project Structure:**
```
src/
├── App.jsx                     # Main application component
├── main.jsx                    # Entry point
├── components/                 # Reusable UI components
│   ├── SchemaTypeSelector.jsx  # Schema type selection interface
│   ├── SchemaForm.jsx          # Dynamic form for schema fields
│   ├── FormField.jsx           # Individual form field component
│   ├── ScriptOutput.jsx        # Generated script display
│   ├── ValidationResults.jsx   # Validation feedback display
│   └── WebflowInstructions.jsx # Usage instructions
├── config/
│   └── schemaTypes.js          # Schema type configurations
└── utils/
    ├── validation.js           # Validation logic and utilities
    └── schemaGenerator.js      # JSON-LD generation utilities
```

**Architecture Benefits:**
- **Modular Components**: Each UI section is a separate, reusable component
- **Separation of Concerns**: Business logic separated from UI components
- **Maintainable**: Easy to modify individual features without affecting others
- **Testable**: Each utility and component can be tested independently
- **Extensible**: Simple to add new schema types or validation rules

**Key Utilities:**
- `validateSchema()`: Comprehensive validation for all schema types
- `generateSchema()`: JSON-LD generation logic
- `generateScript()`: Wraps JSON-LD in script tags
- `isValidUrl()`, `isValidPhone()`: Input validation helpers

The application is designed for non-technical users to easily generate valid schema markup for Webflow integration.