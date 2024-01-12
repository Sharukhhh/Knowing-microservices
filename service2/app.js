import express from 'express';
const app = express();
import amqplib from 'amqplib';

let channel;
let connection;
async function connect() {
    try {
        const amqpServer = 'amqp:/localhost:5672';
        connection = await amqplib.connect(amqpServer);
        channel = await connection.createChannel();

        await channel.assertQueue('rabbit');

        channel.consume('rabbit' , data => {
            console.log(`Recieved ${Buffer.from(data.content)}`)
        })
    } catch (error) {
        console.log(error);
    }
}
connect();

app.get('/send' , () => {

})

app.listen(5000 , () => {
    console.log('Service 1 running successfully');
})