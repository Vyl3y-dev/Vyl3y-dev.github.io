const navButtons = document.querySelectorAll(".bot-nav button");
const tabs = document.querySelectorAll(".tab-content");

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabs.forEach(tab => {
            tab.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
    });
});