# RealVision Dashboard

This project provides a dashboard that visualizes time series data. The frontend is built with React, and the backend is developed using Rust with the Actix framework.

## Prerequisites

### Frontend

- Node.js and npm
- React

### Backend

- Rust and Cargo
- Actix framework

## Installation

### Frontend: `realvisionDashboardReact`

1. **Navigate to the Frontend Directory**:
   ```bash
   cd realvisionDashboardReact
   ```

2. **Install Required Packages**:
   ```bash
   npm install
   ```

### Backend: `realvisionDashboardReact/rust_actix_backend`

1. **Navigate to the Backend Directory**:
   ```bash
   cd realvisionDashboardReact/rust_actix_backend
   ```

2. **Build the Backend**:
   ```bash
   cargo build
   ```

## Configuration

1. **Update the `config.json` File**:
   Modify the `config.json` file to specify the paths to your CSV files. The structure should be as follows:

```json
{
    "charts": {
        "chart1": ["sample1a.csv", "sample1b.csv"],
        "chart2": ["sample2a.csv", "sample2b.csv"],
        "chart3": ["sample3a.csv", "sample3b.csv"],
        "chart4": ["sample4a.csv", "sample4b.csv"]
    }
}
```

2. **CSV File Format**:
   Each CSV file should have two columns: the first representing the independent variable (e.g., dates) and the second representing the dependent variable (e.g., some metric). For example:

```
Time,Value
2023-01-01,100
2023-01-02,105
...
```

## Usage

### Frontend

1. **Run the React Development Server**:
   In the `realvisionDashboardReact` directory, run:
   ```bash
   npm start
   ```

2. **View the Dashboard**:
   The frontend will be accessible at `http://localhost:3000` (or the port you've configured).

### Backend

1. **Run the Backend Server**:
   In the `realvisionDashboardReact/rust_actix_backend` directory, run:
   ```bash
   cargo run
   ```

2. **Access the Backend**:
   The backend will be accessible at `http://127.0.0.1:8080`.

