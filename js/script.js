document.getElementById("terminalInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = e.target.value.toLowerCase();
    let output = "";
    switch (cmd) {
      case "help":
        output = "> commands: help, clear, about";
        break;
      case "about":
        output = "> VeeOS v1.0 – handcrafted just for you";
        break;
      case "clear":
        document.querySelector(".app-content").innerHTML = "";
        return;
      default:
        output = "> command not found";
    }
    const pre = document.createElement("pre");
    pre.textContent = output;
    e.target.parentNode.insertBefore(pre, e.target);
    e.target.value = "";
  }
});