/*server*/
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var http = require('http');

server.on('close',()=>{
    console.log('socket closed');
});

server.on('error',(err)=>{
    console.log(err);
});
server.on('listening',()=>{
    console.log('socket is listening..');
});
server.on('message',(msg,rinfo)=>{
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
    var options = {
        hostname: '127.0.0.1',
        port: 9001,
        path: '/gtw/rest/device/push',
        method: 'POST',
        headers: {
            'Content-Type': 'text',
            'Content-Length': Buffer.byteLength(msg)
        }
    };

    var req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

// write data to request body
    req.write(msg);
    req.end();

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        res.on('end',function(chunk){
            console.log("body: " + chunk);
        })
    });
});
server.bind(8061);