# Slot Machine Game

A web-based slot machine game using React and Unity WebGL with optional Ethereum integration.

## Overview

This project combines modern web technologies with blockchain to create an interactive slot machine game. The frontend is built with React and TypeScript, while the game logic is implemented in Unity. Players can use either in-game currency or connect their Ethereum wallet for real transactions.

## Features

- **Interactive Slot Machine**: Built with Unity WebGL for smooth gameplay and animations
- **React Interface**: Modern UI for managing your account and balance
- **Ethereum Integration**: Optional support for deposits and withdrawals using ETH
- **Local Balance**: Play with free coins without connecting a wallet

## Technologies Used

- React
- TypeScript
- Vite
- Unity WebGL
- Ethereum (Web3.js/Ethers.js)

## Play Now

You can play the game at: [https://tim50687.github.io/slot-frontend/](https://tim50687.github.io/slot-frontend/)

## Ethereum Integration

This project supports Ethereum wallet integration for deposits and withdrawals. However, a fully decentralized approach where every spin would trigger a wallet transaction is currently not implemented due to user experience concerns. Such implementation would require wallet confirmation for every game action, making gameplay slow and expensive due to gas fees.

**⚠️ WARNING: The Ethereum integration feature is only partially implemented. Please DO NOT deposit any real ETH at this time! This feature is still under development and not ready for actual use.**

## How to Use

1. Visit the game site
2. (Optional) Connect your Ethereum wallet
3. Deposit funds or use free coins
4. Play the slot machine
5. Withdraw any winnings

## Local Development

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/tim50687/slot-frontend.git

# Install dependencies
cd slot-frontend
npm install

# Start development server
npm run dev
```


## License

MIT License