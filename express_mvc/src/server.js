
const app = require('./index');

const connect = require('./configs/db');

app.listen('4500', async ()=>{
    await connect();
    console.log("app is listening on 4500");
})