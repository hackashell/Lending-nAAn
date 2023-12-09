// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { Multicall } from "lib/openzeppelin-contracts/contracts/utils/Multicall.sol";
import { IAaveAdapter } from "./interfaces/IAaveAdapter.sol";
import { IOneInchAdapter } from "./interfaces/IOneInchAdapter.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";

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

    function aaveWithdraw(IERC20Metadata token, uint256 amount, address from) external {
        token.transferFrom(from, address(this), amount);
        address adapter = adapters[Flavor.Aave];
        token.approve(adapter, amount);
        IAaveAdapter(adapter).redeem(token, amount, from);
    }

    function aaveSupplyAndBorrow(
        IERC20Metadata supplyToken,
        IERC20Metadata borrowToken,
        uint256 supplyAmount,
        address from
    )
        external
    {
        supplyToken.transferFrom(from, address(this), supplyAmount);
        address adapter = adapters[Flavor.Aave];
        supplyToken.approve(adapter, supplyAmount);
        IAaveAdapter(adapter).supplyAndBorrow(supplyToken, borrowToken, supplyAmount, from);
    }

    function oneInchSwap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) external {
        IOneInchAdapter(adapters[Flavor.OneInch]).swapForExactInput(
            IERC20(tokenIn), tokenOut, amountIn, minAmountOut, msg.sender
        );
    }
}
