// middlewares/deviceCheck.js

module.exports = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  if (!isMobile) {
    return res.redirect('/desktop-blocked');
  }

  next();
};
