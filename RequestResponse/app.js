const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    if (req.url === "/home") {
        res.write("<html><body><h1>Welcome home</h1></body></html>");
    } else if (req.url === "/about") {
        res.write("<html><body><h1>Welcome to About Us page</h1></body></html>");
    } else if (req.url === "/node") {
        res.write("<html><body><h1>Welcome to my Node Js project</h1></body></html>");
    } else {
        res.write("<html><body><h1>Page not found</h1></body></html>");
    }
    
    res.end();
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});