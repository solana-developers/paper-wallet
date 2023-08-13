var web3 = require('@solana/web3.js')
var fs = require('fs')
var bs58 = require('bs58')
var bip39 = require('bip39');

const MINEFOR = false//"da06"

let AMOUNT = process.argv[2]
if(!AMOUNT) AMOUNT=1

let accounts

for(let a=0;a<AMOUNT;a++){

  let result = web3.Keypair.generate();

  try{
    accounts = JSON.parse(fs.readFileSync("./accounts.json").toString())
  }catch(e){
    accounts = []
  }

  accounts.push(
    {address:result.publicKey.toBase58(),pk:bs58.encode(result.secretKey)}
  )
  console.log(result.publicKey.toBase58())

  fs.writeFileSync("./accounts.json",JSON.stringify(accounts).toString())
}
