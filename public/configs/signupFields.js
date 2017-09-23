(function () {
    'use strict';

    window.signupFields = [
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
                type: 'email',
                name: 'email',
                placeholder: 'Введите ваш E-Mail',
                required: 'required',
            },
        },
        {
            attrs: {
                type: 'password',
                name: 'password',
                placeholder: 'Придумайте пароль длиннее 4 символов',
                required: 'required',
                pattern: '^\\S{4,}$',
            },
        },
        {
            attrs: {
                type: 'submit',
                value: 'Зарегистрироваться',
            },
        },
    ];

})();