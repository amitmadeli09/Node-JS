const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const filePath = path.join(__dirname, "message.txt");

    fs.readFile(filePath, (err, data) => {
        const message = err ? "Enter Message" : data;

        if (url === "/") {
            res.write('<html>');
            res.write('<head><title>Message Board</title></head>');
            res.write(`<body><h1>${message}</h1>`);
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form>');
            res.write('</body></html>');
            return res.end();
        }

        if (url === '/message' && method === 'POST') {
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });

            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const newMessage = parsedBody.split("message=")[1]; 
                fs.writeFile(filePath, newMessage, err => {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                });
            });
        } else {
            res.setHeader("Content-type", "text/html");
            res.write('<html><head><title>Welcome</title></head><body><h1>Welcome to Node.js</h1></body></html>');
            res.end();
        }
    });
});

server.listen(3000, () => {
    console.log("Server is running on Port number 3000");
});