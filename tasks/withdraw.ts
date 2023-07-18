import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task('withdraw', 'AddLiquidity for token A and token B')
    .addParam('contract', 'address of contract')
	.setAction(async ({contract }, { ethers }) => {
        const Farming = await ethers.getContractFactory('Farming')
        const farming = Farming.attach(contract)
        try
        { 
            const contractTx: ContractTransaction = await farming.withdraw();
            const contractReceipt: ContractReceipt = await contractTx.wait();
            const event = contractReceipt.events?.find(event => event.event === 'Withdraw');

            const eSender: Address = event?.args!['addr'];

            console.log(`Recipient address: ${eSender}`)


        }
        catch(error: any) {
         console.log(error.error);
        }
    })