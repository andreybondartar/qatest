Цей проєкт містить набір автотестів для перевірки https://conduit-api.learnwebdriverio.com/, написаних з використанням Playwright


1) Використані технології:

- Playwright;
- TypeScript;
- REST API; 

2) Що перевіряють тести:

- Users API: реєстрація та авторизація користувача;

- Articles API: створення статті та пошук за тегом;

- Comments API: додавання та видалення коментарів;

- Favourite API: додавання та видалення статті з обраного;

- Tags API: пошук статей за тегом;


3) How it works? (or suppose to works :D)

- Кожен тест створює нового користувача (унікальні email та username).

- Токен авторизації завжди передається через заголовок:

Authorization: Token <token>

- Всі API-клієнти наслідуються від ApiClient для єдиного стилю викликів GET/POST/PUT/DELETE;


4) Структура:

api/
├── clients/ # API-клієнти для роботи з Conduit API
│ ├── apiClient.ts # Базовий клієнт для GET/POST/PUT/DELETE
│ ├── articlesClient.ts # Методи для роботи зі статтями
│ ├── commentsClient.ts # Методи для додавання/видалення коментарів
│ ├── favouriteClient.ts # Методи для роботи з обраними статтями
│ ├── tagsClient.ts # Методи для роботи з тегами
│ └── usersClient.ts # Методи для реєстрації та авторизації користувачів
│
└── tests/ # Тести Playwright
├── api/
│ ├── articles.spec.ts # Тести створення та пошуку статей
│ ├── comments.spec.ts # Тести додавання/видалення коментарів
│ ├── commentsParam.spec.ts # Параметризовані тести для коментарів
│ ├── favourite.spec.ts # Тести роботи з обраними статтями
│ ├── tags.spec.ts # Тести пошуку статей за тегами
│ └── users.spec.ts # Тести реєстрації та авторизації користувачів
│
├── fixtures/
│ └── apiFixtures.ts # Загальні фікстури для доступу до API-клієнтів
│
└── playwright.config.ts # Конфігурація Playwright



1. Встановити залежності

npm install

2. Встановити Playwright

npm init playwright@latest

3. Запуск всіх тестів:

npm run test

4. Запустити тести лише з папки api: 

npm run test tests/api



