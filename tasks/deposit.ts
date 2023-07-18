import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task('deposit', 'AddLiquidity for token A and token B')
    .addParam('amount', 'deposit amount')
    .addParam('contract', 'address of contract')
	.setAction(async ({ amount, contract }, { ethers }) => {
        const Farming = await ethers.getContractFactory('Farming')
        const farming = Farming.attach(contract)
        try
        { 
            const contractTx: ContractTransaction = await farming.deposit(amount);
            const contractReceipt: ContractReceipt = await contractTx.wait();
            const event = contractReceipt.events?.find(event => event.event === 'Deposited');

            const eSender: Address = event?.args!['addr'];
            const eAmount: BigNumber = event?.args!['amount']; 

            console.log(`Sender address: ${eSender}`)
            console.log(`Token amount: ${eAmount}`)


        }
        catch(error: any) {
         console.log(error.error);
        }
    })