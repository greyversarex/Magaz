# 🚀 Инструкция по развертыванию на Таймвеб

## 📋 Подготовка проекта (уже выполнено)

✅ **Все готово к развертыванию!** Проект настроен для production.

## 🏗️ Развертывание на сервере Таймвеб

### 1. 📦 Загрузка проекта на сервер

```bash
# Клонировать проект с GitHub
git clone https://github.com/your-username/online-store.git
cd online-store

# Установить зависимости для сервера
cd server
npm install
cd ..

# Установить зависимости для клиента
cd client  
npm install
cd ..
```

### 2. 🗄️ Настройка PostgreSQL базы данных

**В панели управления Таймвеб:**
1. Создайте PostgreSQL базу данных
2. Запишите данные подключения

**На сервере создайте файл `.env`:**
```bash
cd server
cp .env.example .env
nano .env
```

**Заполните переменные:**
```env
# Замените на ваши данные от Таймвеб
DATABASE_URL=postgresql://username:password@host:port/database_name
PORT=3001
NODE_ENV=production
SECRET_KEY=your_very_secure_secret_key_here
```

### 3. 🎯 Сборка и запуск

```bash
# Собрать frontend для production
cd client
npm run build
cd ..

# Заполнить базу данных тестовыми данными
cd server
npm run seed

# Запустить production сервер (объединяет frontend + backend)
npm run start-prod
```

### 4. ⚙️ Настройка веб-сервера (Nginx)

**Создайте конфигурацию Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # API запросы
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Статические файлы (изображения)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        proxy_pass http://localhost:3001;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Все остальные запросы (React приложение)
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. 🔄 Автозапуск с PM2

```bash
# Установить PM2
npm install -g pm2

# Создать ecosystem файл
cd server
nano ecosystem.config.js
```

**Содержимое ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'kupi-devays',
    script: 'server-prod.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

**Запустить с PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. 🔧 SSL сертификат (опционально)

```bash
# Установить Certbot
sudo apt install certbot python3-certbot-nginx

# Получить SSL сертификат
sudo certbot --nginx -d your-domain.com

# Автообновление
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🧪 Проверка работы

### 1. Проверить API:
```bash
curl http://your-domain.com/api/device
```

### 2. Проверить изображения:
```bash
curl -I http://your-domain.com/0c80d66c-3e86-402d-92f4-14f4a0d5d8c7.jpg
```

### 3. Открыть сайт в браузере:
```
http://your-domain.com
```

## 🚀 Команды для управления

```bash
# Просмотр логов
pm2 logs kupi-devays

# Перезапуск
pm2 restart kupi-devays

# Остановка
pm2 stop kupi-devays

# Статус
pm2 status

# Мониторинг
pm2 monit
```

## 📂 Структура production файлов

```
online-store/
├── server/
│   ├── server-prod.js       # Production сервер
│   ├── seed-database.js     # Заполнение БД
│   ├── .env                 # Переменные окружения
│   └── ecosystem.config.js  # PM2 конфигурация
├── client/build/            # Собранный React
└── package.json             # Основные команды
```

## ⚠️ Важные моменты

1. **База данных**: Убедитесь что PostgreSQL запущен и доступен
2. **Порт**: По умолчанию сервер запускается на порту 3001
3. **Изображения**: Файлы изображений должны быть в папке `server/static/`
4. **SSL**: Обязательно настройте HTTPS для production
5. **Бэкапы**: Регулярно делайте бэкапы базы данных

## 🆘 Устранение неполадок

### Сервер не запускается:
```bash
# Проверить логи
pm2 logs
# Проверить переменные окружения
cat server/.env
```

### База данных не подключается:
```bash
# Протестировать подключение
cd server
node -e "const db = require('./db'); db.authenticate().then(() => console.log('OK')).catch(console.error)"
```

### Изображения не загружаются:
```bash
# Проверить права доступа
ls -la server/static/
chmod 755 server/static/
```

**✅ ГОТОВО! Ваш интернет-магазин работает в production режиме!**