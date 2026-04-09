# Godmode Admin System

## 🔐 Authentication Setup

### 1. Configure Admin Credentials

Edit `.env.local` and set your admin credentials:

```env
ADMIN_EMAIL=admin@talora.com
ADMIN_PASSWORD=your-secure-password-here
JWT_SECRET=your-secret-jwt-key-change-this-in-production
```

**⚠️ Important:** Change these values before deploying to production!

### 2. Access the Admin Panel

1. Navigate to `/godmode` in your browser
2. Login with your configured credentials
3. You'll be redirected to the jobs management page

## 📝 Features

### Jobs Management (`/godmode/jobs`)
- Create, edit, and delete job listings
- Rich form with validation
- Markdown support for job descriptions
- Tags and categories
- Mark jobs as urgent
- All data stored in `/app/data/jobsData.ts`

### Articles Management (`/godmode/articles`)
- Create, edit, and delete articles/blog posts
- Auto-generate URL slugs from titles
- Markdown editor for content
- Featured article flag  
- Author and category management
- Cover images and read time
- All data stored in `/app/data/articlesData.ts`

## 🔒 Security Features

- **JWT authentication** with HTTP-only cookies
- **Middleware protection** for all `/godmode/*` routes except login
- **API route protection** for create/update/delete operations
- **Hidden from search engines** via robots.txt
- **Environment variables** for sensitive credentials

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify session

### Jobs (GET is public, others require auth)
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job

### Articles (GET is public, others require auth)
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article
- `PUT /api/articles/[id]` - Update article
- `DELETE /api/articles/[id]` - Delete article

## 📁 File Structure

```
app/
├── (admin)/godmode/
│   ├── layout.tsx          # Admin layout with nav
│   ├── page.tsx            # Login page
│   ├── jobs/
│   │   └── page.tsx        # Jobs CRUD
│   └── articles/
│       └── page.tsx        # Articles CRUD
├── api/
│   ├── auth/               # Auth endpoints
│   ├── jobs/               # Jobs API
│   └── articles/           # Articles API
├── lib/
│   ├── auth.ts             # Auth utilities
│   ├── jobsFileManager.ts  # Jobs file operations
│   └── articlesFileManager.ts
├── data/
│   ├── jobsData.ts         # Jobs data file
│   └── articlesData.ts     # Articles data file
└── middleware.ts           # Route protection
```

## 💡 Usage Tips

1. **Markdown Support**: Use markdown in description/content fields:
   - `**bold**`, `*italic*`, `# Headings`
   - Lists, links, code blocks all supported

2. **Tags**: Separate tags with commas: `React, TypeScript, Node.js`

3. **Slugs**: For articles, slugs auto-generate from titles but can be edited

4. **Data Persistence**: All changes are saved to TypeScript files in `/app/data/`

5. **Private Repo**: Keep your GitHub repo private to protect the data

## 🔄 Future Migration to Database

When ready to migrate to a database:
1. Install database library (e.g., Prisma, Drizzle)
2. Create schema based on Job and Article interfaces
3. Import existing data from JSON files as seed data
4. Update API routes to use database instead of file operations
5. Remove file manager utilities

## 🛠️ Development

Start the dev server:
```bash
npm run dev
```

Then visit `http://localhost:3000/godmode` to login.
