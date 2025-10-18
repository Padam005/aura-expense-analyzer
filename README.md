# 🚀 Aura Expense Analyzer - Full-Stack Expense Scheduler

A comprehensive, AI-powered expense management application built with React, TypeScript, and Supabase. Features intelligent expense tracking, budget management, receipt OCR, calendar integration, and predictive analytics.

## ✨ Features

### 🎯 Core Features
- **💰 Expense Management**: Add, edit, delete, and categorize expenses
- **📊 Budget Tracking**: Set monthly budgets with real-time validation
- **🌙 Dark/Light Theme**: Beautiful theme switching with system preference detection
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🤖 AI-Powered Features
- **🧠 AI Expense Categorizer**: Automatically categorizes expenses using AI
- **📈 AI Predictor**: Predicts future expenses based on spending patterns
- **💬 Smart Chatbot**: Ask questions about your spending habits
- **📄 Receipt OCR**: Upload receipts for automatic expense extraction

### 📅 Advanced Features
- **📆 Calendar Integration**: Visual calendar view of expenses and recurring payments
- **🔔 Reminder System**: Set up bill reminders and recurring expense notifications
- **📊 Advanced Analytics**: Comprehensive charts and spending insights
- **🎨 Modern UI**: Built with ShadCN UI components and Tailwind CSS

### 🛡️ Security & Performance
- **🔐 User Authentication**: Secure login/signup with Supabase Auth
- **🛡️ Row Level Security**: Database-level security for user data
- **⚡ Real-time Updates**: Live data synchronization
- **📱 PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ShadCN UI** for components
- **Recharts** for data visualization
- **React Router** for navigation
- **TanStack Query** for data fetching

### Backend
- **Supabase** for backend-as-a-service
- **PostgreSQL** database
- **Row Level Security** for data protection
- **Real-time subscriptions**

### AI & Analytics
- **OpenAI API** for AI features
- **Edge Functions** for serverless processing
- **Advanced Chart Visualizations**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aura-expense-analyzer.git
   cd aura-expense-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   ```bash
   # Run the migrations in your Supabase dashboard
   # Or use the Supabase CLI
   supabase db push
   ```

5. **Start the development server**
   ```bash
npm run dev
```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Database Schema

### Tables
- **users**: User authentication (managed by Supabase Auth)
- **profiles**: User profile information
- **expenses**: Expense records with categories and dates
- **budgets**: Monthly budget tracking
- **reminders**: Bill reminders and notifications

### Key Features
- **Unique constraints** prevent duplicate budgets
- **Foreign key relationships** ensure data integrity
- **Row Level Security** protects user data
- **Automatic timestamps** for audit trails

## 🎨 UI Components

### Dashboard Sections
1. **📊 Overview**: Key metrics and recent expenses
2. **➕ Add Expense**: Manual expense entry with budget validation
3. **📄 Receipt OCR**: Upload receipts for automatic processing
4. **📈 Analytics**: Spending insights and trends
5. **📊 Advanced Charts**: Comprehensive data visualizations
6. **🤖 AI Predictor**: Future expense predictions
7. **💰 Budgets**: Monthly budget management
8. **📅 Calendar**: Visual expense calendar
9. **📄 Reports**: Detailed spending reports
10. **💳 Wallet**: Balance and payment tracking
11. **📋 Categories**: Expense categorization
12. **🐷 Savings**: Savings goals and tracking
13. **🔔 Reminders**: Bill and payment reminders
14. **⚠️ Alerts**: Budget warnings and notifications
15. **💬 Chat**: AI-powered expense assistant
16. **⚙️ Settings**: User preferences and configuration

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Supabase)
1. Create a new Supabase project
2. Run the database migrations
3. Configure Row Level Security policies
4. Set up Edge Functions for AI features

### Environment Variables
```env
# Frontend
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend (Supabase)
OPENAI_API_KEY=your_openai_api_key
```

## 📱 Mobile Support

The application is fully responsive and works great on mobile devices:
- **Touch-friendly interface**
- **Swipe gestures** for navigation
- **Mobile-optimized forms**
- **Progressive Web App** capabilities

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Structure
```
src/
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── ExpenseForm.tsx # Expense entry form
│   └── ...
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions
└── pages/              # Page components
```

## 🤖 AI Features

### Expense Categorization
- Automatically categorizes expenses based on description
- Uses OpenAI API for intelligent classification
- Learns from user corrections

### Predictive Analytics
- Analyzes spending patterns
- Predicts future expenses
- Provides budget recommendations

### Smart Chatbot
- Natural language queries about expenses
- Budget advice and insights
- Spending pattern analysis

## 📊 Analytics & Insights

### Chart Types
- **Pie Charts**: Category distribution
- **Line Charts**: Spending trends over time
- **Bar Charts**: Category comparisons
- **Area Charts**: Monthly volume analysis
- **Radar Charts**: Multi-dimensional analysis

### Key Metrics
- Total spending
- Average expense amount
- Growth rate analysis
- Top spending categories
- Budget utilization

## 🔒 Security

### Data Protection
- **Row Level Security** on all tables
- **User authentication** via Supabase Auth
- **Encrypted data transmission**
- **No sensitive data in client code**

### Privacy
- User data is isolated per account
- No cross-user data access
- GDPR compliant data handling

## 🚀 Future Enhancements

### Planned Features
- **📱 Mobile App**: Native iOS/Android apps
- **💳 Bank Integration**: Direct bank account connections
- **🤝 Group Budgeting**: Shared budgets and expenses
- **📊 Advanced AI**: More sophisticated predictions
- **🌍 Multi-currency**: International expense support
- **📈 Investment Tracking**: Portfolio management
- **🔔 Smart Notifications**: Intelligent alerts
- **📱 Offline Support**: Offline expense tracking

### Business Extensions
- **💼 Enterprise Features**: Team expense management
- **🏦 Banking Partnerships**: Direct bank integrations
- **📊 Business Analytics**: Advanced reporting
- **🤖 AI Advisor**: Personalized financial advice
- **💳 Credit Card Integration**: Automatic transaction import

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShadCN UI** for beautiful components
- **Supabase** for backend infrastructure
- **OpenAI** for AI capabilities
- **Recharts** for data visualization
- **Tailwind CSS** for styling

## 📞 Support

For support, email support@aura-expense.com or create an issue on GitHub.

---

**Built with ❤️ for better financial management**