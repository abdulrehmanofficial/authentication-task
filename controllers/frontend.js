exports.getIndex = (req, res, next) => {
    res.render('frontend/index', {
        pageTitle: 'Welcome to Authentication System',
        path: '/',
        isLoggedIn: req.session.isLoggedIn
    });
};