pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAdapter {
    function invest(IERC20 _token, uint256 _amount, address _user) external payable;

    // function redeem(
    //     IERC20 _token,
    //     uint256 _amount
    // ) external;
}
