pragma solidity 0.8.20;

interface IDataProvider {
    function getReserveTokensAddresses(address asset) external view returns (address, address, address);
}
