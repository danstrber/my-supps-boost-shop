
# MySupps E-commerce Platform - Comprehensive Project Knowledge

## Project Overview
**MySupps** is a React-based e-commerce platform specializing in performance enhancement supplements, SARMs, steroids, PCT products, and dermatology medications. The application features user authentication with a referral rewards system, shopping cart functionality, order management, and Bitcoin payment processing for enhanced privacy.

**Primary Goals:**
- Provide a secure, discreet platform for purchasing performance enhancement products
- Implement comprehensive user authentication with referral rewards system
- Support Bitcoin payments for customer privacy and security
- Maintain detailed product catalog with educational information
- Ensure compliance with legal requirements for supplement sales
- Deliver exceptional user experience with multi-language support (English/Spanish)

**Core Objectives:**
- Maintain 99.9% uptime for order processing
- Process Bitcoin payments within 1-2 block confirmations
- Provide detailed product education to reduce customer support queries
- Implement robust referral system to encourage customer acquisition
- Ensure mobile-responsive design for all device types

## User Personas

### Primary Persona - "Performance Athlete"
- **Demographics:** Age 25-40, Male/Female, Athletic background
- **Goals:** Muscle building, strength gains, competitive performance enhancement
- **Needs:** 
  - Detailed product specifications and cycle information
  - Discreet packaging and billing
  - Secure payment methods (Bitcoin preferred)
  - Post-cycle therapy guidance
  - Lab-tested product verification
- **Pain Points:** 
  - Legal concerns about product acquisition
  - Product authenticity verification
  - Understanding proper dosages and cycles
  - Finding reliable suppliers
- **Behavior:** Research-heavy, price-sensitive, values privacy

### Secondary Persona - "Fitness Enthusiast"
- **Demographics:** Age 20-35, Gym-goers, Bodybuilding hobbyists
- **Goals:** Body composition improvement, recovery enhancement, aesthetic gains
- **Needs:**
  - Educational content about products and usage
  - Clear cycle guidance and PCT requirements
  - Progress tracking and results documentation
  - Community recommendations and reviews
- **Pain Points:**
  - Information overload and conflicting advice
  - Understanding side effects and risks
  - Proper post-cycle therapy protocols
  - Budget management for cycles
- **Behavior:** Community-driven, seeks guidance, values education

### Tertiary Persona - "Store Administrator"
- **Demographics:** Business operations staff, Customer service representatives
- **Goals:** Efficient order management, customer satisfaction, regulatory compliance
- **Needs:**
  - Order verification and tracking tools
  - Customer communication systems
  - Inventory management capabilities
  - Payment verification systems
  - Reporting and analytics dashboards
- **Pain Points:**
  - Bitcoin transaction verification complexity
  - Regulatory compliance requirements
  - Customer education and support
  - Inventory forecasting
- **Behavior:** Process-oriented, compliance-focused, efficiency-driven

## Feature Specifications

### Core E-commerce Features

#### Product Catalog Management
**User Story:** As a customer, I want to browse products by category so I can find what I need quickly.
**Acceptance Criteria:**
- Display products in organized categories (SARMs, Steroids, PCT, Fat Burners, Dermatology)
- Show product images, prices, and basic specifications
- Filter by category, price range, and availability
- Sort by price, popularity, and newest additions
- Display featured products prominently
- Show lab-tested badges for verified products
- Mobile-responsive grid layout

#### Shopping Cart System
**User Story:** As a customer, I want to manage my cart items so I can review my purchase before checkout.
**Acceptance Criteria:**
- Add/remove items with quantity controls
- Persistent cart across browser sessions
- Real-time price calculation with discounts
- Display shipping costs and total
- Cart item count indicator in header
- Quick add-to-cart from product listings

#### User Authentication & Profiles
**User Story:** As a customer, I want to create an account so I can track orders and earn referral rewards.
**Acceptance Criteria:**
- Email/password registration and login
- Google OAuth integration
- Email verification process
- Password reset functionality
- User profile management with country selection
- Referral code generation and tracking
- Order history access

### Advanced Features

#### Referral Rewards System
**User Story:** As a customer, I want to earn discounts by referring friends so I can save money on future purchases.
**Acceptance Criteria:**
- Unique referral codes generated for each user
- Base discount: 10% for first referral + 4% for each additional (max 25%)
- Spending-based bonuses: 6% per $50 spent for referred users, 2% per $50 for referrers
- Maximum total discount cap of 30%
- Real-time discount calculation in cart
- Referral tracking dashboard

#### Bitcoin Payment Processing
**User Story:** As a customer, I want to pay with Bitcoin so I can maintain privacy and security.
**Acceptance Criteria:**
- Generate unique Bitcoin addresses per order
- Real-time Bitcoin price conversion
- Transaction verification through blockchain API
- Order status updates based on payment confirmation
- Payment timer with expiration handling
- Transaction hash recording and verification

#### Order Management System
**User Story:** As a customer, I want to track my order status so I know when to expect delivery.
**Acceptance Criteria:**
- Order creation with unique order IDs
- Status tracking (Pending, Verified, Shipped, Delivered)
- Email notifications for status changes
- Order history with detailed information
- Bitcoin transaction verification display
- Shipping address management

## Design System & Assets

### Visual Identity
- **Primary Brand Colors:** 
  - Blue: #3B82F6 (Primary actions, links)
  - Green: #10B981 (Success states, confirmations)
  - Gray: #F9FAFB (Backgrounds, neutral elements)
  - Red: #EF4444 (Errors, warnings)
- **Typography:** Inter font family, responsive sizing (14px-48px)
- **Logo:** Custom MySupps branding with supplement bottle imagery
- **Iconography:** Lucide React icons for consistency

### Component Library
- **UI Framework:** Tailwind CSS with shadcn/ui components
- **Layout:** Mobile-first responsive design
- **Navigation:** Sticky header with hamburger menu on mobile
- **Forms:** Consistent styling with validation states
- **Buttons:** Gradient backgrounds with hover animations
- **Cards:** Elevated shadows with rounded corners
- **Modals:** Overlay with backdrop blur effects

### Product Photography Standards
- **Format:** High-resolution PNG images (minimum 800x600px)
- **Background:** Clean white or transparent backgrounds
- **Lighting:** Professional product photography lighting
- **Angles:** Primary front view with optional detail shots
- **Branding:** Consistent label and packaging design
- **File Naming:** Product ID based naming convention

## API Documentation

### Supabase Integration
**Base URL:** `https://kunluppghxdqfqjxruwv.supabase.co`
**Project ID:** `c74b3a41-a701-4bc3-8fec-566d76fa7894`

#### Authentication Endpoints
```typescript
// User Registration
POST /auth/v1/signup
{
  email: string,
  password: string,
  data: {
    name?: string,
    referred_by?: string
  }
}

// User Login
POST /auth/v1/token
{
  email: string,
  password: string,
  grant_type: "password"
}

// Get Current User
GET /auth/v1/user
Headers: { Authorization: "Bearer <token>" }
```

#### Database Operations
```typescript
// Fetch User Profile
GET /rest/v1/users?auth_id=eq.<user_id>
Headers: { 
  Authorization: "Bearer <token>",
  apikey: "<anon_key>"
}

// Create Order
POST /rest/v1/orders
{
  user_id: string,
  items: OrderItem[],
  original_total: number,
  discount_amount: number,
  shipping_fee: number,
  final_total: number,
  payment_method: string,
  bitcoin_address: string,
  bitcoin_amount: number
}

// Fetch Order History
GET /rest/v1/orders?user_id=eq.<user_id>&order=created_at.desc
Headers: { Authorization: "Bearer <token>" }
```

### Custom Database Functions
```sql
-- Generate unique referral codes
SELECT public.generate_referral_code();

-- Calculate user discount percentage
SELECT public.calculate_user_discount('<user_auth_id>');
```

## Database Schema

### Core Tables Structure

#### Users Table
```sql
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users NOT NULL,
  email text,
  name text,
  referral_code text UNIQUE NOT NULL,
  referred_by text REFERENCES users(referral_code),
  total_spending numeric DEFAULT 0,
  referred_spending numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

#### Orders Table
```sql
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(auth_id) NOT NULL,
  items jsonb NOT NULL,
  original_total numeric NOT NULL,
  discount_amount numeric DEFAULT 0,
  shipping_fee numeric DEFAULT 10.00,
  final_total numeric NOT NULL,
  payment_method text NOT NULL,
  bitcoin_address text,
  bitcoin_amount numeric,
  transaction_hash text,
  status text DEFAULT 'pending',
  verification_status text DEFAULT 'pending',
  payment_details jsonb,
  verification_details jsonb,
  created_at timestamp with time zone DEFAULT now(),
  verified_at timestamp with time zone
);
```

#### Referrals Table
```sql
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES users(id) NOT NULL,
  referred_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(referrer_id, referred_id)
);
```

### Row Level Security Policies
- **Users:** Can only view/update own profile
- **Orders:** Can only access own orders
- **Referrals:** Can view referrals where they are referrer or referred

## Environment Setup & Configuration

### Development Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "^5.0.0",
  "vite": "^4.0.0",
  "tailwindcss": "^3.3.0",
  "@supabase/supabase-js": "^2.50.0",
  "react-router-dom": "^6.26.2",
  "react-hook-form": "^7.53.0",
  "lucide-react": "^0.462.0",
  "recharts": "^2.12.7"
}
```

### Configuration Files
- `vite.config.ts` - Build tool configuration
- `tailwind.config.ts` - CSS framework configuration  
- `tsconfig.json` - TypeScript compiler options
- `supabase/config.toml` - Supabase project settings

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Preview production build
npm run preview
```

### Environment Variables (Supabase Secrets)
- `SUPABASE_URL` - Project API URL
- `SUPABASE_ANON_KEY` - Public API key
- `SUPABASE_SERVICE_ROLE_KEY` - Admin API key
- `server_key` - Bitcoin verification API key

## Testing Strategy

### Testing Pyramid
1. **Unit Tests (70%)**
   - Component rendering tests
   - Utility function tests
   - Hook behavior tests
   - Form validation tests

2. **Integration Tests (20%)**
   - API endpoint tests
   - Database operation tests
   - Authentication flow tests
   - Payment processing tests

3. **End-to-End Tests (10%)**
   - Complete user journeys
   - Cross-browser compatibility
   - Mobile responsiveness
   - Performance benchmarks

### Testing Guidelines
- **Framework:** Jest with React Testing Library
- **Coverage Target:** Minimum 80% code coverage
- **Mock Strategy:** Mock external APIs and Supabase calls
- **Performance:** Lighthouse scores > 90 for all metrics

## Deployment & Operations

### Deployment Pipeline
1. **Development:** Lovable platform with auto-preview
2. **Staging:** Feature branch deployment for testing
3. **Production:** Main branch deployment with custom domain

### Monitoring & Analytics
- **Error Tracking:** Console logging with error boundaries
- **Performance:** Core Web Vitals monitoring
- **User Analytics:** Privacy-compliant usage tracking
- **Uptime Monitoring:** 99.9% availability target

### Backup & Recovery
- **Database:** Automated daily backups via Supabase
- **Code:** GitHub integration with version control
- **Assets:** CDN storage with redundancy

## Security & Compliance

### Security Measures
- **Authentication:** Supabase Auth with JWT tokens
- **Authorization:** Row Level Security (RLS) policies
- **Data Protection:** HTTPS encryption in transit
- **Payment Security:** Bitcoin for enhanced privacy
- **Input Validation:** Zod schemas for all forms
- **XSS Prevention:** React built-in protections

### Compliance Requirements
- **Age Verification:** 18+ requirement for all purchases
- **Legal Disclaimers:** Clear product risk warnings
- **Privacy Policy:** GDPR/CCPA compliant data handling
- **Terms of Service:** Comprehensive usage agreements
- **Product Compliance:** Supplement industry regulations

### Data Privacy
- **Personal Data:** Minimal collection with explicit consent
- **Payment Data:** No credit card storage, Bitcoin only
- **User Tracking:** Anonymous analytics with opt-out
- **Data Retention:** Automatic cleanup of expired data

## Product Catalog

### Current Products (8 Total)

#### SARMs Category
1. **RAD-140 (Testolone)** - $55
   - 10mg x 50 capsules
   - Intermediate level
   - Featured product, lab tested

#### Oral Steroids Category  
2. **Superdrol (Methasterone)** - $25
   - 10mg x 50 capsules
   - Advanced level
   - Lab tested

#### Growth Hormone Category
3. **MK-677 (Ibutamoren)** - $45
   - 10mg x 50 capsules
   - Beginner level
   - Featured product

#### Fat Burners Category
4. **Clenbuterol** - $35
   - 40mcg x 50 capsules
   - Advanced level
   - Lab tested

#### PCT (Post Cycle Therapy) Category
5. **Enclomiphene Citrate** - $25
   - 25mg x 25 capsules
   - Intermediate level

6. **Aromasin (Exemestane)** - $25
   - 25mg x 10 capsules
   - Advanced level

7. **Clomid (Clomiphene)** - $30
   - 25mg x 40 capsules
   - Beginner level

#### Dermatology Category
8. **Accutane (Isotretinoin)** - $30
   - 10mg x 60 tablets
   - Advanced level
   - Lab tested

### Product Information Standards
Each product includes:
- Detailed descriptions and usage guidelines
- Dosage specifications and cycle information
- Expected effects and timeline
- Comprehensive side effects list
- Gender-specific considerations
- PCT requirements
- Stock status and lab testing badges

## Current Technical Debt & Action Items

### Immediate Fixes Required
1. **TypeScript Errors** - ✅ RESOLVED
   - Fixed Json type casting in useOrderHistory.tsx
   - Corrected database insert operations
   - Added proper type guards for payment_details

2. **Code Organization**
   - Consider refactoring large components (MainApp.tsx - 210 lines)
   - Split useOrderHistory.tsx into smaller focused modules
   - Create dedicated types file for order interfaces

3. **Performance Optimizations**
   - Implement React.memo for product grid components
   - Add lazy loading for product images
   - Optimize bundle size with code splitting

### Feature Enhancements
1. **Order Tracking** - Expand status updates with email notifications
2. **Product Reviews** - Add customer review system
3. **Inventory Management** - Real-time stock level updates
4. **Multi-currency** - Support additional cryptocurrencies
5. **Mobile App** - Consider React Native implementation

### Technical Improvements
1. **Testing Coverage** - Implement comprehensive test suite
2. **Error Handling** - Add global error boundary
3. **Loading States** - Improve UX with skeleton loaders
4. **Accessibility** - WCAG 2.1 AA compliance
5. **SEO Optimization** - Meta tags and structured data

## Success Metrics & KPIs

### Business Metrics
- **Conversion Rate:** Target 3-5% checkout completion
- **Average Order Value:** Target $75-100 per order
- **Customer Retention:** 40% repeat purchase rate
- **Referral Program:** 25% of new customers via referrals

### Technical Metrics
- **Page Load Speed:** < 3 seconds first contentful paint
- **Uptime:** 99.9% availability
- **Error Rate:** < 0.1% unhandled exceptions
- **Mobile Performance:** Lighthouse score > 90

### User Experience Metrics
- **Task Completion Rate:** > 95% for core flows
- **User Satisfaction:** NPS score > 50
- **Support Tickets:** < 5% of orders require support
- **Cart Abandonment:** < 70% abandonment rate

## Maintenance & Support

### Regular Maintenance Tasks
- **Weekly:** Review order verification queue
- **Monthly:** Update product inventory and pricing
- **Quarterly:** Security audit and dependency updates
- **Annually:** Full code review and refactoring assessment

### Support Procedures
1. **Order Issues:** Bitcoin verification support
2. **Account Problems:** Password resets and profile updates  
3. **Product Questions:** Cycle guidance and PCT recommendations
4. **Technical Issues:** Browser compatibility and mobile problems

### Documentation Updates
- Update this knowledge file monthly with new features
- Maintain API documentation with any schema changes
- Keep product information current with latest research
- Document any configuration or deployment changes

---

**Last Updated:** January 2025
**Version:** 1.0.0
**Maintained By:** MySupps Development Team

This knowledge file serves as the single source of truth for the MySupps e-commerce project. All team members should reference this document for project understanding and contribute updates as the project evolves.
