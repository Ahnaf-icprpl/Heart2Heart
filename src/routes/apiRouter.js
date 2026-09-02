/**
 * Heart2Heart - JSON API Router (for async client-side micro-interactions)
 */

const express = require('express');
const router = express.Router();
const store = require('../data/store');

// Toggle reaction
router.post('/posts/:id/react', (req, res) => {
  const { id } = req.params;
  const { reactionType } = req.body;
  const currentUser = store.getCurrentUser();

  const result = store.toggleReaction(id, reactionType, currentUser.id);
  if (!result) {
    return res.status(400).json({ success: false, message: 'Could not update reaction' });
  }

  res.json(result);
});

// Toggle bookmark
router.post('/posts/:id/bookmark', (req, res) => {
  const { id } = req.params;
  const currentUser = store.getCurrentUser();
  const isBookmarked = store.toggleBookmark(id, currentUser.id);

  res.json({ success: true, isBookmarked });
});

// Join/leave circle
router.post('/circles/:id/join', (req, res) => {
  const { id } = req.params;
  const currentUser = store.getCurrentUser();
  const isJoined = store.toggleJoinCircle(id, currentUser.id);

  res.json({ success: true, isJoined });
});

// Log mood
router.post('/mood', (req, res) => {
  const currentUser = store.getCurrentUser();
  const { moodValue, moodLabel, moodEmoji, note } = req.body;

  const log = store.logMood(currentUser.id, {
    moodValue,
    moodLabel,
    moodEmoji,
    note
  });

  res.json({ success: true, log });
});

// Get random affirmation
router.get('/affirmations/random', (req, res) => {
  const affirmation = store.getRandomAffirmation();
  res.json({ success: true, affirmation });
});

module.exports = router;
