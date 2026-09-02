/**
 * Heart2Heart - Profile & Persona Controller
 */

const store = require('../data/store');

exports.getMyProfile = (req, res) => {
  const currentUser = store.getCurrentUser();
  const myPosts = store.getAllPosts({ authorId: currentUser.id });
  const bookmarkedPosts = store.getAllPosts({ bookmarkedBy: currentUser.id });
  const moodHistory = store.getMoodHistory(currentUser.id);
  const allUsers = store.getAllUsers();

  res.render('pages/profile', {
    title: `${currentUser.name} | My Safe Space | Heart2Heart`,
    user: currentUser,
    isSelf: true,
    myPosts,
    bookmarkedPosts,
    moodHistory,
    allUsers
  });
};

exports.getUserProfile = (req, res) => {
  const { id } = req.params;
  const currentUser = store.getCurrentUser();

  if (id === currentUser.id || id === 'me') {
    return res.redirect('/profile');
  }

  const user = store.getUserById(id);
  if (!user) {
    return res.status(404).render('pages/404', {
      title: 'Member Not Found | Heart2Heart',
      path: req.originalUrl
    });
  }

  const userPosts = store.getAllPosts({ authorId: user.id });

  res.render('pages/profile', {
    title: `${user.name} (@${user.handle}) | Heart2Heart`,
    user,
    isSelf: false,
    myPosts: userPosts,
    bookmarkedPosts: [],
    moodHistory: [],
    allUsers: store.getAllUsers()
  });
};

exports.switchUser = (req, res) => {
  const { userId } = req.body;
  const switched = store.setCurrentUser(userId);

  if (switched) {
    const returnTo = req.body.returnTo || '/';
    return res.redirect(`${returnTo}?success=Switched+active+persona+to+${encodeURIComponent(switched.name)}`);
  }

  res.redirect('/?error=Could+not+switch+persona');
};

exports.updateProfile = (req, res) => {
  const currentUser = store.getCurrentUser();
  const { name, bio, pronouns, avatar, avatarBg } = req.body;

  store.updateUserProfile(currentUser.id, {
    name,
    bio,
    pronouns,
    avatar,
    avatarBg
  });

  res.redirect('/profile?success=Your+profile+has+been+updated.');
};

exports.logMood = (req, res) => {
  const currentUser = store.getCurrentUser();
  const { moodValue, moodLabel, moodEmoji, note } = req.body;

  const log = store.logMood(currentUser.id, {
    moodValue,
    moodLabel,
    moodEmoji,
    note
  });

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json({ success: true, log });
  }

  const returnTo = req.body.returnTo || '/';
  res.redirect(`${returnTo}?success=Thank+you+for+checking+in+with+your+heart.`);
};
