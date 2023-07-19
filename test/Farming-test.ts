import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import { log } from "console";


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

    await stakingToken.approve(farming.address, ethers.utils.parseEther("1000"))

 
  })

  describe("Functionality test", async () => {
    it("test 1. Initialize", async () => {

      expect(await farming.tokensLeft())
        .to.be.eq(ethers.utils.parseEther("1000"))

      expect(await farming.percentage())
        .to.be.eq(1000)

      expect(await farming.epochDuration())
        .to.be.eq(2678400)

      expect(await farming.amountOfEpochs())
        .to.be.eq(3)

    })

    it("test 2. Deposit", async () => {


        await farming.deposit(ethers.utils.parseEther("100"))
        let test = {}
        test = await farming.users(owner.address)
 
        expect(test["amount"])
        .to.be.eq(ethers.utils.parseEther("100"))
        expect(test["claimed"])
        .to.be.eq(false)
    })

    it("test 3. Deposit event", async () => {


      await expect(farming.deposit(ethers.utils.parseEther("100")))
      .to.emit(farming, "Deposited")
      .withArgs(owner.address, ethers.utils.parseEther("100"))
  })
    it("test 4. double deposit", async () => {


    await farming.deposit(ethers.utils.parseEther("100"))
    await expect(farming.deposit(ethers.utils.parseEther("100")))

    .to.be.revertedWith("You already have a deposit")
    })

    it("test 5. Withdraw", async () => {

      await farming.deposit(ethers.utils.parseEther("100"))

      let test1 = {}
      test1 = await farming.users(owner.address)

      await farming.withdraw()

      let test2 = {}
      test2 = await farming.users(owner.address)

      expect(test2["amount"])
      .to.be.eq(0)
    })

    it("test 6. double withdraw", async () => {

  
      await farming.deposit(ethers.utils.parseEther("100"))

      await farming.withdraw()

      await expect(farming.withdraw())
      .to.be.revertedWith("You don't have a deposit")
      })

    it("test 7. Withdraw event", async () => {

      await farming.deposit(ethers.utils.parseEther("100"))

      await expect(farming.withdraw())
      .to.emit(farming, "Withdraw")
      .withArgs(owner.address)
    })

    it("test 8. claimReward event", async () => {

      const epochDuration =  2678400
      const amountOfEpochs = 3

      await farming.deposit(ethers.utils.parseEther("100"))

      let test1 = {}
      test1 = await farming.users(owner.address)

      await time.increase(amountOfEpochs * epochDuration)

      expect(await farming.claimRewards())
      .to.emit(farming, "Claimed")
      .withArgs(owner.address, ethers.utils.parseEther("30"))
 
    })

  })
})
