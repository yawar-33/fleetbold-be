const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const clientConfig = require('./config/client.config');
const db = require('./models');
const dbConfig = require('./config/db.config');
const morgan = require('../morgan-config'); // Import the custom Morgan configuration
const rolesSeeding = require('./seed/role.seed');
const userRoutes = require('./routes/user.routes');
const servicesRoutes = require('./routes/services.routes');
const servicesHeaderRoutes = require('./routes/servicesHeader.routes')
const membershipBenefitsRoutes = require('./routes/membershipBenefits.routes');
const membershipHeaderRoutes = require('./routes/membershipHeader.routes');
const howItWorksRoutes = require('./routes/howItWorks.routes');
const howItWorksHeaderRoutes = require('./routes/howItWorksHeader.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const testimonialHeaderRoutes = require('./routes/testimonialHeader.routes');
const pricingPlanRoutes = require('./routes/pricing.routes');
const pricingHeaderRoutes = require('./routes/pricingHeader.routes');
const faqRoutes = require('./routes/faq.routes');
const faqHeaderRoutes = require('./routes/faqHeader.routes');
const heroRoutes = require('./routes/hero.routes');
const navItemRoutes = require('./routes/navItem.routes');
const server = express();

// Enable security headers with helmet
server.use(helmet());

// Enable gzip compression for responses
server.use(compression());

// Set up CORS for specific origins
const corsOptions = {
 //origin: clientConfig.ORIGIN,
  origin:'http://localhost:3000'
};
server.use(cors(corsOptions));

// Use morgan with the custom tokens
server.use(
  morgan(
    ':method :url :colored-status :response-time ms - :colored-ip - :user-agent'
  )
);

// Enable rate limiting to protect against abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
server.use(limiter);

// Parse JSON and URL-encoded requests
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Connect to MongoDB and seed roles
db.mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    rolesSeeding();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1); // Exit the application on database connection failure
  });

// Define a root route
server.get('/', (req, res) => {
  res.json({message: 'Welcome to our production-ready application.'});
});

// Mount the routes
server.use('/api/auth', authRoutes);
server.use('/api/user', userRoutes);
server.use('/api/services', servicesRoutes);
server.use('/api/servicesHeader', servicesHeaderRoutes);
server.use('/api/membershipBenefits', membershipBenefitsRoutes);
server.use('/api/membershipHeader', membershipHeaderRoutes)
server.use('/api/howItWorks', howItWorksRoutes)
server.use('/api/howItWorksHeader', howItWorksHeaderRoutes)
server.use('/api/testimonial', testimonialRoutes)
server.use('/api/testimonialHeader', testimonialHeaderRoutes)
server.use('/api/pricingPlan', pricingPlanRoutes)
server.use('/api/pricingHeader', pricingHeaderRoutes)
server.use('/api/faq', faqRoutes)
server.use('/api/faqHeader', faqHeaderRoutes)
server.use('/api/hero', heroRoutes)
server.use('/api/navItem', navItemRoutes)
module.exports = server;
