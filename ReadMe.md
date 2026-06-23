[![Maintainability](https://api.codeclimate.com/v1/badges/ivanba1/maintainability)](https://codeclimate.com/github/ivanba1/hexlet-praktika-proizbod )
# 📋 To-Do List App

Веб-приложение для управления списком задач с серверной частью на Node.js и базой данных PostgreSQL.  
Разработано в рамках производственной практики по ПМ.11 «Разработка, администрирование и защита баз данных» и ПМ.02 «Осуществление интеграции программных модулей».

---

## 🛠️ Технологический стек

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Аутентификация:** JWT (JSON Web Token)
- **Защита:** Helmet, CORS, bcryptjs (хеширование паролей)
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Инструменты:** Nodemon, dotenv

---

## 🚀 Запуск проекта
```bash
1. Клонировать репозиторий
git clone https://github.com/ivanba1/hexlet-praktika-proizbod
cd todo-app
2. Настроить базу данных PostgreSQL
Создать базу данных с помощью скрипта sql/init.sql:

bash
psql -U postgres -f sql/init.sql
Либо выполнить содержимое файла в вашем клиенте PostgreSQL.

3. Настроить окружение сервера
В папке server/ создать файл .env со следующим содержимым (подставить свои значения):

env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todo_db
JWT_SECRET=your_secret_key
PORT=5000
4. Установить зависимости и запустить сервер
bash
cd server
npm install
npm run dev   # или npm start
5. Открыть клиентскую часть
Откройте файл client/index.html в браузере.
Для корректной работы API должен быть запущен на http://localhost:5000.
