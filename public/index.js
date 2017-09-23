(function () {
    'use strict';

    const Block = window.Block;
    const Form = window.Form;
    const signinFields = window.signinFields;
    const signupFields = window.signupFields;
    const userService = new window.UserService();
    const Profile = window.Profile;

    const main = new Block(document.getElementsByClassName('main')[0]);

    const pages = {
        menu: Block.create('div', {'class': 'menu'}),
        signin: Block.create('div', {'class': 'signin'}),
        signup: Block.create('div', {'class': 'signup'}),
        aboutme: Block.create('div', {'class': 'aboutme'}),

        hide() {
            this.menu.hide();
            this.signin.hide();
            this.signup.hide();
            this.aboutme.hide();
        }
    };

    pages.hide();

    main
        .append(pages.menu)
        .append(pages.signin)
        .append(pages.signup)
        .append(pages.aboutme);

    function loadMenu() {
        if (userService.isLoggedIn()) {
            openAboutMe();
        } else {
            if (!pages.menu.ready) {
                pages.menu.items = {
                    signin: Block.create('button', {'class': 'signinButton'}, 'Войти'),
                    signup: Block.create('button', {'class': 'signupButton'}, 'Зарегистрироваться')
                }

                pages.menu.on('click', function (event) {
                    event.preventDefault();
                    const target = event.target;
                    const section = target.getAttribute('class');
                    switch (section) {
                        case 'signinButton':
                            openSignin();
                            break;
                        case 'signupButton':
                            openSignup();
                            break;
                    }
                });

                pages.menu
                    .append(Block.create('h2', {}, 'Меню'))
                    .append(pages.menu.items.signin)
                    .append(pages.menu.items.signup);

                pages.menu.ready = true;
            }

            pages.hide();
            pages.menu.show();
        }
    }

    function openAboutMe() {
        if (!pages.aboutme.ready) {
            pages.aboutme.profile = new Profile();
            pages.aboutme.logout = Block.create('button', {'class': 'logout'}, "Выйти");
            pages.aboutme.logout.on('click', userService.logout.bind(userService, loadMenu));

            pages.aboutme
                .append(Block.create('h2', {}, 'Мой профиль'))
                .append(pages.aboutme.profile)
                .append(pages.aboutme.logout);
            pages.aboutme.ready = true;
        }
        pages.hide();
        if (userService.isLoggedIn()) {
            userService.getData()
                .then(function (user) {
                    pages.aboutme.profile.update(user);
                    pages.aboutme.show();
                })
                .catch(function (err) {
                    alert(`${err.status}: ${err.statusText}`);
                    return loadMenu();
                });

            return;
        }
        return loadMenu();
    }

    function openSignin() {
        if (!pages.signin.ready) {
            pages.signin.form = new Form(signinFields);
            pages.signin.form.onSubmit(function (formdata) {
                userService.signin(formdata.login, formdata.password)
                    .then(function () {
                        return userService.getData();
                    })
                    .then(function () {
                        pages.signin.form.reset();
                        loadMenu();
                    })
                    .catch(function (response) {
                        response.json().then(result => {
                            alert(`${response.status}: ${response.statusText}\n${result.error}`);
                        });
                    });
            });
            pages.signin.back = Block.create('button', {'class': 'back'}, 'Назад')
            pages.signin.back.on('click', loadMenu);

            pages.signin
                .append(Block.create('h2', {}, 'Войдите'))
                .append(pages.signin.form)
                .append(pages.signin.back);
            pages.signin.ready = true;
        }

        pages.hide();
        pages.signin.show();
    }

    function openSignup() {
        if (!pages.signup.ready) {
            pages.signup.form = new Form(signupFields);
            pages.signup.form.onSubmit(function (formdata) {
                userService.signup(formdata.login, formdata.email, formdata.password)
                    .then(function () {
                        return userService.getData();
                    })
                    .then(function () {
                        pages.signup.form.reset();
                        loadMenu();
                    })
                    .catch(function (response) {
                        response.json().then(result => {
                            alert(`${response.status}: ${response.statusText}\n${result.error}`);
                        });
                    });
            });

            pages.signup.back = Block.create('button', {'class': 'back'}, 'Назад')
            pages.signup.back.on('click', loadMenu);

            pages.signup
                .append(Block.create('h2', {}, 'Регистрация'))
                .append(pages.signup.form)
                .append(pages.signup.back);
            pages.signup.ready = true;
        }

        pages.hide();
        pages.signup.show();
    }

    loadMenu();

    userService.getData()
        .then(function () {
            loadMenu();
        })
        .catch(function (error) {
        });
})();
