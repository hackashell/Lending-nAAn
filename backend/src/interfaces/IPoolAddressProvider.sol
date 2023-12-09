pragma solidity 0.8.20;

interface IPoolAddressProvider {
    function getPool() external view returns (address);
}
