var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var querystring = require('querystring');
var beep = require('beepbeep');
var port = process.env.PORT || 3001;
var profanity = require('profanity-censor');

messageList=[]
app.get('/chat', function(req, res){
     new Client().get("https://chat-ezy.herokuapp.com/", function (data, response) {
       console.log(data+"!!!");
       console.log(typeof data);
       console.log(response+"@@@@");
       console.log(typeof response);
       console.log(JSON.stringify(data));
       console.log(querystring.stringify(response) + "$$$");

    });
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    var mess=".";
    socket.on('chat message', function(msg){
        beep(1);
        mess=msg;
        var clientIP = socket.request.connection.remoteAddress;
        console.log(clientIP);
        var uniqueId = clientIP.substring(18,20);
        //create Map Variable with IP/Username, display based on username
        console.log(clientIP + " " + mess);
        messageList.push(mess);
        io.emit('chat message', "Anonymous "+" : " +" " +profanity.filter(mess));

    });

});

http.listen(port, function(){
    console.log('listening on *:' + port);
});