const input = document.getElementById("code");
const button = document.getElementById("button");
const output = document.getElementById("output");

button.addEventListener("click", () => output.textContent = Function(input.value)());