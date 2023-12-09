// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IAaveAdapter {
    function invest(IERC20 _token, IERC20Metadata _borrowToken, uint256 _amount, address _user) external payable;

    function redeem(IERC20 _token, uint256 _amount, address _user) external;
}
