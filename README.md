# Crowdfunding DApp

A decentralized crowdfunding platform built with Solidity and React. Users can contribute ETH to a campaign, request refunds if the goal is not met, and the campaign owner can withdraw funds if the goal is reached.

## Deployed Contract

- **Address:** `0x007d7066aE844fdf812BE21D56200B7a5cA75aC9`

## Features

- Contribute ETH to a campaign
- Refunds if the funding goal is not met
- Owner withdrawal if the goal is reached
- Simple, secure smart contract

## Getting Started

### Prerequisites

- Node.js
- Hardhat
- MetaMask

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Crowdfunding.git
   cd Crowdfunding
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. (Optional) Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

### Compile & Test

```sh
npx hardhat compile
npx hardhat test
```

### Deploy

```sh
npx hardhat run scripts/deploy.js --network <network>
```

### Run Frontend

```sh
cd frontend
npm start
```

## Project Structure

- `contracts/` — Solidity contracts
- `scripts/` — Deployment scripts
- `test/` — Contract tests
- `frontend/` — React frontend

## License

MIT

---

Crowdfunding deployed to: 0x007d7066aE844fdf812BE21D56200B7a5cA75aC9
