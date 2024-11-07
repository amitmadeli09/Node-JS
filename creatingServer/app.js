const http=require("http");

const server = http.createServer((req,res)=>{
    console.log(req);

    res.writeHead(200,{"content-type":"text/plain"})
    res.end("Amit Madeli")
});

server.listen(4000,()=>{
    console.log("Server is running on port number 4000");
})