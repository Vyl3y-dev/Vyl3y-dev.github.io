window.terminal_box = {
    input: null,
    window: null,
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
        // Wait until the terminal elements are actually in the DOM
        const input = document.getElementById('terminal-input');
        const win = document.getElementById('terminal-window');

        if (!input || !win) {
            console.warn("⏳ Terminal DOM not ready — retrying...");
            setTimeout(() => this.init(), 50);
            return;
        }

        this.input = input;
        this.window = win;

        this.addLine('Hi there, welcome to my little portfolio 👋', 'system');
        this.addLine('Type "help" to see available commands', 'system');

        this.input.addEventListener('keydown', this.handleInput.bind(this));
        this.input.addEventListener('keyup', this.handleKeyUp.bind(this));

        console.log("✅ Terminal initialized successfully");
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
            if (!command) return;

            this.addLine(`❯ ${command}`);
            this.history.push(command);
            this.historyIndex = this.history.length;

            if (this.commands[command]) {
                const result = this.commands[command]();
                if (result) this.addLine(result.content, result.type);
            } else {
                this.addLine(`Command not found: ${command}`, 'error');
            }
            this.input.value = '';
        }
    },

    handleKeyUp(e) {
        if (e.key === 'Tab') e.preventDefault();
    }
};
