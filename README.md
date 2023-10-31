# paperwallet
Paper wallets to seed the [Burner codes](https://github.com/solana-developers/burner-codes) with private keys.

![paperwallets](https://user-images.githubusercontent.com/2653167/51704894-6c7be780-1fd7-11e9-8bf9-09d9a55f6943.jpg)

# Install
```bash
git clone https://github.com/solana-developers/paper-wallet
cd paper-wallet
npm i
```

# Generate Accounts
```bash
node generate.js <AMOUNT>
```

This will output an `accounts.json` file with the JSON format `[{address,pk}])`

# Airdrop to Accounts

First update the config found under `airdrop.js` with your RPC endpoint and location of your private key. Then run the airdrop command.

```bash
node airdrop.js <AMOUNT>
```

This will airdrop some amount of SOL to each wallet.

# Create Wallets from Accounts
```bash
node index.js
```

This will output `wallets.pdf`

Finally, print and fold your wallets!

# Edit Design and Copy
edit `template.html` to make changes and replace `front.png`, `back.png`, `inside-left.png`, and `inside-right.png` to update images

you can also set a global background with the `background.png` and a quick edit to `template.html`