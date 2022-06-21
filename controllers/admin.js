exports.dashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        pageTitle: 'Admin Dashboard',
        path: '/admin/dashboard',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    });
};
