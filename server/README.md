# StageConnect Backend API

Backend API for the StageConnect internship platform - connecting students with companies for internship opportunities.

## 🚀 Features

- **Authentication & Authorization** with JWT
- **Role-based Access Control** (Student/Company)
- **File Upload** (CV, Logo, Profile Pictures)
- **Email Notifications** 
- **Rate Limiting & Security**
- **Comprehensive Logging**
- **Data Validation**
- **RESTful API Design**

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile
- `POST /api/auth/change-password` - Change password

### Students
- `POST /api/students/profile` - Create student profile
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `POST /api/students/upload-cv` - Upload CV
- `GET /api/students/applications` - Get student applications

### Companies
- `POST /api/companies/profile` - Create company profile
- `GET /api/companies/profile` - Get company profile
- `PUT /api/companies/profile` - Update company profile
- `POST /api/companies/upload-logo` - Upload logo
- `GET /api/companies/internships` - Get company internships

### Internships
- `GET /api/internships` - Get all internships (public)
- `GET /api/internships/:id` - Get internship details
- `POST /api/internships` - Create internship (company only)
- `PUT /api/internships/:id` - Update internship (company only)
- `DELETE /api/internships/:id` - Delete internship (company only)
- `GET /api/internships/search` - Search internships

### Applications
- `POST /api/applications` - Apply to internship (student only)
- `GET /api/applications/student` - Get student applications
- `GET /api/applications/company` - Get company applications
- `PUT /api/applications/:id/status` - Update application status (company only)

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email service
- **Winston** - Logging
- **Express-validator** - Data validation
- **Helmet** - Security headers
- **Rate Limiting** - API protection

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd stageconnect/server
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure environment variables
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/stageconnect
JWT_SECRET=your-super-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

5. Start MongoDB server

6. Run the application
```bash
# Development
npm run dev

# Production
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/stageconnect` |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_USER` | Email username | - |
| `EMAIL_PASS` | Email password | - |
| `FRONTEND_URL` | Frontend URL | `http://localhost:3000` |

## 📊 Database Schema

### User Model
- Email, password, role (student/company)
- Verification status, activity tracking
- Profile reference

### Student Profile
- Personal information, education
- Skills, languages, CV upload
- Internship preferences

### Company Profile
- Company information, industry
- Contact details, social links
- Verification status

### Internship
- Job details, requirements
- Location, compensation
- Application management

### Application
- Application tracking
- Status workflow
- Interview scheduling

## 🔒 Security Features

- **JWT Authentication** with expiration
- **Password Hashing** with bcrypt
- **Rate Limiting** per endpoint
- **CORS Configuration**
- **Security Headers** with Helmet
- **Input Validation** and sanitization
- **File Upload Security**

## 📝 Logging

Comprehensive logging with Winston:
- Request/Response logging
- Error tracking
- Performance monitoring
- Security events

Log files stored in `logs/` directory:
- `combined.log` - All logs
- `error.log` - Errors only

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📧 Email Templates

Pre-built email templates:
- Welcome emails
- Application confirmations
- Interview notifications
- Password resets

## 🚀 Deployment

### Production Setup

1. Set environment variables
2. Configure MongoDB Atlas
3. Set up email service
4. Configure file storage (Cloudinary)
5. Enable SSL/TLS
6. Set up monitoring

### Docker Support

```bash
# Build image
docker build -t stageconnect-api .

# Run container
docker run -p 5000:5000 stageconnect-api
```

## 📈 Monitoring

- Health check endpoint: `/health`
- Request logging
- Error tracking
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

ISC License

## 🆘 Support

For issues and questions:
- Create GitHub issue
- Contact development team
- Check documentation
