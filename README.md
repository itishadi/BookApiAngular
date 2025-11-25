📝 README.md – exempel
markdown
# 📚 BookApiAngular

Responsiv CRUD-applikation byggd med Angular 20 och .NET 9 C# API. Projektet innehåller bokhantering, citatfunktion, JWT-autentisering, Bootstrap-design och mörkt/ljust tema.

## 🚀 Installation

```bash
npm install
ng serve
🌐 Backend API
Base URL:

Kod
https://bookapibackend-fxd4c6ahazbfb8g9.northeurope-01.azurewebsites.net/api
🔑 Auth
POST /auth/register

POST /auth/login

📖 Books
GET /books

GET /books/{id}

POST /books

PUT /books/{id}

DELETE /books/{id}

💬 Quotes
GET /quotes/my

GET /quotes/{id}

POST /quotes

PUT /quotes/{id}

DELETE /quotes/{id}

🧪 Testa med Postman
Registrera en användare via /auth/register

Logga in via /auth/login och kopiera JWT-token

Lägg token i Postman under Authorization → Bearer Token

Testa alla CRUD-endpoints

🎨 Funktioner
Responsiv design med Bootstrap

Font Awesome-ikoner

Light/Dark mode toggle

Skyddade routes med JWT

Navigering mellan bok- och citatvyer