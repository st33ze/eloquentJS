const acceptRequests = ["text/plain", "text/html", "application/json", "application/rainbows+unicorns"];

acceptRequests.forEach(request => {
    fetch("https://eloquentjavascript.net/author", {headers: {Accept: request}})
        .then(resp => resp.text())
        .then(function(text) {
            const div = document.createElement("p");
            div.appendChild(document.createTextNode(text));
            document.body.appendChild(div);
        })
})