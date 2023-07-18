# Main information
TokenA address: [0xD266B5f9c59D056D01ed2CEB8B6ac11419c23860](https://goerli.etherscan.io/address/0xD266B5f9c59D056D01ed2CEB8B6ac11419c23860)

TokenB address: [0x02B107bb260F17f2F429950Adf41eB43703254FB](https://goerli.etherscan.io/address/0x02B107bb260F17f2F429950Adf41eB43703254FB)

AddLiquidity contract address: [0x11680743FBdc0e636D209c3196d1702204e1c06f](https://goerli.etherscan.io/address/0x11680743fbdc0e636d209c3196d1702204e1c06f)

LPpair address: [0x5Df696829C8E97a4CbAd7864f4bCAa0FDb89ECA9](https://goerli.etherscan.io/address/0x5df696829c8e97a4cbad7864f4bcaa0fdb89eca9#code)

## Installation
Clone the repository and install the dependencies using the following command:
```
npm i
```

## Deployment
Fill in the .env file and use the command:
```
npx hardhat run scripts/deployContract.ts --network goerli
```

## Task Running
Running a task: 
```
npx hardhat addLiquidity --token1 <token1 address> --token2 <token1 address> --amount1 5 --amount2 5 --contract 0x11680743FBdc0e636D209c3196d1702204e1c06f --network goerli
```