const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const goal = hre.ethers.parseEther("1"); // 1 ETH goal
  const duration = 3600; // 1 hour

  const Crowdfunding = await hre.ethers.getContractFactory("SimpleCrowdfund");
  const contract = await Crowdfunding.deploy(
    "My Campaign",
    "Demo crowdfunding project",
    goal,
    duration
  );

  await contract.waitForDeployment(); // ✅ updated for ethers v6
  console.log("Crowdfunding deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


