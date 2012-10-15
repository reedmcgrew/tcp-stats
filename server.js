var os = require("os");
var getStats = function (){
    return {
        "freemem": os.freemem(),
        "totalmem": os.totalmem(),
        "cpus": os.cpus()
    };
};

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

net.createServer(handleConnection).listen(port, function(){
    console.info("TCP Server listening on port "+port);
});
