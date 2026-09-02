/**
 * Heart2Heart - Feed Controller
 */

const store = require('../data/store');

exports.getFeed = (req, res) => {
  const { circle, mood, supportType, tag, sort } = req.query;

  const filters = {
    circleId: circle,
    mood,
    supportType,
    tag,
    sort: sort || 'latest'
  };

  const posts = store.getAllPosts(filters);
  const circles = store.getAllCircles();
  const currentCircle = circle ? store.getCircleById(circle) : null;

  // Mood options for quick filter pills
  const moodFilters = [
    { label: 'All Feelings', value: '', emoji: '✨' },
    { label: 'Overwhelmed', value: 'Overwhelmed', emoji: '🌪️' },
    { label: 'Exhausted', value: 'Exhausted', emoji: '😮‍💨' },
    { label: 'Lonely', value: 'Lonely', emoji: '🥀' },
    { label: 'Hopeful', value: 'Hopeful', emoji: '🌱' },
    { label: 'Healing', value: 'Healing', emoji: '🩹' },
    { label: 'Overthinking', value: 'Overthinking', emoji: '💭' },
    { label: 'Grateful', value: 'Grateful', emoji: '☀️' }
  ];

  res.render('pages/feed', {
    title: 'Heart2Heart | A Safe Space For Your Feelings',
    posts,
    circles,
    currentCircle,
    moodFilters,
    activeFilters: {
      circle: circle || '',
      mood: mood || '',
      supportType: supportType || '',
      tag: tag || '',
      sort: sort || 'latest'
    }
  });
};

exports.getSearch = (req, res) => {
  const { q } = req.query;
  const searchResults = store.searchAll(q || '');

  res.render('pages/search', {
    title: q ? `Search results for "${q}" | Heart2Heart` : 'Search | Heart2Heart',
    query: q || '',
    posts: searchResults.posts,
    matchingCircles: searchResults.circles
  });
};

exports.getMoods = (req, res) => {
  const allPosts = store.getAllPosts();
  const moods = [
    { name: 'Overwhelmed', emoji: '🌪️', desc: 'When the world feels too loud or heavy' },
    { name: 'Exhausted', emoji: '😮‍💨', desc: 'Physical and emotional fatigue seeking gentle rest' },
    { name: 'Lonely', emoji: '🥀', desc: 'Searching for soft connections and quiet company' },
    { name: 'Hopeful', emoji: '🌱', desc: 'Tiny green shoots of optimism and recovery' },
    { name: 'Healing', emoji: '🩹', desc: 'Moving through heartbreak, loss, or old scars' },
    { name: 'Overthinking', emoji: '💭', desc: 'Midnight spirals and unquiet thoughts' },
    { name: 'Grateful', emoji: '✨', desc: 'Recognizing small blessings and sweet victories' }
  ];

  const moodGroups = moods.map(m => {
    return {
      ...m,
      posts: allPosts.filter(p => p.mood.toLowerCase() === m.name.toLowerCase()).slice(0, 3),
      totalCount: allPosts.filter(p => p.mood.toLowerCase() === m.name.toLowerCase()).length
    };
  });

  res.render('pages/moods', {
    title: 'Explore Feelings | Heart2Heart',
    moodGroups
  });
};
