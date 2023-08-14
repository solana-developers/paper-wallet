# paperwallet
Paper wallets to seed the [Burner codes](https://github.com/solana-developers/burner-codes) with private keys.

![paperwallets](https://user-images.githubusercontent.com/2653167/51704894-6c7be780-1fd7-11e9-8bf9-09d9a55f6943.jpg)

# install
```bash
git clone https://github.com/solana-developers/paper-wallet
cd paper-wallet
npm i
```

# generate accounts
```bash
node generate.js
```
(This will output an `accounts.json` file with the JSON format `[{address,pk}])`

# edit design and copy
edit `template.html` to make changes and replace `front.png`, `back.png`, `inside-left.png`, and `inside-right.png` to update images

you can also set a global background with the `background.png` and a quick edit to `template.html`

# create wallets from accounts
```bash
node index.js
```

(this will output `wallets.pdf`)

# print wallets
```bash
lp wallets.pdf
```

-------------------------

You can print out `private.svg` if you are in a pinch.

![walletsinfold](https://user-images.githubusercontent.com/2653167/51705218-3ab75080-1fd8-11e9-9495-66458938d9f9.jpg)


# batch generation

If you want to make a large batch of wallets and merge them into a single pdf for ease of printing, there is a `batch.js`:

First, get your `template.html` looking right.

Then, edit `HOWMANY` in the `batch.js` and run it:
```
node batch.js
```
This will generate a file called `wallets.pdf` and also `addresses.txt` for airdropping.

![image](https://user-images.githubusercontent.com/2653167/55583840-18306a80-56e0-11e9-80ef-16d177b415fa.png)

Finally... print, fold, cut, and glue your way to freedom!

![paperwalletprinted](https://user-images.githubusercontent.com/2653167/55584775-48790880-56e2-11e9-93b6-4034c2b0ff5d.jpg)