/*client*/
const dgram = require('dgram');
const client = dgram.createSocket('udp4'); //创建udp服务器

client.on('close',()=>{
    console.log('socket已关闭');
});

client.on('error',(err)=>{
    console.log(err);
});

client.on('listening',()=>{
    console.log('socket正在监听中...');
});

client.on('message',(msg,rinfo)=>{
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
});

function sendMsg(){
    var message = '<1-10086-1-2309>';
    client.send(message,0,message.length,8061,"127.0.0.1");
}

client.bind(8060);

setInterval(()=>{
    sendMsg();
    console.log("send message");
},1500);