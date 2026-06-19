const quotes = [
  {
    quote: "Honesty is the best policy",
    author: "Abir Bhattacharjee",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
];

const button = document.querySelector("button");
button.addEventListener("click", () => {
  const h2 = document.querySelector("h2");

  const random = Math.floor(Math.random() * quotes.length);
  console.log(random);

  h2.textContent = quotes[random].quote;
});
