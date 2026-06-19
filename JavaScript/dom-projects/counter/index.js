import "./style.css"; // Adjust the file name to match your setup

const counter = document.getElementById("counter");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");

let count = counter.textContent;

incrementBtn.addEventListener("click", () => {
  count++;
  updateCounter();
});

decrementBtn.addEventListener("click", () => {
  count--;
  updateCounter();
});

function updateCounter() {
  counter.textContent = count;
}
