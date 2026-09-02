/**
 * Heart2Heart - Support Circles Controller
 */

const store = require('../data/store');

exports.getAllCircles = (req, res) => {
  const circles = store.getAllCircles();

  res.render('pages/circles', {
    title: 'Support Circles & Safe Rooms | Heart2Heart',
    circles
  });
};

exports.getCircleDetail = (req, res) => {
  const { id } = req.params;
  const circle = store.getCircleById(id);

  if (!circle) {
    return res.status(404).render('pages/404', {
      title: 'Circle Not Found | Heart2Heart',
      path: req.originalUrl
    });
  }

  const currentUser = store.getCurrentUser();
  const isMember = currentUser.circlesJoined && currentUser.circlesJoined.includes(circle.id);
  const posts = store.getAllPosts({ circleId: circle.id });

  res.render('pages/circle-detail', {
    title: `${circle.name} | Support Circle | Heart2Heart`,
    circle,
    isMember,
    posts
  });
};

exports.toggleJoinCircle = (req, res) => {
  const { id } = req.params;
  const currentUser = store.getCurrentUser();

  const isJoined = store.toggleJoinCircle(id, currentUser.id);

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.json({ success: true, isJoined });
  }

  const returnTo = req.body.returnTo || `/circles/${id}`;
  res.redirect(`${returnTo}?success=${isJoined ? 'Joined+support+circle!' : 'Left+support+circle.'}`);
};
