# Vue Components Organization

This directory contains all Vue.js components organized by their functional categories for the Breitling League application.

## Component Categories

### 📊 Status Bar Components (`/status-bar/`)
Components for displaying application status, progress indicators, and system information.
- Loading indicators
- Progress bars
- Status messages
- Connection status

### 🔘 Button Components (`/button/`)
Interactive button components for user actions.
- Primary/Secondary buttons
- Icon buttons
- Loading buttons
- Button groups

### 📝 Input Components (`/input/`)
Form input components for user data entry.
- Text inputs
- Select dropdowns
- Checkboxes/Radio buttons
- File uploads
- Search inputs

### 🏷️ Badge Components (`/badge/`)
Small status and notification indicators.
- Status badges
- Notification counters
- Achievement badges
- Rank indicators

### 🏪 Chip Components (`/chip/`)
Small interactive elements for selections and filters.
- Filter chips
- Tag chips
- Removable chips
- Selection chips

### 📑 Tab Components (`/tab/`)
Navigation and content organization components.
- Tab navigation
- Tab panels
- Tab indicators
- Vertical/Horizontal tabs

### 📊 Bar Components (`/bar/`)
Various bar-style components for navigation and information display.
- Navigation bars
- Tool bars
- Action bars
- Information bars

### 🎴 Card Components (`/card/`)
Container components for organizing content.
- Quiz cards
- Profile cards
- Information cards
- Dashboard cards

### 📋 List Components (`/list/`)
Components for displaying collections of data.
- User lists
- Quiz lists
- Ranking lists
- Activity lists

### 📊 Table Components (`/table/`)
Data table components for structured information display.
- Data tables
- Ranking tables
- Results tables
- Admin tables

### ⭐ Special Components (`/special/`)
Custom components specific to Breitling League functionality.
- Quiz components
- Score displays
- Rank visualizations
- Custom animations

## Usage Guidelines

1. **Import Pattern**: Use index files for clean imports
```javascript
import { PrimaryButton, SecondaryButton } from '@/components/button'
import { QuizCard } from '@/components/card'
```

2. **Naming Convention**: Use PascalCase for component names
3. **Props**: Define clear prop interfaces with TypeScript/PropTypes
4. **Slots**: Use named slots for flexible content organization
5. **Events**: Emit semantic events following Vue.js conventions

## Development Notes

- Each category folder contains an `index.js` file for easy imports
- Component documentation should be included in each subfolder
- Follow Vue 3 Composition API patterns
- Ensure components are reusable and maintainable
