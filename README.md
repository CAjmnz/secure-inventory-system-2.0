# secure-inventory-system-2.0

## Project Overview
The **Secure Inventory System** is a full-stack web application built using **CodeIgniter 4** and **MySQL**, designed to manage inventory items securely and efficiently.  
This project demonstrates **backend development, frontend design, REST API integration, and secure authentication**, making it a portfolio-worthy system for recruiters and developers.

## Features
- **User Authentication & Roles:** Admin, Staff, Viewer roles with secure login.
- **Inventory Management:** Create, read, update, delete (CRUD) inventory items.
- **REST API:** Secure API endpoints for integration with other systems.
- **Frontend UI:** Responsive interface using **Bootstrap 5**.
- **Security:** Password hashing, input validation, XSS & SQL injection prevention.
- **Optional Features:** Expiry alerts, export inventory reports (CSV/PDF), Docker support.

## Tech Stack
- **Backend:** CodeIgniter 4 (PHP 8+)
- **Database:** MySQL / MariaDB
- **Frontend:** Bootstrap 5, Vanilla JavaScript
- **Version Control:** Git & GitHub

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/CAjmnz/secure-inventory-system.git
   cd secure-inventory-system

Install dependencies (if using Composer):

composer install

Configure the .env file with your database credentials.

Run migrations (if any) to set up tables:

php spark migrate

Start the development server:

php spark serve

Open http://localhost:8080 in your browser.

API Endpoints
Method	Endpoint	Description
GET	/api/items	List all inventory items
POST	/api/items	Add a new item
PUT	/api/items/{id}	Update an existing item
DELETE	/api/items/{id}	Delete an item

Note: API endpoints are secured with token-based authentication.

Contribution

Fork the repository

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push to branch: git push origin feature-name

Open a Pull Request

License

This project is licensed under the MIT License.

Screenshots

(Add screenshots here when UI is ready)


---

### ✅ **Next Steps**
1. Copy this **README.md** into your project root (`C:\Users\User\Documents\secure-inventory-system\README.md`).  
2. Stage, commit, and push it:

```powershell
git add README.md
git commit -m "Phase 1: Add professional README.md"
git push origin main

After this, your Phase 1 is complete and your GitHub repo will look professional.



## 👨‍💻 Author

Christian Augustus Jimenez  
Full-Stack Developer (Aspirant)
