# 💰 BudgetBuddy

BudgetBuddy is a full-stack personal finance and budget management application designed to help users track their income and expenses, manage monthly budgets, plan future finances, monitor recurring expenses, and work toward financial goals.

The application provides a centralized dashboard where users can understand their current financial position and manage their day-to-day financial activities.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Project Objectives](#-project-objectives)
- [Key Features](#-key-features)
- [Core Concepts](#-core-concepts)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Application Flow](#-application-flow)
- [Project Structure](#-project-structure)
- [Database Design](#-database-design)
- [Authentication and Authorization](#-authentication-and-authorization)
- [API Architecture](#-api-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Data Flow](#-data-flow)
- [Budget and Financial Concepts](#-budget-and-financial-concepts)
- [Future Planning Concept](#-future-planning-concept)
- [Recurring Expense Concept](#-recurring-expense-concept)
- [Financial Goals](#-financial-goals)
- [Dashboard](#-dashboard)
- [Security](#-security)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Git and GitHub](#-git-and-github)
- [Production Deployment](#-production-deployment)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Conclusion](#-conclusion)

---

# 📖 Overview

BudgetBuddy is a personal finance management system built using a modern full-stack JavaScript architecture.

The application allows authenticated users to:

- Record income
- Record expenses
- Categorize transactions
- Manage monthly budgets
- Track budget progress
- Manage recurring expenses
- Create financial goals
- Track goal progress
- Plan future income and expenses
- View financial summaries
- Analyze financial data through charts
- Manage their account
- Secure their financial data using authentication

The project demonstrates how a frontend application communicates with a backend REST API, how the backend communicates with PostgreSQL through Prisma ORM, and how authentication is implemented using JWT.

---

# 🎯 Problem Statement

Managing personal finances manually can become difficult when income, expenses, recurring payments, budgets, and financial goals are maintained separately.

Common problems include:

- Not knowing where money is being spent
- Forgetting recurring payments
- Exceeding monthly category budgets
- Having no centralized view of finances
- Difficulty planning future expenses
- Losing track of financial goals
- Maintaining financial records manually

BudgetBuddy solves these problems by providing a single application for recording, organizing, analyzing, and planning personal finances.

---

# 🎯 Project Objectives

The main objectives of BudgetBuddy are:

1. Provide a simple interface for recording financial transactions.
2. Allow users to separate income and expenses.
3. Organize expenses using categories.
4. Allow users to create monthly budgets.
5. Track spending against budgets.
6. Manage recurring financial commitments.
7. Provide financial goal tracking.
8. Support future financial planning.
9. Provide visual financial summaries.
10. Secure user-specific financial information.
11. Demonstrate a complete full-stack application architecture.

---

# ✨ Key Features

## 1. User Registration

Users can create an account using:

- Name
- Email
- Password

Passwords are hashed before being stored in the database.

---

## 2. User Login

Registered users can log in using their email and password.

After successful authentication, the backend generates a JWT token.

The frontend stores the token and sends it with authenticated API requests.

---

## 3. Dashboard

The dashboard provides a financial overview.

It displays:

- Total income
- Total expenses
- Amount saved
- Active goals
- Expense charts
- Income vs expense charts
- Recent transactions
- Budget progress

The dashboard obtains its data from the backend API.

---

## 4. Transaction Management

Users can create, view, update, and delete transactions.

A transaction contains:

- Description
- Category
- Date
- Type
- Amount
- User

Transaction types include:

- Income
- Expense

Example:

```text
Salary
Category: Income
Type: Income
Amount: ₹50,000

# Budget Management
Users can create monthly budgets for different categories.
The application compares the budget amount with actual spending.

This allows users to understand how much of their planned budget has been used.

# Budget Progress
Budget progress compares the amount spent against the budget.

Example:

Food Budget = ₹5,000

Food Spending = ₹3,000

Budget Usage = 60%

The budget progress information is displayed in the application dashboard.

# Recurring Expenses

Recurring expenses represent financial commitments that happen repeatedly.

Examples include:

Rent
Internet bills
Mobile bills
Subscriptions
Insurance
Loan payments

Each recurring expense contains:

Description
Category
Amount
Frequency
Next due date
Active status
User

Example:

Netflix
Category: Subscription
Amount: ₹649
Frequency: Monthly
Next Due Date: 10th


# Future Planning

Future Planning allows users to estimate future financial conditions.

Users can enter:

Expected income
Expected expenses
Number of months

The planning information is stored using browser local storage.

This feature provides basic future financial planning without requiring additional database records.

# Reports

The Reports section provides financial information in an analytical format.

It can be used to understand:

Income
Expenses
Spending patterns
Financial summaries

Charts make financial information easier to understand.

# Setting
The Settings section provides a location for user and application settings.

🧠 Core Concepts

BudgetBuddy demonstrates several important full-stack software development concepts.

Full-Stack Architecture

The application is divided into three major layers:

Frontend
    ↓
Backend API
    ↓
Database

The frontend handles the user interface.

The backend handles:

Business logic
Authentication
Authorization
API requests
Database operations

The database handles persistent data storage.

REST API

The backend exposes REST API endpoints.

For example:

GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id

REST allows the frontend and backend to communicate through HTTP requests.

# CRUD Operations

BudgetBuddy uses CRUD operations.

CRUD means:

C → Create
R → Read
U → Update
D → Delete

For example, transaction management supports:

Create transaction
Read transactions
Update transaction
Delete transaction

The same concept is applied to:

Budgets
Recurring expenses
Goals
Authentication

Authentication answers:

Who is the user?

BudgetBuddy uses email and password authentication.

The authentication flow is:

Email + Password
       ↓
Password Verification
       ↓
JWT Token
       ↓
Authenticated Requests
Authorization

Authorization answers:

What data is the authenticated user allowed to access?

Each financial record is associated with a user.

Example:

User A
 ├── Transactions
 ├── Budgets
 ├── Recurring Expenses
 └── Goals

User B
 ├── Transactions
 ├── Budgets
 ├── Recurring Expenses
 └── Goals

User-specific data is accessed using the authenticated user's ID.

🛠 Technology Stack
Frontend
React

React is used to build the user interface using reusable components.

Vite

Vite provides the frontend development and production build environment.

React Router

React Router manages navigation between application pages.

Axios

Axios is used to communicate with the backend REST API.

Recharts

Recharts is used to display financial information through charts.

React Hook Form

React Hook Form is used for form handling.

Lucide React

Lucide React provides icons for the user interface.

Backend
Node.js

Node.js provides the JavaScript runtime environment for the backend.

Express.js

Express is used to build the REST API.

Prisma

Prisma is used as the ORM for communication between the backend and PostgreSQL.

PostgreSQL

PostgreSQL is the relational database used to store application data.

JWT

JSON Web Tokens are used for authentication.

bcryptjs

bcryptjs is used to hash and verify user passwords.

CORS

CORS allows the frontend and backend to communicate during development.

🏗 System Architecture

BudgetBuddy follows this architecture:

┌─────────────────────────────────┐
│          React Frontend         │
│             Vite                │
│                                 │
│ Pages / Components / Forms      │
└───────────────┬─────────────────┘
                │
                │ HTTP / REST
                │ Axios
                ▼
┌─────────────────────────────────┐
│         Express Backend         │
│                                 │
│ Routes / Middleware / Auth      │
└───────────────┬─────────────────┘
                │
                │ Prisma ORM
                ▼
┌─────────────────────────────────┐
│          PostgreSQL             │
│                                 │
│         budget_buddy            │
└─────────────────────────────────┘
🔄 Application Flow

A typical transaction request works like this:

User
  ↓
React UI
  ↓
Transaction Form
  ↓
Axios
  ↓
Express API
  ↓
JWT Authentication Middleware
  ↓
Transaction Route
  ↓
Prisma
  ↓
PostgreSQL
  ↓
Response
  ↓
React UI
📁 Project Structure
BudgetBuddy/
│
├── backend/
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── budgetRoutes.js
│   │   ├── recurringExpenseRoutes.js
│   │   └── goalRoutes.js
│   │
│   ├── lib/
│   │   └── prisma.js
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── prisma7.config.ts
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │   ├── budgetbuddy-logo.png
│   │   ├── favicon-16x16.png
│   │   └── favicon-32x32.png
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
🗄 Database Design

BudgetBuddy uses PostgreSQL with Prisma ORM.

The main entities are:

User
 │
 ├── Transactions
 ├── Budgets
 ├── Recurring Expenses
 └── Goals
User Model

The User model stores account information.

Important fields:

id
name
email
password
createdAt

The email field is unique.

Transaction Model

The Transaction model stores financial transactions.

Important fields:

id
description
category
date
type
amount
createdAt
userId

Relationship:

User 1 ───────── * Transactions

One user can have multiple transactions.

Budget Model

The Budget model stores monthly category budgets.

Important fields:

id
category
amount
month
createdAt
userId

Relationship:

User 1 ───────── * Budgets
Recurring Expense Model

The RecurringExpense model stores repeated financial commitments.

Important fields:

id
description
category
amount
frequency
nextDueDate
active
createdAt
userId

Relationship:

User 1 ───────── * Recurring Expenses
Goal Model

The Goal model stores financial goals.

Important fields:

id
name
target
saved
deadline
createdAt
userId

Relationship:

User 1 ───────── * Goals
🔐 Authentication and Authorization

BudgetBuddy uses JWT-based authentication.

Registration Flow
User enters:
Name
Email
Password
       ↓
POST /api/auth/register
       ↓
Validate input
       ↓
Check existing email
       ↓
Hash password
       ↓
Create User
       ↓
Return success

The original password is never stored directly in the database.

Login Flow
Email + Password
       ↓
POST /api/auth/login
       ↓
Find User
       ↓
Compare Password
       ↓
Generate JWT
       ↓
Return Token
       ↓
Frontend Stores Token
Authenticated Request

Protected API requests include:

Authorization: Bearer <JWT_TOKEN>

The authentication middleware:

Reads the Authorization header.
Extracts the JWT token.
Verifies the token.
Retrieves the user ID.
Adds the user ID to the request.
Allows the request to continue.

Flow:

Authorization Header
        ↓
JWT Verification
        ↓
req.userId
        ↓
Protected Route
        ↓
Database Query
🔌 API Architecture

The backend exposes multiple API groups.

Authentication API
POST /api/auth/register
POST /api/auth/login
Transactions API
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
Budgets API
GET    /api/budgets
GET    /api/budgets/progress
POST   /api/budgets
PUT    /api/budgets/:id
DELETE /api/budgets/:id
Recurring Expenses API
GET    /api/recurring-expenses
POST   /api/recurring-expenses
PUT    /api/recurring-expenses/:id
DELETE /api/recurring-expenses/:id
Goals API
GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id
DELETE /api/goals/:id
🖥 Frontend Architecture

The frontend follows a component-based architecture.

Pages
   ↓
Components
   ↓
Services
   ↓
Axios API
   ↓
Backend
Main Pages

The application contains:

Dashboard
Transactions
Budgets
Future Planning
Recurring Expenses
Goals
Reports
Settings
Login
Register
Reusable Components

Examples include:

Navbar
Sidebar
ExpenseChart
IncomeExpenseChart
TransactionTable
BudgetProgress
ProtectedRoute

Reusable components make the application easier to maintain and extend.

🔄 API Service Layer

Frontend API communication is centralized using Axios.

The application uses an Axios instance with:

http://localhost:5000/api

The Axios request interceptor automatically attaches the JWT token to protected requests.

Flow:

React Component
      ↓
Service
      ↓
Axios Instance
      ↓
Authorization Header
      ↓
Express API

This avoids manually adding authentication headers to every request.

🛡 Protected Routes

BudgetBuddy uses a ProtectedRoute component.

The purpose is to prevent unauthenticated users from accessing the main application.

Flow:

User visits application
        ↓
Does JWT token exist?
        ↓
      ┌─┴─┐
      │   │
     YES  NO
      │   │
      ↓   ↓
   App  /login
💵 Financial Concepts

BudgetBuddy organizes personal finance into several concepts.

Income

Income represents money received by the user.

Examples:

Salary
Freelance income
Business income
Other income
Expense

Expense represents money spent by the user.

Examples:

Food
Transport
Rent
Shopping
Entertainment
Utilities
Savings

BudgetBuddy uses a simplified savings calculation:

Savings = Total Income - Total Expenses

Example:

Income   = ₹50,000
Expenses = ₹35,000

Savings  = ₹15,000
📅 Monthly Budget Concept

A monthly budget defines how much the user plans to spend in a particular category.

Example:

October 2026

Food           → ₹5,000
Transport      → ₹3,000
Shopping       → ₹4,000
Entertainment  → ₹2,000

Actual expenses can then be compared with the planned budget.

📊 Budget Progress Concept

Budget usage can be represented as:

Budget Usage =
Actual Spending / Budget Amount × 100

Example:

Budget = ₹5,000
Spent  = ₹3,000

Usage = 60%

This allows the user to see how much of a category budget has been consumed.

🔁 Recurring Expense Concept

Recurring expenses are expenses that occur repeatedly according to a frequency.

Examples:

Rent
Internet
Subscriptions
Insurance
Loan payments
Mobile bills

The application stores:

Frequency
Next Due Date
Active Status

This provides a foundation for future features such as:

Upcoming payment reminders
Recurring expense notifications
Monthly recurring expense summaries
Automatic transaction generation
🎯 Financial Goals

A financial goal contains:

Target Amount
Saved Amount
Deadline

A basic goal progress calculation is:

Goal Progress =
Saved Amount / Target Amount × 100

Example:

Target = ₹100,000
Saved  = ₹40,000

Progress = 40%
🔮 Future Planning

Future Planning provides a simple way to estimate future financial conditions.

Users can enter:

Expected Income
Expected Expenses
Number of Months

The planning information is stored in browser localStorage.

This allows the planning information to remain available between browser sessions.

Future Planning is designed as a basic planning feature rather than a complete accounting or financial forecasting system.

📊 Dashboard

The dashboard combines information from multiple parts of the application.

The dashboard includes:

┌──────────────────────────────────────────┐
│              Financial Summary           │
├────────────┬────────────┬─────────┬──────┤
│ Total      │ Total      │ Amount  │Active│
│ Income     │ Expenses   │ Saved   │Goals │
└────────────┴────────────┴─────────┴──────┘

┌────────────────────┬─────────────────────┐
│ Expense Chart      │ Income vs Expense   │
│                    │ Chart               │
└────────────────────┴─────────────────────┘

┌────────────────────┬─────────────────────┐
│ Recent             │ Budget Progress     │
│ Transactions       │                     │
└────────────────────┴─────────────────────┘

The dashboard provides a quick overview of the user's financial information.

🔒 Security

BudgetBuddy includes several basic security mechanisms.

Password Hashing

Passwords are hashed using bcryptjs.

The database does not store the user's original password.

JWT Authentication

JWT tokens are used to authenticate protected API requests.

User Data Isolation

Financial records contain a userId.

Backend queries use the authenticated user's ID so that users access their own financial records.

Environment Variables

Sensitive configuration is stored in .env.

Examples:

DATABASE_URL
JWT_SECRET

The .env file is excluded from Git using .gitignore.

🚀 Installation
Prerequisites

Install:

Node.js
npm
PostgreSQL
Git

Recommended development tools:

Visual Studio Code
Thunder Client
📥 Clone the Repository

After creating the GitHub repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Then:

cd BudgetBuddy
⚙️ Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create:

backend/.env

Add:

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/budget_buddy"
JWT_SECRET="YOUR_SECRET_KEY"

Replace YOUR_PASSWORD with your PostgreSQL password.

Generate a strong private JWT secret for your own environment.

Do not publish the real values to GitHub.

🗄 Database Setup

Make sure PostgreSQL is running.

Create the budget_buddy database if it does not already exist.

Then run:

npx prisma db push

Generate the Prisma client:

npx prisma generate

📄 License

This project is currently intended for educational and personal development purposes.


After pasting, save it as **`README.md`** in the **root `BudgetBuddy` folder**, not inside `backend` or `frontend`.

Then run:

```bash
git add README.md
git status