

const terminal = { 
    input: document.getElementById('terminal-input'),
    window: document.getElementById('terminal-window'),
    history: [],
    historyIndex: -1,

    commands: {
        help: () => ({
            type: 'system',
            content: `Available commands:
    - clear: Clear terminal
    - books: Fresh Take - Book Reports webpage
    - portfolio: My Portfolio (better representation vs my resume) [COMING SOON]
    - games: Games I have made [COMING SOON]
    - apps: Apps I have made [COMING SOON]
    - github: Open my GitHub profile (I don't mind frontend)
    - twitch: Open my Stream on Twitch.tv
    - youtube: Open my Youtube channel
    - kofi: Support me?
    - inspo: Check out @Vivi4n's website (that's where I got the inspo/"stole" some of the code)
    - location: Tells you where you are (virtually)
    - date: Show current date and time`
        }),
        listapps: () => ({
            type: 'system',
            content: `Available Apps:
            - Inf-OS         | Find more information about VeeOS
            - VeeOS Prompt   | The shell you are using right now
            - PortfoVIEW     | A portfolio viewing application
            - ResuVIEW       | A resume viewing application
            - InTouch        | View various contact and information
            - FileAdventurer | A file viewer`
        }),
        clear: () => {
            terminal.window.innerHTML = '';
            return null;
        },
        books: () => {
            window.open('books/index.html', '_blank');
            return {
                type: 'system',
                content: 'Opening GitHub profile...'
            };
        },
        portfolio: () => {
            return {
                type: 'success',
                content: 'COMING SOON'
            };
        },
        apps: () => {
            return {
                type: 'success',
                content: 'COMING SOON'
            };
        },
        games: () => {
            return {
                type: 'success',
                content: 'COMING SOON'
            };
        },
        github: () => {
            window.open('https://github.com/Vyl3y-dev', '_blank');
            return {
                type: 'system',
                content: 'Opening GitHub profile...'
            };
        },
        twitch: () => {
            window.open('https://www.twitch.tv/theterribleplayer', '_blank');
            return {
                type: 'system',
                content: 'Opening Twitch.tv/...'
            };
        },
        youtube: () => {
            window.open('https://www.youtube.com/@theterribleplayervy', '_blank');
            return {
                type: 'system',
                content: 'Opening Youtube.com/...'
            };
        },
        kofi: () => {
            window.open('https://ko-fi.com/vyl3ydev', '_blank');
            return {
                type: 'system',
                content: 'Opening kofi.com/...'
            };
        },
        location: () => ({
            type: 'success',
            content: `You are here: https://vyl3y-dev.github.io/`
        }),
        date: () => ({
            type: 'success',
            content: new Date().toLocaleString()
        }),
        yoan: () => ({
            type: 'success',
            content: `I love you lots babe <3 thanks for the inspo!`
        }),
    },

    init() {

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

document.addEventListener('DOMContentLoaded', () => {
  terminal.init();
});

