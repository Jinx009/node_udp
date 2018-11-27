/*client*/
var dgram = require("dgram");

var message = new Buffer("000118103000000768FFEA00001800034A01FF9D000063000B7E");

var client = dgram.createSocket("udp4");

client.send(message, 0, message.length, 7777, "106.14.94.245", function (err, bytes) {
    console.log(err);
    client.close();
});

//# sourceMappingURL=client-compiled.js.map