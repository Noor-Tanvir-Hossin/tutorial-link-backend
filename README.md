# 📚 Book Store Backend

This is a robust and secure **Book Store Backend** application built with Node.js, Express, TypeScript, and MongoDB. It supports user authentication (with role-based access), product (book) management, order processing, and payment integration.

---

## 🎯 Project Objective

The goal of this backend is to support a full-featured e-commerce system for books, providing:

- Secure user registration and login with JWT-based authentication.
- Role-based access control for admin and users.
- Complete CRUD operations for books and orders.
- Checkout functionality with stock validation.
- Seamless integration with SurjoPay payment gateway.

---

# Project Structure

src/
│
├── app/
│ ├── interface/ # Shared interfaces (global types/interfaces)
│ ├── middleware/ # Express middlewares (e.g., errorHandler, authMiddleware)
│ └── modules/ # Main feature modules
│
│ ├── auth/ # Authentication module
│ │ ├── auth.controller.ts # Handles login, registration endpoints
│ │ ├── auth.interface.ts # Types/interfaces for Auth
│ │ ├── auth.route.ts # Routes for auth-related APIs
│ │ ├── auth.service.ts # Business logic for auth
│ │ ├── auth.utils.ts # Helper functions (e.g., token generation)
│ │ └── auth.validation.ts # Joi/Zod validation schemas
│
│ ├── book/ # Book/Product module
│ │ ├── book.constants.ts # Constant values (like enums, messages)
│ │ ├── book.controller.ts # Handles book endpoints (CRUD)
│ │ ├── book.interface.ts # Types/interfaces for Book
│ │ ├── book.model.ts # Mongoose schema/model
│ │ ├── book.route.ts # Routes for book APIs
│ │ ├── book.service.ts # Business logic for books
│ │ └── book.validation.ts # Validations for book input
│
│ ├── order/ # Order module
│ │ ├── order.controller.ts # Order endpoints
│ │ ├── order.interface.ts # Types/interfaces for Order
│ │ ├── order.model.ts # Mongoose schema/model
│ │ ├── order.route.ts # Routes for order APIs
│ │ └── order.service.ts # Business logic for orders
│

# Backend Setup

1. git clone

```
git clone https://github.com/Noor-Tanvir-Hossin/book-store-pro_backend.git
```

2. npm install

```
npm i
```

3. create **_.env_** file

```
NODE_ENV=development
PORT=5000
DATABASE_URL= your_mongodb_database_url
BCRYPT_SALT_ROUNDS=

JWT_ACCESS_TOKEN=
JWT_REFRESH_TOKEN=
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
SP_ENDPOINT=sandbox_url
SP_USERNAME=sandbox_user_name
SP_PASSWORD=sandbox_password
SP_PREFIX=SP
SP_RETURN_URL=
# DB_FILE=
```

4. run project

```
npm run start:dev
```

## Contributing

1. Fork the repo

2. Clone your fork

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

3. Create a new branch

```
git checkout -b feature/YourFeature
```

4. Make changes & commit

```
git add .
git commit -m "Add: Your feature summary"
```

5. Push & create Pull Request

```
git push origin feature/YourFeature
```

6. open a pull requst

# Contact

For any questions or feedback, please reach out to:

Email: tanvirrobin11567@gmail.com
