const express =require('express');
const bodyParser = require("body-parser");
const request =require("request");
const Blockchain = require("./blockchain")
const blockchain= new Blockchain();
const pubSub =require('./publishsubscribe')
const app =express()
const pubsub = new pubSub(blockchain);
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADRESS = `http://localhost:${DEFAULT_PORT}`
app.use(bodyParser.json());
setTimeout(()=> pubsub.broadcastChain(),1000);
app.get('/api/blocks',(req,res)=>
    {
        res.json(blockchain.chain);
    });
app.post('/api/mine',(req,res)=>
{
    const {data}=req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/api/blocks');

})
const synChains=()=>{
    request({url:`${ROOT_NODE_ADRESS}/api/blocks`},(erro,express,response,body)=>{
if(!erro && response.statusCode===200)
{
    const rootChain =JSON.parse(body);
    console.log('Replace chain on sync with',rootChain);
    blockchain.replaceChain(rootChain);}
})
}

let PEER_PORT;
if(process.env.GENERATE_PEER_PORT ==='true')
{
    PEER_PORT=DEFAULT_PORT+Math.ceil(Math.random()*1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>
{
    console.log(`listening to port :${PORT}`);
    synChains();
})