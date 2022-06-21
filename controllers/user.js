const Auth = require('../models/auth');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res, next) => {
    res.render('register', {
        pageTitle: 'Register',
        path: '/register',
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.postRegisterUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const registerAs = req.body.registerAs == 'seller' ? 3 : 2;

    Auth.findOne({email: email})
    .then(existingUser => {
        if(existingUser){
            return res.redirect('/register');
        }

        return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
        const user = new Auth({
            name: name,
            email: email,
            password: hashedPassword,
            userType: registerAs
        });
        return user.save();
    })
    .then(result => {
        console.log('User Created');
        return res.redirect('/login');
    })
    .catch(err => console.log(err));
};

exports.loginUser = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
        path: '/login',
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.postLoginUser = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    Auth.findOne({email: email})
    .then(user => {
        if(!user){
            return res.redirect('/register');
        }
        
        bcrypt.compare(password,user.password)
        .then(matched => {
            if(matched){
                req.session.isLoggedIn = true;
                req.session.user = user; 

                

                return req.session.save(err => {
                    console.log(err);
                    if(user.userType == 1){
                        return res.redirect('/admin/dashboard');
                    }
                    else if ( user.userType == 3 ){
                        return res.redirect('/seller/dashboard');
                    }
                    return res.redirect('/buyer/dashboard');
                });
            }
            res.redirect('/login');
        });
    });
    
};

exports.dashboard = (req, res, next) => {
    if(req.session.user.userType == 3)
    {
        return res.render('seller/dashboard', {
            pageTitle: 'Seller Dashboard',
            path: '/seller/dashboard',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    }
    else{
        return res.render('buyer/dashboard', {
            pageTitle: 'Buyer Dashboard',
            path: '/buyer/dashboard',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    }
};

exports.logout = (req, res, next) => {
    req.session.isLoggedIn = false;
    req.session.user = null;
    return req.session.save(err => {
        console.log(err);
        res.redirect('/');
    });
};