pragma solidity 0.8.20;


interface IAdapter {
    function invest(address _token) external payable;

    function redeem(
        address _token,
        uint256 _amount
    ) external;
}