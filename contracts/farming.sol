//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Farming {
    using SafeERC20 for IERC20Metadata;

    struct User {
        uint256 amount;
        uint256 depositTime;
        bool claimed;
        uint totalClaimed;
    }

    uint256 public constant HUNDRED_PERCENT = 10_000; // 100.00%

    address public owner;

    IERC20Metadata public stakingToken; // LP token

    IERC20Metadata public rewardToken; // token A or erc20

    uint256 public tokensLeft;

    uint256 public percentage;

    uint256 public startTime;

    uint256 public epochDuration;

    uint256 public amountOfEpochs;

    bool public initialized;

    mapping (address => User) public users;

    event Deposited(address addr, uint256 amount);
    event Withdraw(address addr);
    event Claimed(address addr, uint256 amount);

    constructor(address _stakingToken, address _rewardToken) {
        owner = msg.sender;
        stakingToken = IERC20Metadata(_stakingToken);
        rewardToken = IERC20Metadata(_rewardToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not an owner");
        _;
    }

    function initialize(
        uint256 _totalAmount,
        uint256 _percentage, // 0 ~ 100.00% => 0 ~ 10000
        uint256 _epochDuration,
        uint256 _amountOfEpochs,
        uint256 _startTime
    ) external onlyOwner {
        require(!initialized, "Already initialized");
        
        initialized = true;
        tokensLeft = _totalAmount;
        percentage = _percentage;
        startTime = _startTime;
        amountOfEpochs = _amountOfEpochs;
        epochDuration = _epochDuration;

        rewardToken.safeTransferFrom(
            msg.sender,
            address(this),
            ((_totalAmount * _percentage * _amountOfEpochs) / HUNDRED_PERCENT)
        );
    }

    function deposit(uint256 _amount) external {
        require(startTime <= block.timestamp, "Farming is not up yet!");
        require(_amount <= tokensLeft, "Too many tokens contributed");
        require(users[msg.sender].amount == 0, "You already have a deposit");

        users[msg.sender] = User({
            amount: _amount,
            depositTime: block.timestamp,
            claimed: false,
            totalClaimed: 0
        });

        tokensLeft -= _amount;
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
        emit Deposited(msg.sender, _amount);
    }

    function withdraw() external {
        require(users[msg.sender].amount > 0, "You don't have a deposit");
        uint _value = users[msg.sender].amount;
        users[msg.sender].amount = 0;
        tokensLeft += _value;
        stakingToken.transfer(msg.sender, _value);
        users[msg.sender].claimed = true;
        users[msg.sender].totalClaimed = 0;
        emit Withdraw(msg.sender);
    }

    function claimRewards() external {
        require(!users[msg.sender].claimed, "You don't have a deposit");
        require(users[msg.sender].depositTime + epochDuration < block.timestamp, "The Epoch is not over yet");
        //calculate amount of epoch
        uint256 rewardCount = (block.timestamp - users[msg.sender].depositTime) / epochDuration;
        if(rewardCount > amountOfEpochs) {
            rewardCount = amountOfEpochs;
        }
        //calculate a user's reward
        uint256 reward = (users[msg.sender].amount / HUNDRED_PERCENT * percentage) * rewardCount - users[msg.sender].totalClaimed;
        require(reward != 0, "You have no reward available for withdrawal");
        rewardToken.transfer(msg.sender, reward);
        users[msg.sender].totalClaimed += reward;
        emit Claimed(msg.sender, reward); 
    }
}