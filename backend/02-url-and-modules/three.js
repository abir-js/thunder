const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const opreration = parsed.pathname.slice(1);
  const num1 = parsed.query.num1;
  const num2 = parsed.query.num2;

  let ans;
  if (opreration === "add") {
    ans = Number(num1) + Number(num2);
  }

  res.end(JSON.stringify(ans));
});

server.listen(3000, () => console.log("App is listening on 3000"));
