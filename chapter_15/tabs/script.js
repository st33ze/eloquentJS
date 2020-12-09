function asTabs(node) {
    // Create menu.
    const menu = document.createElement("div");
    menu.className = "menu";
    const tabs = node.children;

    for (let i = 0; i < tabs.length; i++) {
        const tabName = tabs[i].dataset["tabname"].toUpperCase();
        if (i !== 0) tabs[i].style.display = "none";

        const button = document.createElement("button");
        button.className = "menu-button";
        button.textContent = tabName;
        if(i === 0) button.classList.add("menu-button--active");
        button.addEventListener("click", changeTab);
        menu.appendChild(button);
    }

    document.body.prepend(menu);
}


function changeTab(e) {
    if (e.target.classList.contains("menu-button--active")) return;

    [...document.querySelector("tab-panel").children].forEach(tab => {
        tab.dataset["tabname"] === e.target.textContent.toLowerCase() ?
            tab.style.display = "block":
            tab.style.display = "none";
    });
    
    document.querySelectorAll(".menu-button").forEach(button => {
        if (button.classList.contains("menu-button--active"))
            button.classList.remove("menu-button--active");
    });
    
    e.target.classList.add("menu-button--active");
}


asTabs(document.querySelector("tab-panel"));