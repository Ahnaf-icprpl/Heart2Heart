/**
 * Heart2Heart Server Entry Point
 */

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ======================================================
  💖 Heart2Heart is running smoothly!
  🌸 A safe space where every feeling is held with care.
  🌐 URL: http://localhost:${PORT}
  ======================================================
  `);
});
