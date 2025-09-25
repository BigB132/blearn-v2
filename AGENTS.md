# Agent Instructions for Blearn V2 API

As an AI agent working on this codebase, please adhere to the following guidelines to ensure consistency, quality, and security.

## 1. Security First

*   **Never handle passwords in plain text.** All passwords must be hashed using `bcrypt`. When querying for a user, never use the password directly in the query. Fetch the user by their username or email, and then use `bcrypt.compare()` to verify the password.
*   **Sanitize and validate all user input.** Use a library like `express-validator` or `joi` to validate incoming data at the route level. This helps prevent NoSQL injection and other common vulnerabilities.
*   **Implement secure password resets.** Do not email users their passwords. Instead, generate a secure, single-use, time-limited token and email them a link to reset their password.
*   **Use parameterized queries.** Although Mongoose helps prevent NoSQL injection by sanitizing inputs, always be mindful of how you construct queries. Avoid using user input to construct query keys.

## 2. Code Style and Consistency

*   **Follow existing patterns.** Before adding new features, take time to understand the existing code structure and conventions.
*   **Use Async/Await.** For all asynchronous operations, use `async/await` with `try...catch` blocks for error handling.
*   **Standardize API Responses.** All API responses should follow a consistent format. For successful responses, use `{ status: 'success', data: { ... } }`. For errors, use `{ status: 'error', message: 'Error message' }`.
*   **Use a logger.** Replace all `console.log()` statements with a dedicated logger like `winston` or `pino`. Log errors with appropriate levels (`error`, `warn`, `info`).

## 3. Dependency Management

*   **Keep dependencies up to date.** Regularly check for and apply updates to dependencies, especially for security patches.
*   **Remove unused dependencies.** If a dependency is no longer needed, remove it from `package.json`. For example, `body-parser` is included in modern versions of Express and can be removed.

## 4. Testing

*   **Write tests for all new features.** Every new endpoint or significant piece of business logic must be accompanied by tests.
*   **Use a testing framework.** Use `jest` and `supertest` for writing and running integration and unit tests.
*   **Ensure all tests pass before submitting.** Run the full test suite (`npm test`) and ensure there are no failures.

## 5. Environment and Configuration

*   **Never commit sensitive information.** Use `.env` files for all environment-specific configurations and secrets (API keys, database URIs, etc.). Ensure that the `.env` file is listed in `.gitignore`.
*   **Make configuration clear.** Store configuration values in a dedicated file (e.g., `src/config.js`) rather than hardcoding them in controllers or services.

By following these guidelines, you will help maintain a high-quality, secure, and maintainable codebase.
