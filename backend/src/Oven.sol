// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { Multicall } from "lib/openzeppelin-contracts/contracts/utils/Multicall.sol";
import { IAaveAdapter } from "./interfaces/IAaveAdapter.sol";
import { IERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract Oven is Multicall, Ownable2Step {
    enum Flavor {
        Aave,
        OneInch
    }

    mapping(Flavor => address) adapters;

    constructor(address aaveAdapter, address oneInchAdapter) {
        adapters[Flavor.Aave] = aaveAdapter;
        adapters[Flavor.OneInch] = oneInchAdapter;
    }

    function aaveDeposit(address token, uint256 amount) external {
        IAaveAdapter(adapters[Flavor.Aave]).invest(IERC20(token), amount, msg.sender);
    }

    function aaveWithdraw(address token, uint256 amount) external {
        IAaveAdapter(adapters[Flavor.Aave]).redeem(IERC20(token), amount, msg.sender);
    }

    function aaveBorrow(address token, uint256 amount) external { }

    function aaveRepay(address token, uint256 amount) external { }

    function oneInchSwap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) external { }
}
