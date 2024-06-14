import {liquidity,getSigningLiquidityClient} from "liquidityjs"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { getOfflineSignerProto as getOfflineSigner } from 'cosmjs-utils';
import { chains } from 'chain-registry';




//var rpcAddress = "http://37.187.38.191:26657/"
var rpcAddress = "http://localhost:26657/"
var lcdAddress = "http://37.187.38.191:1317/"



if(process.argv.length < 3){
    console.error("Expected at least one argument ! ")
    process.exit(1)
}
let action = process.argv[2];


const client = await liquidity.ClientFactory.createRPCQueryClient({
    "rpcEndpoint" : rpcAddress
  });


const mnemonic ='unfold client turtle either pilot stock floor glow toward bullet car science';
const chain = chains.find(({ chain_name }) => chain_name === 'chihuahua');
chain.chain_id="huahua-dev"
chain.network_type = "devnet"
chain.apis={}
chain.explorers = undefined
//console.log("Chain : ",chain)
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    { prefix: "chihuahua" }
  );
const [{ address, pubkey }] = await wallet.getAccounts();
console.log("demo address: "+address);
const signer = await getOfflineSigner({
    mnemonic,
    chain
  });
const stargateClient = await getSigningLiquidityClient({
    rpcEndpoint:rpcAddress,
    signer:wallet // OfflineSigner
  });


  const liquidityParam = await client.liquidity.v1beta1.params()
  let params = liquidityParam.params
  console.log("Liquidity module params : ",params)

switch(action){
    case "pools" :
        listAllPools()
        break;
    case "create-pool" :
        if(process.argv.length < 7){
            console.error("Expected at least 3 arguments : create-pool denom1 amount1 denom2 amount2 ! ")
            process.exit(1)
        }
        let denom1 = process.argv[3]
        let amount1 = process.argv[4]
        let denom2 = process.argv[5]
        let amount2 = process.argv[6]
        createPool(denom1,amount1,denom2,amount2)
        break
    case "balances-demo" :
        balancesDemo()
        break;
    case "deposit" :
        if(process.argv.length < 8){
            console.error("Expected at least 6 arguments : deposit poolId denom1 amount1 denom2 amount2! ")
            process.exit(1)
        }
        let poolId = process.argv[3]
        let denom_1 = process.argv[4]
        let amount_1 = process.argv[5]
        let denom_2 = process.argv[6]
        let amount_2 =process.argv[7]

        let coin1 = {denom:denom_1,amount:amount_1}
        let coin2 = {denom:denom_2,amount:amount_2}
        deposit(poolId,coin1,coin2)
        break
    case "swap" :
        if(process.argv.length < 7){
            console.error("Expected at least 5 arguments : swap poolId denomToSell amountToSell denomWanted ! ")
            process.exit(1)
        }
        let pool_id = process.argv[3]
        let denomToSell = process.argv[4]
        let amountToSell = process.argv[5]
        let denomWanted = process.argv[6]

        swap(pool_id,denomToSell,amountToSell,denomWanted)
        break
    case "direct_swap" :
        if(process.argv.length < 7){
            console.error("Expected at least 5 arguments : direct_swap poolId denomToSell amountToSell denomWanted ! ")
            process.exit(1)
        }
        let pool_id2 = process.argv[3]
        let denomToSell2 = process.argv[4]
        let amountToSell2 = process.argv[5]
        let denomWanted2 = process.argv[6]

        directSwap(pool_id2,denomToSell2,amountToSell2,denomWanted2)
        break
    case "withdraw" :
        if(process.argv.length < 6){
            console.error("Expected at least 5 arguments : withdraw poolId denomPool amountToWithdraw ! ")
            process.exit(1)
        }
        let poolIdToWithdraw = process.argv[3]
        let denomPool = process.argv[4]
        let amountToWithdraw = process.argv[5]
        withdraw(poolIdToWithdraw,denomPool,amountToWithdraw)
        break
    default : 
        console.log("Unrecognized action")
}


async function balancesDemo (){
    const allBalancesRequest = {
        address:address
    }
    let balances  = await client.cosmos.bank.v1beta1.allBalances(allBalancesRequest) 
    console.log(balances.balances)
}


async function  listAllPools(){
    const allPoolsRequest = {}

    let pools  = await client.liquidity.v1beta1.liquidityPools(allPoolsRequest)
  
    pools.pools.forEach(async (pool)=>{
        console.log(pool)
      const allBalancesRequest = {
          address: pool.reserveAccountAddress
      }
      let balances  = await client.cosmos.bank.v1beta1.allBalances(allBalancesRequest)
      console.log("Pool id : "+pool.id +"----------------------------------------------------------------")
      console.log("Pool coin denom :  "+pool.poolCoinDenom)
      console.log("Reserved coins :" +pool.reserveCoinDenoms[0]+" / "+pool.reserveCoinDenoms[1])
      console.log("Reservice address account : "+pool.reserveAccountAddress)
      console.log(balances.balances)
      console.log(" END POOL "+ pool.id+ " --------------------------------------------------------------")
    })
}

async function swap(idPool, denomToSell, amountToSell, denomWanted){

    const poolRequest = {
        poolId:idPool
    }
    let pool = await client.liquidity.v1beta1.liquidityPool(poolRequest)
    pool = pool.pool
    const allBalancesRequest = {
        address: pool.reserveAccountAddress
    }


    let poolBalances  = await client.cosmos.bank.v1beta1.allBalances(allBalancesRequest)
    poolBalances = poolBalances.balances
    let balanceDenom1 = poolBalances.find((coin)=> coin.denom === pool.reserveCoinDenoms[0])
    let balanceDenom2 = poolBalances.find((coin)=> coin.denom === pool.reserveCoinDenoms[1])
    let pricePool = balanceDenom1.amount / balanceDenom2.amount
    console.log("1 "+pool.reserveCoinDenoms[0]+" = "+pricePool+" "+pool.reserveCoinDenoms[1])
    let maxAcceptedPrice = pricePool
    let acceptedSlippage = 0.05; //5% for the example
    let slippageAmount = pricePool * acceptedSlippage
    if(denomToSell === pool.reserveCoinDenoms[0]){
        maxAcceptedPrice = pricePool + slippageAmount
    }else {
        maxAcceptedPrice = pricePool - slippageAmount
    }

    const { swap } = liquidity.v1beta1.MessageComposer.withTypeUrl;
    let feeAmount = amountToSell * (params.swapFeeRate / 2)
    feeAmount = Math.ceil(feeAmount)+""
    let msgSwap = swap({
        swapRequesterAddress: address,
        poolId: idPool,
        swapTypeId: 1,
        offerCoin: {denom: denomToSell,amount:amountToSell},
        demandCoinDenom: denomWanted,
        offerCoinFee: {denom:denomToSell,amount:feeAmount+""},
        orderPrice: maxAcceptedPrice+""
    })

    console.log("Msg ",msgSwap)

    let fee ={
        amount:[{
            amount: "200000000",
            denom: "uhuahua"
        }],
        gas: "200000"
    }
    const response = await stargateClient.signAndBroadcast(address, [msgSwap], fee);
    console.log(response)
 
}



async function directSwap(idPool, denomToSell, amountToSell, denomWanted){

    const poolRequest = {
        poolId:idPool
    }
    let pool = await client.liquidity.v1beta1.liquidityPool(poolRequest)
    pool = pool.pool
    const allBalancesRequest = {
        address: pool.reserveAccountAddress
    }


    let poolBalances  = await client.cosmos.bank.v1beta1.allBalances(allBalancesRequest)
    poolBalances = poolBalances.balances
    let balanceDenom1 = poolBalances.find((coin)=> coin.denom === pool.reserveCoinDenoms[0])
    let balanceDenom2 = poolBalances.find((coin)=> coin.denom === pool.reserveCoinDenoms[1])
    let pricePool = balanceDenom1.amount / balanceDenom2.amount
    console.log("1 "+pool.reserveCoinDenoms[0]+" = "+pricePool+" "+pool.reserveCoinDenoms[1])
    let maxAcceptedPrice = pricePool
    let acceptedSlippage = 0.5; //10% for the example
    let slippageAmount = pricePool * acceptedSlippage
    if(denomToSell === pool.reserveCoinDenoms[0]){
        maxAcceptedPrice = pricePool + slippageAmount
    }else {
        maxAcceptedPrice = pricePool - slippageAmount
    }

    const { directSwap } = liquidity.v1beta1.MessageComposer.withTypeUrl;
    let feeAmount = amountToSell * (params.swapFeeRate / 2)
    feeAmount = Math.ceil(feeAmount)+""
    let msgSwap = directSwap({
        swapRequesterAddress: address,
        poolId: idPool,
        swapTypeId: 1,
        offerCoin: {denom: denomToSell,amount:amountToSell},
        demandCoinDenom: denomWanted,
        orderPrice: maxAcceptedPrice+""
    })

    console.log("Msg ",msgSwap)

    let fee ={
        amount:[{
            amount: "200000000",
            denom: "uhuahua"
        }],
        gas: "200000"
    }
    const response = await stargateClient.signAndBroadcast(address, [msgSwap], fee);
    console.log(response)
 
}


async function createPool(denom1,amount1, denom2,amount2){
    const { createPool } = liquidity.v1beta1.MessageComposer.withTypeUrl;
    let msgCreatePool = createPool({
        poolCreatorAddress: address,
        poolTypeId: 1,
        depositCoins: [{denom:denom1,amount:amount1},{denom:denom2,amount:amount2}]
    })
    let fee ={
        amount:[{
            amount: "200000000",
            denom: "uhuahua"
        }],
        gas: "200000"
    }
    console.log(msgCreatePool)
    const response = await stargateClient.signAndBroadcast(address, [msgCreatePool], fee);
    console.log(response)
}

async function send(to,denom,amount){
    const { createPool } = liquidity.v1beta1.MessageComposer.withTypeUrl;
    let msgCreatePool = createPool({
        poolCreatorAddress: address,
        poolTypeId: 1,
        depositCoins: [{denom:denom1,amount:amount1},{denom:denom2,amount:amount2}]
    })
    let fee ={
        amount:[{
            amount: "200000000",
            denom: "uhuahua"
        }],
        gas: "200000"
    }
    console.log(msgCreatePool)
    const response = await stargateClient.signAndBroadcast(address, [msgCreatePool], fee);
    console.log(response)
}


async function deposit(idPool,coin1,coin2){
    const { depositWithinBatch } = liquidity.v1beta1.MessageComposer.withTypeUrl;
    let msgDeposit = depositWithinBatch({
        depositorAddress: address,
        poolId: idPool,
        depositCoins: [coin1,coin2]
    })
    let fee ={
        amount:[{
            amount: "200000000",
            denom: "uhuahua"
        }],
        gas: "200000"
    }
    const response = await stargateClient.signAndBroadcast(address, [msgDeposit], fee);
    console.log(response)
}

async function withdraw(idPool, poolDenom, amountToWithdraw) {
    const { withdrawWithinBatch } = liquidity.v1beta1.MessageComposer.withTypeUrl;
    let msgWithdraw = withdrawWithinBatch({
        withdrawerAddress: address,
        poolId: idPool,
        poolCoin: {denom:poolDenom,amount:amountToWithdraw}
    })
    let fee ={
        amount:[{
            amount: "200000000",
            denom: "uhuahua"
        }],
        gas: "200000"
    }
    const response = await stargateClient.signAndBroadcast(address, [msgWithdraw], fee);
    console.log(response)

}


  


