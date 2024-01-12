import express from 'express';
const app = express();
import amqplib from 'amqplib';
/*
As message brokers, here we are using RabbitMQ.
It consist of channels and each channels have queue. 
5672 is default port of RabbitMQ
*/
let channel;
let connection;
async function connect() {
    try {
        const amqpServer = 'amqp:/localhost:5672';
        connection = await amqplib.connect(amqpServer);
        channel = await connection.createChannel();

        await channel.assertQueue('rabbit') //This queue named rabbit, if no such queue, creates automatically
    } catch (error) {
        console.log(error);
    }
}
connect();

app.get('/send' , async (req, res) => {
    const data = {
        name : 'Sharuk',
        age : 23
    }

    await channel.sendToQueue('rabbit' , Buffer.from(JSON.stringify(data))); //@nd params expect in buffer data

    await channel.close();
    await connection.close()

    return res.end('done');
})

app.listen(4000 , () => {
    console.log('Service 1 running successfully');
})