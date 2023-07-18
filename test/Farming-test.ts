import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";


describe("Farming contract", function () {

  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, users: SignerWithAddress[];

  let Farming, Token1, Token2;
  let farming: Contract;
  let rewardToken: Contract;
  let stakingToken: Contract;

  beforeEach(async () => {
    [owner, user1, user2, ...users] = await ethers.getSigners();

    //deploy the main contract


    //deploy a test token A
    Token1 = await ethers.getContractFactory('MyToken');
    rewardToken = await Token1.deploy("TokenA", "TKA");

    //deploy a test token B
    Token2 = await ethers.getContractFactory('MyToken');
    stakingToken = await Token2.deploy("TokenB", "TKB");

    Farming = await ethers.getContractFactory('Farming');
    farming = await Farming.deploy(stakingToken.address, rewardToken.address);


    await rewardToken.approve(farming.address, ethers.utils.parseEther("1000"))
    

    const totalAmount = ethers.utils.parseEther("1000")
    const percentage = 1000 
    const epochDuration =  2678400
    const amountOfEpochs = 3
    const startTime = await time.latest()
    await farming.initialize(totalAmount, percentage, epochDuration, amountOfEpochs, startTime)
 
  })

  describe("Functionality test", async () => {
    it.only("test 1. Initialize", async () => {

        expect(await farming.tokensLeft())
          .to.be.eq(ethers.utils.parseEther("1000"))

        expect(await farming.percentage())
          .to.be.eq(1000)

        expect(await farming.epochDuration())
          .to.be.eq(2678400)

        expect(await farming.amountOfEpochs())
          .to.be.eq(3)

    })

    it.only("test 2. Deposit", async () => {

    })


  //   it("test 2. Call AddLiquidity without approve", async () => {
  //       // await rewardToken.mint(user1.address, ethers.utils.parseEther("1000"))
  //       // await stakingToken.mint(owner.address, ethers.utils.parseEther("1000"))
  //       // await rewardToken.approve(farming.address, ethers.utils.parseEther("1000"))
  //       // await stakingToken.connect(user1).approve(farming.address, ethers.utils.parseEther("1000"))

 
  //       await  expect(addLiquidity.addLiquidity(token1Contract.address, token2Contract.address, ethers.utils.parseEther("100"), ethers.utils.parseEther("100"),))
  //       .to.be.revertedWith("MyToken: Insufficient allowance")
        
  // })
})
})
