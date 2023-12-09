// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { Multicall } from "lib/openzeppelin-contracts/contracts/utils/Multicall.sol";
import { IAaveAdapter } from "./interfaces/IAaveAdapter.sol";
import { IERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract Oven is Multicall {
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

    function aaveSupplyAndBorrow(
        address supplyToken,
        address borrowToken,
        uint256 supplyAmount,
        uint256 borrowAmount
    )
        external
    {
        IAaveAdapter(adapters[Flavor.Aave]).supplyAndBorrow(
            IERC20(supplyToken), IERC20(borrowToken), supplyAmount, borrowAmount, msg.sender
        );
    }

    function aaveBorrow(address token, uint256 amount) external {
        IAaveAdapter(adapters[Flavor.Aave]).borrow(IERC20(token), amount, msg.sender);
    }

    function aaveRepay(address token, uint256 amount) external {
        IAaveAdapter(adapters[Flavor.Aave]).repay(IERC20(token), amount, msg.sender);
    }

    function oneInchSwap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) external { }
}
