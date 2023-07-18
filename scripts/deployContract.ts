import {ethers, run, network} from 'hardhat'

const delay = async (time: number) => {
	return new Promise((resolve: any) => {
		setInterval(() => {
			resolve()
		}, time)
	})
}

async function main() {
  const rewardToken = "0xD266B5f9c59D056D01ed2CEB8B6ac11419c23860";
  const stakingToken = "0x5Df696829C8E97a4CbAd7864f4bCAa0FDb89ECA9";



  const Farming = await ethers.getContractFactory("Farming");
  const farming = await Farming.deploy(stakingToken, rewardToken);

  await farming.deployed();

  console.log(
    `Farming contract deployed to ${farming.address}`
  );

  console.log('wait of delay...')
	await delay(30000) // delay 30 secons
	console.log('starting verify contract...')
	try {
		await run('verify:verify', {
			address: farming!.address,
			contract: 'contracts/farming.sol:Farming',
			constructorArguments: [ stakingToken, rewardToken ],
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
