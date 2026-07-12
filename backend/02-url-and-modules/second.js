const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url.slice(1).split("/");

  if (url.length !== 3) {
    res.end("Invalid URL format. Use /operator/num1/num2");
    return;
  }

  if (
    typeof url[0] !== "string" ||
    isNaN(Number(url[1])) ||
    isNaN(Number(url[2]))
  ) {
    res.end("Invalid URL format. Use /operator/num1/num2");
    return;
  }

  const [operator, num1, num2] = url;

  let ans;
  if (operator === "add") {
    ans = Number(num1) + Number(num2);
    res.end(String(ans));
    return;
  } else if (operator === "sub") {
    ans = Number(num1) - Number(num2);
    res.end(String(ans));
    return;
  } else if (operator === "mul") {
    ans = Number(num1) * Number(num2);
    res.end(String(ans));
    return;
  } else if (operator === "div") {
    ans = Number(num1) / Number(num2);
    res.end(String(ans));
    return;
  } else {
    res.end("Invalid operator");
  }
});

server.listen(3000, () => console.log("App is listening on 3000"));
