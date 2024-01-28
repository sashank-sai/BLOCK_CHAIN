const blockchain =require('./blockchain');
const Blockchain =new blockchain();
Blockchain.addBlock({data:"new data"});
let prevTimeStamp,nextTimeStamp,nextBlock,timeDiff,avgTime;
const times =[];
for(let i=0;i<1000;i++)
{
    prevTimeStamp=Blockchain.chain[Blockchain.chain.length-1].timestamp;
    Blockchain.addBlock({data:`Block ${i}`});
    nextBlock=Blockchain.chain[Blockchain.chain.length-1];
    nextTimeStamp=nextBlock.timestamp;
    timeDiff=nextTimeStamp-prevTimeStamp;
    times.push(timeDiff);
    averageTime=times.reduce((total,num)=>(total+num))/times.length;            
    console.log(`time to mine block ${timeDiff} :difficulty: ${nextBlock.difficulty},average time ${averageTime}`)                                                                                                   
}