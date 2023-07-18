import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

// uint256 _totalAmount,
//         uint256 _percentage, // 0 ~ 100.00% => 0 ~ 10000
//         uint256 _epochDuration,
//         uint256 _amountOfEpochs,
//         uint256 _startTime

task('initialize', 'AddLiquidity for token A and token B')
    .addParam('amount', 'token amount')
    .addParam('percentage', 'percentage 0 ~ 100% - 0 ~ 10 000')
    .addParam('duration', 'Epoch Duration')
    .addParam('epochs', 'eppochs amount')
    .addParam('time', 'startTime')
    .addParam('contract', 'address of contract')
	.setAction(async ({ totalAmount, percentage, epochDuration, amountOfEpochs, startTime, contract }, { ethers }) => {
        const Farming = await ethers.getContractFactory('Farming')
        const farming = Farming.attach(contract)
        try
        { 
            const contractTx: ContractTransaction = await farming.initialize(totalAmount, percentage, epochDuration, amountOfEpochs, startTime);
            const contractReceipt: ContractReceipt = await contractTx.wait();
        }

        catch(error: any) {
         console.log(error.error);
        }
    })