(function () {
    'use strict';

    const Transport = window.Transport;

    class UserService {
        constructor() {
            this.user = null;
        }

        signup(login, email, password) {
            return Transport.Post('/signup', {'login': login, 'email': email, 'password': password});
        }

        signin(login, password) {
            return Transport.Post('/signin', {'login': login, 'password': password});
        }

        logout(callback) {
            Transport.Get('logout')
                .then(function () {
                    this.user = null;
                    callback();
                }.bind(this));
        }

        isLoggedIn() {
            return !!this.user;
        }

        getData() {
            return Transport.Get('/me')
                .then(function (userdata) {
                    this.user = userdata;
                    return userdata;
                }.bind(this));
        }
    }

    window.UserService = UserService;
})();