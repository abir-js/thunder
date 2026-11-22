
const http = require("http");
const fs = require("fs");

// Read configuration
const configPath = "/etc/node-demo/config.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Log file path
const logPath = "/var/log/node-demo/application.log";

// Create server
const server = http.createServer((req, res) => {
    // Log every request
    const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;

    fs.appendFileSync(logPath, log);

    // API endpoint
    if (req.url === "/hello" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: config.message
        }));
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "Not Found"
        }));
    }
});

// Start server
server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
