module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    const user = req.session.user;
    if(user.userType != 1){
        return res.redirect('/login');
    }

    next();
}