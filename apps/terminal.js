const terminal = {
    input: document.getElementById('terminal-input'),
    window: document.getElementById('terminal-window'),
    history: [],
    historyIndex: -1,

    commands: {
        help: () => ({
            type: 'system',
            content: `Available commands:
- about: Opening Inf-OS...
- contact: Opening InTouch...
- clear: Clear terminal
- github: Open my GitHub profile (I hate frontend)
- twitch: Open my Stream on Twitch.tv
- kofi: Support me?
- date: Show current date and time`
        }),
    },


    init() {
        this.addLine('Hi there, welcome to my little portfolio 👋', 'system');
        this.addLine('Type "help" to see available commands', 'system');

        this.input.addEventListener('keydown', this.handleInput.bind(this));
        this.input.addEventListener('keyup', this.handleKeyUp.bind(this));
    },

    addLine(content, type = 'default') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = content;
        this.window.appendChild(line);
        this.window.scrollTop = this.window.scrollHeight;
    },

    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim().toLowerCase();

            if (command) {
                this.addLine(`❯ ${command}`);
                this.history.push(command);
                this.historyIndex = this.history.length;

                if (this.commands[command]) {
                    const result = this.commands[command]();
                    if (result) {
                        this.addLine(result.content, result.type);
                    }
                } else {
                    this.addLine(`Command not found: ${command}. Did you make a typo? "help" to view them all.`, 'error');
                }
            }

            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                this.input.value = '';
            }
        }
    },

    handleKeyUp(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    terminal.init();
});