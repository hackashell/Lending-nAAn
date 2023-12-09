import { bundlerActions } from "permissionless";
import { pimlicoBundlerActions, pimlicoPaymasterActions } from "permissionless/actions/pimlico";
import { createClient, createPublicClient, http } from "viem";
import { arbitrumGoerli, } from "viem/chains";

console.log("Hello world!")

// export const publicClient = createPublicClient({
// 	transport: http("https://CHAIN.infura.io/v3/" + process.env.NEXT_PUBLIC_PIMLICO_API_KEY),
//   chain: sepolia,
// });
 
// export const paymasterClient = createPimlicoPaymasterClient({
// 	transport: http(
// 		"https://api.pimlico.io/v2/CHAIN/rpc?apikey=API_KEY",
// 	),
// });

export const publicClient = createPublicClient({
  transport: http("https://goerli-rollup.arbitrum.io/rpc"),
  chain: arbitrumGoerli,
})
 
const chain = arbitrumGoerli.name // find the list of chain names on the Pimlico verifying paymaster reference page
const apiKey =  process.env.NEXT_PUBLIC_PIMLICO_API_KEY // REPLACE THIS
 
export const bundlerClient = createClient({
  transport: http(`https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`),
  chain: arbitrumGoerli
}).extend(bundlerActions).extend(pimlicoBundlerActions)
 
export const paymasterClient = createClient({
  // ⚠️ using v2 of the API ⚠️ 
  transport: http(`https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`),
  chain: arbitrumGoerli
}).extend(pimlicoPaymasterActions)
