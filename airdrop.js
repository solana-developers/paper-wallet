//***** WARNING *****//
// This code is pure garbage, and you will be sending potentially lots of cash with it.
// Use at your own risk and start with small verifying txs.
//TODO: Make this all better and incorporate clevis

const fs = require("fs");
const web3 = require("@solana/web3.js");

const CONFIG = {
  checkBalances: false, //True if you only want to check balances of all accounts
  provider: 'REPLACE_WITH_RPC',
  keypair: 'REPLACE_WITH_KEYPAIR',
  solAmount: 1,
}

let AMOUNT_OF_SOL_TO_SEND = process.argv[2]

if(!AMOUNT_OF_SOL_TO_SEND) AMOUNT_OF_SOL_TO_SEND=CONFIG.solAmount

const connection = new web3.Connection(CONFIG.provider, 'confirmed');
const secretKey = Uint8Array.from(fs.readFileSync(CONFIG.keypair).slice(0, 32));
const keypair = web3.Keypair.fromSeed(secretKey);

function main() {
  let accounts = []
  let accountsJson = JSON.parse(fs.readFileSync("./accounts.json").toString())
  for(let a in accountsJson){
    accounts[a] = accountsJson[a].address
  }

  checkBalances(accounts)
  if(!CONFIG.checkBalances) airDrop(accounts)
}

main()

function checkBalances(accounts) {
  accounts.forEach(async (account) => {
    const amount = await connection.getBalance(new web3.PublicKey(account));
    console.log(`Account ${account} has ${amount} SOL`);
  });
}

function airDrop(accounts) {
  accounts.forEach((account) => {
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new web3.PublicKey(account),
        lamports: web3.LAMPORTS_PER_SOL * AMOUNT_OF_SOL_TO_SEND,
      })
    );
    console.log(`Sending ${AMOUNT_OF_SOL_TO_SEND} SOL to ${account}`);
    web3.sendAndConfirmTransaction(connection, transaction, [keypair]);
    }
  )
}
