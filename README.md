# Main information
1. Reward token address: [0xD266B5f9c59D056D01ed2CEB8B6ac11419c23860](https://goerli.etherscan.io/address/0xD266B5f9c59D056D01ed2CEB8B6ac11419c23860)

2. Staking token address: [0x5Df696829C8E97a4CbAd7864f4bCAa0FDb89ECA9](https://goerli.etherscan.io/address/0x5df696829c8e97a4cbad7864f4bcaa0fdb89eca9#code)


3. Farming contract address: [0x11680743FBdc0e636D209c3196d1702204e1c06f](https://goerli.etherscan.io/address/0xe46F4C4fa2A962Ea1DDd5c89C80Dd44e001A94d6#readContract)


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