# Blearn V2 API

This is the backend API for Blearn V2, a web application with features for user authentication, data management, and ads.

## Project Structure

The project is organized into the following directories:

-   `src/controllers`: Contains the business logic for each route.
-   `src/middleware`: Contains Express middleware for authentication, rate limiting, etc.
-   `src/models`: Contains the Mongoose data models.
-   `src/routes`: Contains the Express route definitions.
-   `src/utils`: Contains utility functions for sending emails, generating IDs, etc.
-   `src/PublicFiles`: Contains static files that are served to the client.

## Getting Started

To get started with the project, you will need to have Node.js and MongoDB installed on your machine.

### Prerequisites

-   Node.js (v14 or later)
-   MongoDB

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/blearn-v2.git
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the project and add the following environment variables:

    ```
    PORT=3000
    URI=<your-mongodb-uri>
    ```

4.  Start the server:

    ```bash
    npm start
    ```

The server will be running on `http://localhost:3000`.

## API Endpoints

The following are the available API endpoints:

-   `POST /api/auth/signup`: Create a new user account.
-   `POST /api/auth/login`: Log in to an existing user account.
-   `POST /api/auth/reset-password`: Reset a user's password.
-   `GET /api/data`: Get a list of all data.
-   `POST /api/data`: Create a new data entry.
-   `GET /api/ads`: Get a list of all ads.
-   `POST /api/ads`: Create a new ad.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
