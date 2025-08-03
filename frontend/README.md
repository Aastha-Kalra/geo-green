# Geo Green E-commerce Frontend

A modern, responsive e-commerce website for agricultural products built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Customer Features

- **Home Page**: Hero section, featured products, categories, and company highlights
- **Products Page**: Advanced filtering, search, and sorting capabilities
- **Product Details**: Detailed product information with specifications and inquiry form
- **Contact Page**: Contact form with company information and map
- **About Page**: Company story, mission, values, and team information
- **Inquiry System**: Product-specific inquiry forms for customer requests

### Admin Features

- **Admin Login**: Secure authentication system
- **Admin Dashboard**: Overview of products, orders, and inquiries
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage customer orders
- **Inquiry Management**: Track and respond to customer inquiries

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **JavaScript**: ES6+ features

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ProductCard.jsx # Product display card
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Products.jsx    # Products listing page
│   ├── ProductDetails.jsx # Individual product page
│   ├── About.jsx       # About company page
│   ├── Contact.jsx     # Contact page
│   ├── AdminLogin.jsx  # Admin authentication
│   ├── AdminDashboard.jsx # Admin dashboard
│   └── InquiryForm.jsx # Product inquiry form
├── App.jsx             # Main app component with routing
├── main.jsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern UI**: Clean, professional design with green theme
- **Accessibility**: ARIA labels and semantic HTML
- **Loading States**: Spinner animations and skeleton screens
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation with visual feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Tailwind CSS

The project uses Tailwind CSS v4 with custom utilities:

- Custom line-clamp utilities for text truncation
- Custom scrollbar styling
- Smooth transitions for better UX

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Components

### ProductCard

- Displays product image, name, price, and category
- Shows offer badges when applicable
- Links to product details and inquiry form
- Responsive grid layout

### Header

- Responsive navigation with mobile menu
- Logo and brand identity
- Admin access link
- Sticky positioning

### ProductDetails

- Image gallery with thumbnails
- Product specifications table
- Quantity selector
- Inquiry and wishlist buttons

## 🔐 Authentication

The admin system uses JWT tokens stored in localStorage:

- Login: `/admin`
- Dashboard: `/dashboard` (protected)
- Automatic redirect on token expiration

## 📊 API Integration

The frontend integrates with the backend API endpoints:

- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Get single product
- `POST /api/contact` - Submit contact form
- `POST /api/inquiries` - Submit product inquiry
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Admin dashboard data

## 🎨 Customization

### Colors

The primary color scheme uses green tones:

- Primary: `#059669` (green-600)
- Secondary: `#047857` (green-700)
- Accent: `#10b981` (green-500)

### Typography

- Headings: Inter font family
- Body: System font stack
- Consistent spacing and sizing

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Email: info@geogreen.com
- Phone: +91 98765 43210
- Website: https://geogreen.com
