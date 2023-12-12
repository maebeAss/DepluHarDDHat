const hre = require('hardhat')

async function main() {
  const MyContract = await ethers.getContractFactory("PancakeRouter");
  const contract = MyContract.attach("0x10ED43C718714eb63d5aA57B78B54704E256024E");
  let PreviousPrice = 0
  async function cv() {
    let CurrentPrice = await contract.getAmountsOut(10000000, [ "0x55d398326f99059ff775485246999027b3197955", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" ]);
    if (PreviousPrice > CurrentPrice) {
      console.log(`\x1b[32m${CurrentPrice[1]}\x1b[0m ↑`)
    } else if (PreviousPrice < CurrentPrice) {
      console.log(`\x1b[31m${CurrentPrice[1]}\x1b[0m ↓`)
    } else {
      console.log (`\x1b[37m${CurrentPrice[1]}\x1b[0m ==`)
    }
    PreviousPrice = CurrentPrice
  }
  setInterval(cv, 2000);
}
// main();
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});