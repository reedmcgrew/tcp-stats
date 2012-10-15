//Stats Collection
//(If the system grows, pull this paragraph out into another module)
var os = require("os");
var getStats = function (){
    return {
        "freemem": os.freemem(),
        "totalmem": os.totalmem(),
        "cpus": os.cpus()
    };
};

//Stats Server
//(If the system grows, pull this paragraph out into another module)
var net = require("net");
var settings = require("./settings");
var port = settings.port;
var handleConnection = function(socket){
    socket.on("data",function(data){
        var stats = JSON.stringify(getStats());
        socket.end(stats);
    });
    socket.on("close",function(error){
        error && console.info(error);
    });
};
var server = net.createServer(handleConnection)

//Main/Server Init
server.listen(port, function(){
    console.info("TCP Server listening on port "+port);
});
