/**
 * Heart2Heart - Post Controller
 */

const store = require('../data/store');

exports.getNewPostPage = (req, res) => {
  const circles = store.getAllCircles();
  const preselectedCircle = req.query.circle || '';

  res.render('pages/create-post', {
    title: 'Share What’s on Your Heart | Heart2Heart',
    circles,
    preselectedCircle
  });
};

exports.createPost = (req, res) => {
  const {
    title,
    content,
    circleId,
    mood,
    moodEmoji,
    supportType,
    contentWarning,
    tags,
    isAnonymous
  } = req.body;

  if (!title || !content) {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(400).json({ success: false, message: 'Please provide both a title and your feelings content.' });
    }
    return res.redirect('/posts/new?error=Please+provide+both+a+title+and+your+feelings.');
  }

  const newPost = store.createPost({
    title,
    content,
    circleId: circleId || 'circle_anxiety',
    mood: mood || 'Overwhelmed',
    moodEmoji,
    supportType: supportType || 'Virtual Hugs Only',
    contentWarning,
    tags,
    isAnonymous
  }, store.getCurrentUser());

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json({ success: true, post: newPost, redirectUrl: `/posts/${newPost.id}` });
  }

  res.redirect(`/posts/${newPost.id}?success=Your+heartfelt+post+has+been+shared+safely.`);
};

exports.getPostDetail = (req, res) => {
  const { id } = req.params;
  const post = store.getPostById(id);

  if (!post) {
    return res.status(404).render('pages/404', {
      title: 'Post Not Found | Heart2Heart',
      path: req.originalUrl
    });
  }

  const currentUser = store.getCurrentUser();
  const isBookmarked = currentUser.bookmarkedPostIds && currentUser.bookmarkedPostIds.includes(post.id);
  const userReactions = (post.userReactions && post.userReactions[currentUser.id]) || [];

  // Related posts from the same circle
  const relatedPosts = store.getAllPosts({ circleId: post.circleId })
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  // Supportive prompt ideas for comments
  const supportivePrompts = [
    'I hear you, and your feelings are completely valid.',
    'Sending you the warmest virtual hug right now.',
    'You are carrying so much, please remember to be gentle with yourself.',
    'Thank you for being so vulnerable and sharing this with us.',
    'You are not alone in this storm.'
  ];

  res.render('pages/post-detail', {
    title: `${post.title} | Heart2Heart`,
    post,
    isBookmarked,
    userReactions,
    relatedPosts,
    supportivePrompts
  });
};

exports.addReaction = (req, res) => {
  const { id } = req.params;
  const { reactionType } = req.body;
  const currentUser = store.getCurrentUser();

  const result = store.toggleReaction(id, reactionType, currentUser.id);

  if (!result) {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(400).json({ success: false, message: 'Invalid reaction or post not found.' });
    }
    return res.redirect(`/posts/${id}`);
  }

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json(result);
  }

  res.redirect(`/posts/${id}`);
};

exports.addComment = (req, res) => {
  const { id } = req.params;
  const { content, isAnonymous } = req.body;

  if (!content || !content.trim()) {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(400).json({ success: false, message: 'Please type some kind words first.' });
    }
    return res.redirect(`/posts/${id}?error=Please+write+a+supportive+comment.`);
  }

  const newComment = store.addComment(id, { content, isAnonymous }, store.getCurrentUser());

  if (!newComment) {
    return res.redirect(`/posts/${id}?error=Could+not+add+comment.`);
  }

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json({ success: true, comment: newComment });
  }

  res.redirect(`/posts/${id}?success=Your+supportive+words+have+been+sent.`);
};

exports.toggleBookmark = (req, res) => {
  const { id } = req.params;
  const currentUser = store.getCurrentUser();

  const isBookmarked = store.toggleBookmark(id, currentUser.id);

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json({ success: true, isBookmarked });
  }

  const returnTo = req.body.returnTo || `/posts/${id}`;
  res.redirect(returnTo);
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const currentUser = store.getCurrentUser();

  const success = store.deletePost(id, currentUser.id);

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json({ success });
  }

  if (success) {
    res.redirect('/?info=Your+post+has+been+removed.');
  } else {
    res.redirect(`/posts/${id}?error=Could+not+delete+post.`);
  }
};
