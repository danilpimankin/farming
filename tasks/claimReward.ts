import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task('claim', 'AddLiquidity for token A and token B')
    .addParam('contract', 'address of contract')
	.setAction(async ({contract }, { ethers }) => {
        const Farming = await ethers.getContractFactory('Farming')
        const farming = Farming.attach(contract)
        try
        { 
            const contractTx: ContractTransaction = await farming.claimRewards();
            const contractReceipt: ContractReceipt = await contractTx.wait();
            const event = contractReceipt.events?.find(event => event.event === 'Claimed');

            const eSender: Address = event?.args!['addr'];
            const eAmount: BigNumber = event?.args!['amount']; 

            console.log(`Recipient address: ${eSender}`)
            console.log(`Reward amount: ${eAmount}`)


        }
        catch(error: any) {
         console.log(error.error);
        }
    })