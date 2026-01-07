
document.addEventListener("DOMContentLoaded", () => {
    const desktopIcons = document.querySelectorAll(".desktop-icon");
    const taskbar = document.getElementById("bottom-bar");

    desktopIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const appName = icon.dataset.app;
            const appWindow = document.getElementById(`${appName}-app`);

            // 1. Show the app window
            if (appWindow) {
                appWindow.style.display = "block";
                appWindow.classList.add("active"); // optional class
                makeWindowDraggable(appWindow);   // 👈 enable dragging
                // Load the app’s content dynamically
                loadAppContent(appName);
            }

            // 2. Check if taskbar icon already exists
            if (!taskbar.querySelector(`[data-app='${appName}']`)) {
                const taskbarIcon = document.createElement("div");
                taskbarIcon.classList.add("taskbar-app");
                taskbarIcon.dataset.app = appName;

                const img = icon.querySelector("img").cloneNode();
                img.style.width = "48px";
                img.style.height = "48px";

                taskbarIcon.appendChild(img);
                document.getElementById("taskbar-icon-wrapper").appendChild(taskbarIcon);


                // 3. Taskbar icon click toggles the window
                taskbarIcon.addEventListener("click", () => {
                    const isVisible = appWindow.style.display !== "none";
                    appWindow.style.display = isVisible ? "none" : "block";
                });
            }
        });

    });

    // 4. Close button logic
    const closeButtons = document.querySelectorAll(".close-btn");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const appWindow = btn.closest(".app-window");
            const appName = appWindow.dataset.app;

            // Hide the window
            appWindow.style.display = "none";

            // ✅ Remove taskbar icon
            const taskbarIcon = document.querySelector(`#bottom-bar [data-app='${appName}']`);
            if (taskbarIcon) taskbarIcon.remove();
        });
    });

    function loadAppContent(appName) {
        const appWindow = document.getElementById(`${appName}-app`);
        const contentArea = appWindow.querySelector(".app-content");

        fetch(`apps/${appName}.html`)
            .then(res => res.text())
            .then(html => {
                contentArea.innerHTML = html;

                // 👇 NEW BLOCK
                const temp = document.createElement("div");
                temp.innerHTML = html;

                temp.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                    const newLink = document.createElement("link");
                    newLink.rel = "stylesheet";
                    newLink.href = `apps/${link.getAttribute("href").replace(/^apps\//, "")}`;
                    document.head.appendChild(newLink);
                });

                temp.querySelectorAll("script").forEach(script => {
                    const newScript = document.createElement("script");
                    newScript.src = `apps/${script.getAttribute("src").replace(/^apps\//, "")}`;

                    newScript.onload = () => {
                        // ✅ Automatically initialize any app with a known init() method
                        if (window.terminal_box && newScript.src.includes("terminal.js")) {
                            window.terminal_box.init();
                        }
                    };

                    document.body.appendChild(newScript);
                });




            });
    }


    function makeWindowDraggable(win) {
        const bar = win.querySelector(".title-bar");
        let offsetX = 0, offsetY = 0, isDown = false;

        bar.addEventListener("mousedown", e => {
            isDown = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            win.style.zIndex = 1000;       // bring to front
            document.body.style.userSelect = "none";
        });

        document.addEventListener("mouseup", () => {
            isDown = false;
            document.body.style.userSelect = "";
        });

        document.addEventListener("mousemove", e => {
            if (!isDown) return;
            win.style.left = e.clientX - offsetX + "px";
            win.style.top = e.clientY - offsetY + "px";
        });
    }

    function updateDateTime() {
        const now = new Date();

        const date = now.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });

        const time = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        });

        document.getElementById("datetime").textContent = `${date} • ${time}`;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

});
