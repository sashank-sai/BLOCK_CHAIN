const {Genisis_Data, MINE_RATE} = require('./config'); 
const hexTobinary =require('hex-to-binary')
const cryptohash = require('./crypto-hash');
class Block{
    constructor({timestamp,preHash,hash,data,nonce,difficulty})//passing in the form of object so that even tho the declaration places are different we can control the exact declarations.
    {
        this.timestamp=timestamp;
        this.hash=hash;
        this.preHash=preHash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genesis(){
        return new this(Genisis_Data);
    }
    //mining function
    static mineBlock({prevblock,data}){
        let timestamp,hash;
        const preHash=prevblock.hash;
        let {difficulty}=prevblock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=this.adjustDifficulty({originalBlock:prevblock,timestamp});
            hash=cryptohash(timestamp,preHash,data,nonce,difficulty);
        }
        while(hexTobinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new Block //this also can be written insted of block
        (
            {
                timestamp,
                preHash,
                data,
                hash,
                difficulty,
                nonce
            }
        )
        
    }
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty}=originalBlock;
        if (difficulty<1) return 1;
        const difference = timestamp -  originalBlock.timestamp;
        if(difference>MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }
    
}
const block1=new Block({timestamp:"2/09/22",
                        preHash:"0x123",
                        hash:"0x345",
                        data:"hello"});
module.exports = Block;
/* const genesisBlock =Block.genesis();
const result =Block.minieBlock({prevblock:block1,data:'hello'})
console.log(result); */

