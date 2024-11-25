const express = require('express');
const path = require('path');
const app = express();

// Middleware to check working hours
const workHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = currentDate.getHours(); // Current hour (0 to 23)

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow access during working hours
  } else {
    res.send('<h1>Application is only available during working hours (Monday to Friday, 9:00 to 17:00)</h1>');
  }
};

// Apply middleware
app.use(workHoursMiddleware);

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { pageTitle: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { pageTitle: 'Contact Us' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
