(function () {
    'use strict';

    class Block {
        constructor(el) {
            this.el = el;
        }

        static create(tagName = 'div', attrs = {}, text = null) {
            const el = document.createElement(tagName);
            for (let name in attrs) {
                el.setAttribute(name, attrs[name]);
            }

            if (text) {
                el.textContent = text;
            }

            return new Block(el);
        }

        clear() {
            this.el.innerHTML = '';
        }

        hide() {
            this.el.setAttribute('hidden', 'hidden');
        }

        show() {
            this.el.removeAttribute('hidden');
        }

        append(block) {
            this.el.appendChild(block.el);
            return this;
        }

        on(event, callback) {
            this.el.addEventListener(event, callback);
            return function () {
                this.el.removeEventListener(event, callback);
            }.bind(this);
        }
    }

    window.Block = Block;

})();
