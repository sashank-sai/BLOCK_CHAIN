const Block =require('./block');
const cryptohash =require('./crypto-hash')
class blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }
    addBlock({data}){
       const newBlock = Block.mineBlock({
        prevblock:this.chain[this.chain.length-1],
        data
       });
       this.chain.push(newBlock);
    }
    replaceChain(chain)
    {
        if(chain.length<=this.chain.length)
        {
            console.error("the incomming chain is not longer");
        }
        if(!blockchain.isValidChain(chain))
        {
            console.error("the incomming chain is not valid");
        }
        this.chain=chain;
    }
    static isValidChain(chain)
    {
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) return false;
        for(let i=1;i<chain.length;i++)
        {
            const {timestamp,preHash,hash,data,nonce,difficulty} =chain[i];
            const realLastHash = chain[i-1].hash;
            const lastDifficulty =chain[i-1].difficulty;
            if(preHash!==realLastHash) return false;
            const validatedHash = cryptohash(timestamp,preHash,data,nonce,difficulty);
            if(hash!==validatedHash) return false;
            if(Math.abs(difficulty-lastDifficulty)>1) return false;

        }
        return true;
    }

}
const Blockchain= new blockchain();
Blockchain.addBlock({data:"hello"});
Blockchain.addBlock({data:"block 2"});
module.exports =blockchain;
/* console.log(Blockchain);

 const result =blockchain.isValidChain(Blockchain.chain);
console.log(result);   */