// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title SimpleCrowdfund
 * @dev A streamlined crowdfunding contract supporting one campaign at a time.
 */
contract SimpleCrowdfund {
    address payable public owner;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    uint256 public pledged;
    bool public withdrawn;

    mapping(address => uint256) public contributions;

    event CampaignCreated(string title, uint256 goal, uint256 deadline);
    event Contributed(address indexed contributor, uint256 amount);
    event Refunded(address indexed contributor, uint256 amount);
    event Withdrawn(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(string memory _title, string memory _description, uint256 _goal, uint256 _duration) {
        require(_goal > 0, "Goal > 0");
        require(_duration > 0, "Duration > 0");
        owner = payable(msg.sender);
        title = _title;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + _duration;
        pledged = 0;
        withdrawn = false;

        emit CampaignCreated(_title, _goal, deadline);
    }

    function contribute() external payable {
        require(block.timestamp < deadline, "Campaign ended");
        require(msg.value > 0, "Contribution > 0");
        contributions[msg.sender] += msg.value;
        pledged += msg.value;
        emit Contributed(msg.sender, msg.value);
    }

    function refund() external {
        require(block.timestamp >= deadline, "Campaign not ended");
        require(pledged < goal, "Goal met");
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "Nothing to refund");
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit Refunded(msg.sender, amount);
    }

    function withdraw() external onlyOwner {
        require(block.timestamp >= deadline, "Campaign not ended");
        require(pledged >= goal, "Goal not met");
        require(!withdrawn, "Already withdrawn");
        withdrawn = true;
        uint256 amount = address(this).balance;
        owner.transfer(amount);
        emit Withdrawn(amount);
    }
}

