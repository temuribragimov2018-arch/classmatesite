# ClassMate — Сайт загрузки

Современный лендинг для скачивания ClassMate (Android APK + Windows EXE).

## Быстрый старт

1. Открой `config.js` и при необходимости обнови:
   - `apkUrl` — прямая ссылка на APK
   - `exeUrl` — прямая ссылка на EXE
   - `version` и даты

2. Залей папку на любой статический хостинг (Railway, Vercel, Netlify, GitHub Pages и т.д.)

## Деплой на Railway

### Вариант 1 — через Railway CLI / Dashboard

1. Создай новый проект на [railway.app](https://railway.app)
2. Выбери **Empty Project** → **Add Service** → **GitHub Repo** (или залей через CLI)
3. Или используй **Static Site** / **Nginx**:

Создай файл `nixpacks.toml` или просто залей как static:

```toml
[phases.setup]
nixPkgs = ["nginx"]

[start]
cmd = "nginx -c /app/nginx.conf -g 'daemon off;'"
```

Либо самый простой способ — использовать **Railway Static** или подключить репозиторий и указать:

- Build Command: (пусто)
- Start Command: `npx serve -s . -l $PORT`

Или добавь `package.json`:

```json
{
  "name": "classmate-download",
  "scripts": {
    "start": "npx serve -s . -l $PORT"
  },
  "dependencies": {
    "serve": "^14.2.0"
  }
}
```

### Вариант 2 — через Dockerfile (рекомендуется)

Смотри `Dockerfile` в этой папке.

```bash
railway up
```

## Прямые ссылки на файлы

APK уже настроен:
```
https://github.com/temuribragimov2018-arch/classmate.apk/releases/download/v1.0.1/ClassMate-release.apk
```

Для EXE:
1. Создай релиз на GitHub
2. Загрузи `.exe` файл
3. Скопируй прямую ссылку вида:
   `https://github.com/USER/REPO/releases/download/TAG/filename.exe`
4. Вставь в `config.js` → `exeUrl`

## Соцсети (уже прописаны)

- Instagram: @prostamaga1
- Telegram: t.me/magadevv
- TikTok: @prosta_maga7
- YouTube: @maga-devv

## Структура

```
classmate-site/
├── index.html      # Главная страница
├── styles.css      # Стили
├── config.js       # ← Ссылки и версия (редактируй здесь)
├── script.js       # Логика
├── Dockerfile      # Для Railway
├── package.json    # Для serve
└── README.md
```
