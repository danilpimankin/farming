import {ethers, run, network} from 'hardhat'

const delay = async (time: number) => {
	return new Promise((resolve: any) => {
		setInterval(() => {
			resolve()
		}, time)
	})
}

async function main() {
  const uniswapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const uniswapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";



  const AddLiquidity = await ethers.getContractFactory("AddLiquidity");
  const addLiquidity = await AddLiquidity.deploy(uniswapRouter, uniswapFactory);

  await addLiquidity.deployed();

  console.log(
    `AddLiquidity contract deployed to ${addLiquidity.address}`
  );

  console.log('wait of delay...')
	await delay(15000) // delay 15 secons
	console.log('starting verify contract...')
	try {
		await run('verify:verify', {
			address: addLiquidity!.address,
			contract: 'contracts/AddLiquidity.sol:AddLiquidity',
			constructorArguments: [ uniswapRouter, uniswapFactory ],
		});
		console.log('verify success')
	} catch (e: any) {
		console.log(e.message)
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
