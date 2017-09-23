(function () {
    'use strict';

    window.signinFields = [
        {
            attrs: {
                type: 'text',
                name: 'login',
                placeholder: 'Введите ваш логин',
                required: 'required',
            },
        },
        {
            attrs: {
                type: 'password',
                name: 'password',
                placeholder: 'Введите пароль',
                required: 'required',
            },
        },
        {
            attrs: {
                type: 'submit',
                value: 'Войти',
            },
        },
    ];

})();