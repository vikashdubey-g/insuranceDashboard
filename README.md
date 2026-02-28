# COI Review Dashboard

A modern, responsive dashboard application built for **LegalGraph AI** to overview and manage Certificates of Insurance (COI).

## Features

- **Dashboard Overview**: View total, accepted, rejected, and expiring COI records at a glance.
- **Advanced Filtering**: Filter records by property, status, expiry date, and specific date ranges.
- **Search Capabilities**: Search for specific records by tenant name, property, or unit.
- **Data Management**: Add new COI records, edit existing ones, or delete outdated records effortlessly.
- **Status Updates**: Quickly drop-down and manage document statuses (e.g., Active, Expiring Soon, Rejected).
- **Export**: Export filtered COI records to a CSV file.
- **Sorting & Pagination**: Efficient data tables with column sorting and customizable rows-per-page.
- **Fully Tested**: Comprehensive unit testing using Jest and React Testing Library.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository and navigate into the project folder.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will typically be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Compiles TypeScript and builds the app for production in the `dist` folder.
- `npm run preview` - Locally previews the production build.
- `npm run test` - Runs the Jest test suite.
- `npm run coverage` - Runs the Jest test suite and generates a test coverage report.
- `npm run lint` - Runs ESLint to find and fix code quality issues.
