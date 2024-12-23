# API Documentation

## Description

This application allows interactions with two roles: **admin** and **user**.

- **Admin Role**:

  - Create multiple users.
  - Create scope of items (goods) for user to buy.
  - Retrieve a list of all users in the system.
  - Retrieve a list of all items in the system.

- **User Role**:

  - Add items to a list (basket).
  - Maintain multiple lists (baskets) with various items.
  - View their lists or picked items.
  - Delete any list (basket) along with its items.

## Database Installation

### Local MySQL Installation

If MySQL is installed on your local machine, you can configure the database using credentials of your choice.

### Docker Installation

If MySQL is not installed locally, you can use a Docker image:

1. Move the `docker-compose.yml` file to the desired directory.
2. Fill in the required fields in the `docker-compose.yml` file.
3. Run the following command in the directory:

```bash
$ docker-compose up -d
```

This will start a MySQL database with the specified credentials.

## Database Schema

Below is the database schema used in the application:

![Database Schema](/images/db-schema.png)

## Setting Up the .env File

Rename `.env.example` into `.env`.
The `.env` file contains the database and application credentials. Ensure the following:

1. Database fields in the `.env` file match the credentials used for the MySQL database.
2. Other required fields, such as token signing secrets, are properly configured.

## Project Setup

1. Navigate to the project root directory.
2. Install dependencies:

```bash
$ npm install
```

## Compile and Run the Project

```bash
# For development mode
$ npm run start

# For watch mode
$ npm run start:dev
```

## Token Composition

This application uses **JWT tokens** for authorization with two roles:

- **Admin Role**
- **User Role**

Each role has specific token requirements for accessing endpoints.

### Admin Token

**Payload fields**:

- `role`: `[admin_role_name]`
- `expire`: `[time_in_seconds]` (must be greater than the current time in seconds)

The token must be signed using the `ADMIN_SECRET` from the `.env` file.

### User Token

**Payload fields**:

- `role`: `[user_role_name]`
- `expire`: `[time_in_seconds]` (must be greater than the current time in seconds)
- `user`: `[current_user_id]` (type: `number`)

The token must be signed using the `USER_SECRET` from the `.env` file.

You can compose tokens using [jwt.io](https://jwt.io), then copy and use them as Bearer tokens in your requests.

## Application Flow

### 1. Create some Items

Use the admin endpoint `/api/admin/add-items` with an admin token to create the list of items.
So these goods user can add to a user's basket later.

### 2. Create the First User

Use the admin endpoint `/api/admin/add-user` with an admin token to create the first user.

### 3. Perform User Actions

Use the user's `id` in the user token to perform actions like:

- Adding items to a basket.
- Viewing lists or picked items.
- Deleting lists with all items.

## API Endpoints

### Admin Endpoints

#### Create Items

**POST** `/api/admin/add-items`

**Body**:

```json
[
  {
    "name": [string],
    "price": [number],
  },
  {
    "name": [string],
    "price": [number],
  },
  ...
]
```

**Authorization**: Bearer `[admin_token]`

#### Create a User

**POST** `/api/admin/add-user`

**Body**:

```json
{
  "name": [string],
  "email": [string],
  "phone": [string]
}
```

**Authorization**: Bearer `[admin_token]`

#### Get User by ID

**GET** `/api/admin/get-user/:user_id`

**Authorization**: Bearer `[admin_token]`

#### Get All Users

**GET** `/api/admin/get-users`

**Authorization**: Bearer `[admin_token]`

### User Endpoints

#### Add Items to a Basket

**POST** `/api/user/pickup-items`

**Body**:

```json
[
  {"itemId": [number], "quantity": [number]},
  {"itemId": [number], "quantity": [number]}
  ...
]
```

**Authorization**: Bearer `[user_token]`

#### View All User Lists

**GET** `/api/user/show-lists`

**Authorization**: Bearer `[user_token]`

#### View All Picked Items

**GET** `/api/user/show-pickedup-items`

**Authorization**: Bearer `[user_token]`

#### Delete a List

**DELETE** `/api/user/delete-list/:list_id`

**Authorization**: Bearer `[user_token]`

## License

This project uses the [MIT License](https://github.com/nestjs/nest/blob/master/LICENSE).
