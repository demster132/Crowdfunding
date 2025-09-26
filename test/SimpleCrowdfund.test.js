const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleCrowdfund", function () {
  let contract, owner, alice, bob;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    const SimpleCrowdfund = await ethers.getContractFactory("SimpleCrowdfund");
    contract = await SimpleCrowdfund.deploy("My Campaign", "Testing", ethers.utils.parseEther("1"), 60);
    await contract.deployed();
  });

  it("deploys with correct details", async function () {
    expect(await contract.title()).to.equal("My Campaign");
    expect(await contract.goal()).to.equal(ethers.utils.parseEther("1"));
  });

  it("accepts contributions", async function () {
    await contract.connect(alice).contribute({ value: ethers.utils.parseEther("0.2") });
    expect(await contract.pledged()).to.equal(ethers.utils.parseEther("0.2"));
  });

  it("refunds if goal not met", async function () {
    await contract.connect(alice).contribute({ value: ethers.utils.parseEther("0.5") });
    await ethers.provider.send("evm_increaseTime", [70]);
    await ethers.provider.send("evm_mine");
    await expect(() => contract.connect(alice).refund()).to.changeEtherBalance(alice, ethers.utils.parseEther("0.5"));
  });

  it("allows withdrawal if goal met", async function () {
    await contract.connect(alice).contribute({ value: ethers.utils.parseEther("1") });
    await ethers.provider.send("evm_increaseTime", [70]);
    await ethers.provider.send("evm_mine");
    await expect(() => contract.withdraw()).to.changeEtherBalance(owner, ethers.utils.parseEther("1"));
  });
});
