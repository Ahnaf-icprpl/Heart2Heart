/**
 * Current User & App Context Middleware
 * Automatically injects active user, sidebar communities, daily affirmation,
 * and view helper functions into res.locals for all EJS templates.
 */

const store = require('../data/store');

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

module.exports = (req, res, next) => {
  const currentUser = store.getCurrentUser();
  const allUsers = store.getAllUsers();
  const circles = store.getAllCircles();
  const dailyAffirmation = store.getRandomAffirmation();

  // Attach to res.locals for templates
  res.locals.currentUser = currentUser;
  res.locals.allUsers = allUsers;
  res.locals.navCircles = circles;
  res.locals.dailyAffirmation = dailyAffirmation;
  res.locals.activePath = req.path;
  res.locals.timeAgo = timeAgo;
  res.locals.query = req.query;

  // Flash message support
  res.locals.flash = {
    success: req.query.success || null,
    info: req.query.info || null,
    error: req.query.error || null
  };

  next();
};
