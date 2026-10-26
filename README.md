# Task Manager

### Конфігурація середовища (`server/.env`)
```env
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
JWT_SECRET=
```

---

### Запуск проекту (Backend + База даних)
```bash
cd server && npm install && npm run dbcreate && npm run migall && npm start
```
> Сервер: `http://localhost:5000`

### Запуск Frontend (у новому терміналі)
```bash
cd client && npm install && npm start
```
> Клієнт: `http://localhost:3000`

---

### Команди керування базою даних (`server/`)
* Створити базу: `npm run dbcreate`
* Накатити міграції: `npm run migall`
* Відкотити всі міграції: `npm run migun`
* Видалити базу: `npm run dbdrop`
