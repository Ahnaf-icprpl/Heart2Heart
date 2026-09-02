/**
 * Heart2Heart - In-Memory Data Store
 * Keeps initial seed data and handles runtime data additions/updates in-memory.
 */

const { v4: uuidv4 } = require('uuid');
const seedData = require('./seedData');

class DataStore {
  constructor() {
    // Deep clone seed data so mutations don't alter base module
    this.users = JSON.parse(JSON.stringify(seedData.users));
    this.circles = JSON.parse(JSON.stringify(seedData.circles));
    this.posts = JSON.parse(JSON.stringify(seedData.posts));
    this.dailyAffirmations = JSON.parse(JSON.stringify(seedData.dailyAffirmations));
    this.moodLogs = JSON.parse(JSON.stringify(seedData.moodLogs));
    this.crisisResources = JSON.parse(JSON.stringify(seedData.crisisResources));

    // Active user session id (defaults to Maya Patel)
    this.currentUserId = 'user_maya';
  }

  // --- User Operations ---
  getCurrentUser() {
    const user = this.users.find(u => u.id === this.currentUserId);
    return user || this.users[0];
  }

  setCurrentUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.currentUserId = user.id;
      return user;
    }
    return null;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  updateUserProfile(userId, data) {
    const user = this.getUserById(userId);
    if (!user) return null;
    if (data.name) user.name = data.name.trim();
    if (data.bio !== undefined) user.bio = data.bio.trim();
    if (data.avatar) user.avatar = data.avatar;
    if (data.avatarBg) user.avatarBg = data.avatarBg;
    if (data.pronouns !== undefined) user.pronouns = data.pronouns.trim();
    return user;
  }

  // --- Post Operations ---
  getAllPosts(filters = {}) {
    let result = [...this.posts];

    // Filter by circle
    if (filters.circleId) {
      result = result.filter(p => p.circleId === filters.circleId);
    }

    // Filter by mood
    if (filters.mood) {
      result = result.filter(p => p.mood.toLowerCase() === filters.mood.toLowerCase());
    }

    // Filter by support type
    if (filters.supportType) {
      result = result.filter(p => p.supportType.toLowerCase() === filters.supportType.toLowerCase());
    }

    // Filter by tag
    if (filters.tag) {
      const cleanTag = filters.tag.toLowerCase().replace('#', '');
      result = result.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === cleanTag));
    }

    // Filter by author
    if (filters.authorId) {
      result = result.filter(p => p.authorId === filters.authorId);
    }

    // Filter bookmarked by user
    if (filters.bookmarkedBy) {
      const user = this.getUserById(filters.bookmarkedBy);
      const bookmarkedIds = user ? user.bookmarkedPostIds || [] : [];
      result = result.filter(p => bookmarkedIds.includes(p.id));
    }

    // Sorting
    const sort = filters.sort || 'latest';
    if (sort === 'latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'most_hugs') {
      result.sort((a, b) => {
        const totalA = (a.reactions.hug || 0) + (a.reactions.hearYou || 0);
        const totalB = (b.reactions.hug || 0) + (b.reactions.hearYou || 0);
        return totalB - totalA;
      });
    } else if (sort === 'most_comments') {
      result.sort((a, b) => (b.comments.length || 0) - (a.comments.length || 0));
    }

    return result;
  }

  getPostById(id) {
    return this.posts.find(p => p.id === id);
  }

  createPost({
    title,
    content,
    circleId,
    mood,
    moodEmoji,
    supportType,
    contentWarning,
    tags,
    isAnonymous
  }, currentUser) {
    const user = currentUser || this.getCurrentUser();
    const circle = this.getCircleById(circleId);

    // Color mapper for support badges
    const badgeColorMap = {
      'Virtual Hugs Only': 'purple',
      'Gentle Advice Welcome': 'amber',
      'Just Need to Vent': 'emerald',
      'Looking for Similar Experiences': 'blue'
    };

    // Emoji mapper for mood if not provided
    const moodEmojiMap = {
      'Overwhelmed': '🌪️',
      'Exhausted': '😮‍💨',
      'Lonely': '🥀',
      'Hopeful': '🌱',
      'Healing': '🩹',
      'Overthinking': '💭',
      'Anxious': '🌧️',
      'Grateful': '✨',
      'Sad': '💧',
      'Calm': '🕊️'
    };

    const parsedTags = Array.isArray(tags)
      ? tags
      : (tags || '')
          .split(',')
          .map(t => t.trim().replace(/^#/, ''))
          .filter(t => t.length > 0);

    const anon = isAnonymous === true || isAnonymous === 'true' || isAnonymous === 'on';

    const newPost = {
      id: `post_${uuidv4().slice(0, 8)}`,
      authorId: anon ? `anon_${uuidv4().slice(0, 5)}` : user.id,
      isAnonymous: anon,
      authorName: anon ? 'Gentle Soul' : user.name,
      authorHandle: anon ? 'anonymous' : user.handle,
      authorAvatar: anon ? '🕊️' : user.avatar,
      authorAvatarBg: anon ? '#f1f5f9' : user.avatarBg,
      circleId: circleId || 'circle_anxiety',
      circleName: circle ? circle.name : 'General Care',
      title: title.trim(),
      content: content.trim(),
      mood: mood || 'Overwhelmed',
      moodEmoji: moodEmoji || moodEmojiMap[mood] || '🤍',
      supportType: supportType || 'Virtual Hugs Only',
      supportBadgeColor: badgeColorMap[supportType] || 'purple',
      contentWarning: contentWarning ? contentWarning.trim() : '',
      tags: parsedTags.length > 0 ? parsedTags : ['safe-space'],
      createdAt: new Date().toISOString(),
      reactions: {
        hug: 0,
        hearYou: 0,
        hope: 0,
        strong: 0,
        relate: 0
      },
      userReactions: {},
      comments: []
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  deletePost(postId, userId) {
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return false;

    const post = this.posts[postIndex];
    // Allow author or admin to delete
    if (post.authorId === userId || post.authorHandle === 'mayapatel' || userId === 'user_maya') {
      this.posts.splice(postIndex, 1);
      return true;
    }
    return false;
  }

  toggleReaction(postId, reactionType, userId) {
    const post = this.getPostById(postId);
    if (!post) return null;

    const allowedTypes = ['hug', 'hearYou', 'hope', 'strong', 'relate'];
    if (!allowedTypes.includes(reactionType)) return null;

    if (!post.userReactions) post.userReactions = {};
    if (!post.userReactions[userId]) post.userReactions[userId] = [];

    const userReactions = post.userReactions[userId];
    const index = userReactions.indexOf(reactionType);

    let isAdded = false;
    if (index > -1) {
      // Remove reaction
      userReactions.splice(index, 1);
      post.reactions[reactionType] = Math.max(0, (post.reactions[reactionType] || 1) - 1);
      isAdded = false;
    } else {
      // Add reaction
      userReactions.push(reactionType);
      post.reactions[reactionType] = (post.reactions[reactionType] || 0) + 1;
      isAdded = true;

      // Increment hugs given stats for current user
      const user = this.getUserById(userId);
      if (user && reactionType === 'hug') {
        user.hugsGiven = (user.hugsGiven || 0) + 1;
      }

      // Increment hugs received for post author if not anon
      if (!post.isAnonymous && post.authorId) {
        const author = this.getUserById(post.authorId);
        if (author && reactionType === 'hug') {
          author.hugsReceived = (author.hugsReceived || 0) + 1;
        }
      }
    }

    return {
      success: true,
      reactionType,
      isAdded,
      count: post.reactions[reactionType],
      totalReactions: post.reactions,
      userReactions: post.userReactions[userId]
    };
  }

  addComment(postId, { content, isAnonymous }, currentUser) {
    const post = this.getPostById(postId);
    if (!post) return null;

    const user = currentUser || this.getCurrentUser();
    const anon = isAnonymous === true || isAnonymous === 'true' || isAnonymous === 'on';

    const newComment = {
      id: `comm_${uuidv4().slice(0, 8)}`,
      authorId: anon ? `anon_${uuidv4().slice(0, 5)}` : user.id,
      isAnonymous: anon,
      authorName: anon ? 'A Kind Listener' : user.name,
      authorAvatar: anon ? '🌿' : user.avatar,
      authorAvatarBg: anon ? '#f1f5f9' : user.avatarBg,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      hugs: 0
    };

    if (!post.comments) post.comments = [];
    post.comments.push(newComment);

    return newComment;
  }

  toggleBookmark(postId, userId) {
    const user = this.getUserById(userId);
    if (!user) return false;

    if (!user.bookmarkedPostIds) user.bookmarkedPostIds = [];
    const index = user.bookmarkedPostIds.indexOf(postId);
    let isBookmarked = false;

    if (index > -1) {
      user.bookmarkedPostIds.splice(index, 1);
      isBookmarked = false;
    } else {
      user.bookmarkedPostIds.push(postId);
      isBookmarked = true;
    }

    return isBookmarked;
  }

  // --- Circles Operations ---
  getAllCircles() {
    const currentUser = this.getCurrentUser();
    return this.circles.map(circle => {
      const circlePosts = this.posts.filter(p => p.circleId === circle.id);
      const isMember = currentUser.circlesJoined && currentUser.circlesJoined.includes(circle.id);
      return {
        ...circle,
        postCount: circlePosts.length,
        isMember
      };
    });
  }

  getCircleById(id) {
    return this.circles.find(c => c.id === id || c.slug === id);
  }

  toggleJoinCircle(circleId, userId) {
    const user = this.getUserById(userId);
    const circle = this.getCircleById(circleId);
    if (!user || !circle) return false;

    if (!user.circlesJoined) user.circlesJoined = [];
    const index = user.circlesJoined.indexOf(circle.id);
    let isJoined = false;

    if (index > -1) {
      user.circlesJoined.splice(index, 1);
      circle.memberCount = Math.max(0, circle.memberCount - 1);
      isJoined = false;
    } else {
      user.circlesJoined.push(circle.id);
      circle.memberCount += 1;
      isJoined = true;
    }

    return isJoined;
  }

  // --- Mood Tracker Operations ---
  logMood(userId, { moodValue, moodLabel, moodEmoji, note }) {
    const newLog = {
      id: `mood_${uuidv4().slice(0, 8)}`,
      userId: userId || this.currentUserId,
      moodValue: parseInt(moodValue, 10) || 3,
      moodLabel: moodLabel || 'Neutral',
      moodEmoji: moodEmoji || '✨',
      note: note ? note.trim() : '',
      timestamp: new Date().toISOString()
    };

    this.moodLogs.unshift(newLog);
    return newLog;
  }

  getMoodHistory(userId) {
    const id = userId || this.currentUserId;
    return this.moodLogs
      .filter(m => m.userId === id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // --- Affirmations & Crisis ---
  getRandomAffirmation() {
    const list = this.dailyAffirmations;
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  getAllAffirmations() {
    return this.dailyAffirmations;
  }

  getCrisisResources() {
    return this.crisisResources;
  }

  // --- Global Search ---
  searchAll(query) {
    if (!query || query.trim() === '') {
      return { posts: [], circles: [], query: '' };
    }

    const q = query.trim().toLowerCase();

    const matchingPosts = this.posts.filter(p => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inContent = p.content.toLowerCase().includes(q);
      const inMood = p.mood.toLowerCase().includes(q);
      const inTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      const inAuthor = p.authorName.toLowerCase().includes(q);
      return inTitle || inContent || inMood || inTags || inAuthor;
    });

    const matchingCircles = this.circles.filter(c => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });

    return {
      query,
      posts: matchingPosts,
      circles: matchingCircles
    };
  }
}

// Singleton in-memory store
const store = new DataStore();
module.exports = store;
