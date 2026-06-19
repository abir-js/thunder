const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.innerText.toLowerCase();
    document.body.style.backgroundColor = color;
  });
});
