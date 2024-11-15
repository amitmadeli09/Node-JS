const fs = require("fs");
const path = require("path");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];

            fs.writeFile("message.txt", message, (err) => {
                if (err) {
                    console.error("Failed to write file", err);
                    res.statusCode = 500;
                    res.write("<html><body><h1>Internal Server Error</h1></body></html>");
                    return res.end();
                }
                
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
        return;
    }

    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.JS Server</h1></body>");
    res.write("</html>");
    res.end();
};

module.exports = requestHandler;