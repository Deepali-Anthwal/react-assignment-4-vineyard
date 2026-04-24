# Assignment 4:

## Introduction:
This project is a Real Time Currency Converter application built with React. It leverages a live exchange rate API to provide real-time conversions between global currencies. The primary focus of this assignment was implementing advanced state management and React performance hooks to ensure a smooth, efficient user experience.

## Tech Stack:
* **React.js**: Core framework for UI and state logic.
* **Context API**: Used for global state management of user preferences (example- default currencies).
* **ExchangeRate-API**: Integration for live, accurate currency data.
* **JavaScript (ES6+)**: Advanced logic including `useMemo` for performance.
* **CSS3**: Basic Minimalistic styling.

## Implementation Summary:
The application architecture prioritizes efficiency and real-time responsiveness:
- **Performance Optimization**: Utilized the `useMemo` hook to memoize currency conversion calculations, ensuring they only re-run when the amount or exchange rate changes. `React.memo` was applied to prevent unnecessary re-renders of static UI elements.
- **Global State Management**: Implemented Context API to handle user preferences, allowing currency selections to persist across the application without prop drilling.
- **Asynchronous Data Handling**: Leveraged `useEffect` to fetch live exchange rates upon component mounting, with built-in error handling to manage API downtime gracefully.
- **Reactive UI**: Built an intuitive interface featuring dual-dropdown currency selectors and real-time input fields that update the converted output instantaneously.

## How to Run the Project:
1. **Download the Source Code:**
   - Click the green **Code** button on the GitHub repository.
   - Select **Download ZIP**.
   - Extract the files to a folder on your computer.
2. **Open Terminal:**
   - Open your terminal or command prompt inside the project folder.
3. **Install Dependencies:**
   npm install
4. **Start Project:**
   npm start
