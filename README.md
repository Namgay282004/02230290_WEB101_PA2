# React Pokedex

This is a Pokedex web application built using React, showcasing various core concepts and principles of the framework.

## Overview

This Pokedex web app allows users to explore information about different Pokemon. Users can search for Pokemon by name, catch them, and view detailed information including their types, abilities, and stats.

## Features

- **Search**: Users can search for Pokemon by name using the search bar.
- **Pagination**: The list of Pokemon is paginated to improve user experience.
- **Pokemon Details**: Detailed information about each Pokemon, including name, type, abilities, and stats, is displayed.
- **Catch Pokemon**: Users can "catch" Pokemon and maintain a list of caught Pokemon.
- **Zustand State Management**: Zustand library is used for managing the state of caught Pokemon.
- **API Integration**: Integration with the PokeAPI to fetch data about specific Pokemon.
- **Responsive Design**: The app is designed to be responsive and work well on various devices and screen sizes.
- **Deployment**: The app can be deployed to a hosting platform for public access.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>

2. Install dependencies:

    ```
    npm install
    ```

3. Run the development server:

    ```
    npm run dev
    ```

4. Open [Link](http://localhost:3000) in your browser to view the app.

## Technologies Used
- React
- Zustand
- PokeAPI
- Tailwind CSS (for styling)
- Next.js (for server-side - rendering, if applicable)

## Directory Structure
```
.
├── components/            # React components
│   ├── ui/                # UI components (Button, Card, Input, etc.)
├── stores/                # Zustand store for state management
├── pages/                 # Next.js pages
│   └── index.js           # Main page component
├── public/                # Static assets
└── README.md              # Project README file
```

## Contributing

Contributions to improve the project are welcome! Feel free to open issues for feature requests or bug reports, and submit pull requests to contribute changes.
