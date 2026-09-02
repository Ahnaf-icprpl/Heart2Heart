/**
 * Heart2Heart - Error Handling Middleware
 */

exports.notFound = (req, res, next) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found | Heart2Heart',
    path: req.originalUrl
  });
};

exports.serverError = (err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).render('pages/500', {
    title: 'A Gentle Pause | Heart2Heart',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};
