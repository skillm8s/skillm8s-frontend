# SkillM8s - Service Provider Platform

## Overview
SkillM8s is a modern web platform connecting service providers with customers for various home services and maintenance needs. Built with Next.js 14, TypeScript, and Prisma, it offers a seamless experience for both service providers and customers.

## Features
- 🏠 Comprehensive home services marketplace
- 👥 Dual user types: Service Providers and Customers
- 📝 Waitlist system for early access
- 🌐 Responsive design
- 🔒 Type-safe development with TypeScript
- 📊 PostgreSQL database integration

## Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18.x or later
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/skillm8s/skillm8s.git
cd skillm8s
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

4. Set up the database
```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure
```
skillm8s/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── waitlist/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   └── layout/
│   │   └── page.tsx
│   └── lib/
│       └── prisma.ts
├── prisma/
│   └── schema.prisma
├── public/
└── package.json
```


## Available Services Categories
- Outdoor & Yard Services
- Exterior Home Maintenance
- Core Home Systems (HVAC, Plumbing, Electrical)
- Interior Maintenance
- Home Cleaning & Appearance
- Specialized Home Services
- Home Improvement & Lifestyle
- Home Assessment & Advisory

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Your Name - your.email@example.com
Project Link: https://github.com/skillm8s/skillm8s

## Acknowledgments
- Next.js Documentation
- Prisma Documentation
- TailwindCSS Documentation
