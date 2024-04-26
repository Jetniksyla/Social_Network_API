# Social_Network_API

This is a social network API that allows users to share their thoughts, react to friends' thoughts, and manage their friend list. The API is built using Express.js for routing, MongoDB for the database, and Mongoose as the ODM. It provides various endpoints for interacting with users, thoughts, reactions, and friend lists.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Walkthrough Video](#walkthrough-video)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To run this API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/social-network-api.git

   ```

2. Install the dependencies:

   ```bash
   cd Social_Network_API
   npm install

   ```

3. Start the MongoDB server (make sure MongoDB is installed on your machine).

   - This guide provides instructions for installing MongoDB Community Edition on various operating systems.

     Follow this link: [MongoDB installation guide](https://docs.mongodb.com/manual/administration/install-community/)

4. Start the API server:

   ```bash

   npm start
   ```

## Usage

You can use tools like Insomnia or Postman to interact with the API endpoints. Make sure to set up the environment variables for the database connection in a `.env `file:

## API Endpoints

- **GET /api/users**: Get all users.
- **GET /api/users/:id**: Get a single user by ID.
- **POST /api/users**: Create a new user.
- **PUT /api/users/:id**: Update a user by ID.
- **DELETE /api/users/:id**: Delete a user by ID.

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list.

- **GET /api/thoughts**: Get all thoughts.
- **GET /api/thoughts/:id**: Get a single thought by ID.
- **POST /api/thoughts**: Create a new thought.
- **PUT /api/thoughts/:id**: Update a thought by ID.
- **DELETE /api/thoughts/:id**: Delete a thought by ID.

- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought.

## Walkthrough Video

[Watch the walkthrough video](https://www.loom.com/share/38c9f77ca05e43ad9bbe12c94d92160b?sid=125a8e5e-7370-4bff-b6cb-aedde9171b6c)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries or collaboration opportunities, please feel free to reach out to **Jetnik Syla:**

- **Email:** [sjetnik@gmail.com](mailto:sjetnik@gmail.com)
- **GitHub Profile:** [Jetnik Syla](https://github.com/JetnikSyla)
