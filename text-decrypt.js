class DecryptedText {
    constructor(element, options = {}) {
        this.el = element;
        this.originalText = element.innerText || element.textContent;

        this.speed = options.speed || 30;
        this.maxIterations = options.maxIterations || 10;
        this.characters= options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

        this.interval = null;
        this.init();
    }
    init() {
            this.triggerDecrypt();
    }

    triggerDecrypt() {
        clearInterval(this.interval);
        let iteration = 0;

        this.interval = setInterval(() => {
            const scrambled = this.originalText
            .split('')
            .map((char, index) => {
                if (char == ' ')return ' ';

                if (index < (iteration / this.maxIterations) * this.originalText.length) {
                    return this.originalText[index];
                }

                return this.characters[Math.floor(Math.random() * this.characters.length)];
            })
            .join('');

            this.el.innerText = scrambled;

            if(iteration >= this.maxIterations) {
                clearInterval(this.interval);
                this.el.innerText= this.originalText;
            }

            iteration++;
        }, this.speed);
    }

    resetText() {
        clearInterval(this.interval);
        this.el.innerText = this.originalText;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.decrypt-me').forEach(el => {
        new DecryptedText(el, { speed: 60, maxIterations: 100});
    });
});