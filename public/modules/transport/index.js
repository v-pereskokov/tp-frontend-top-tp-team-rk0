(function () {
    'use strict';

    class Transport {
        static Get(address) {
            return fetch(address, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then(function (response) {
                    if (response.status >= 400) {
                        throw response;
                    }

                    return response.json();
                });
        }

        static Post(address, body) {
            return fetch(address, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(function (response) {
                    if (response.status >= 400) {
                        throw response;
                    }

                    return response.json();
                });
        }
    }

    window.Transport = Transport;
})();