// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "../interfaces/IWETHGateway.sol";
import "../interfaces/IPoolAddressProvider.sol";
import "../interfaces/ILendingPoolV3.sol";
import "../interfaces/IAToken.sol";
import "../interfaces/IDataProvider.sol";
import "../interfaces/IAaveAdapter.sol";
import "../interfaces/IWETH.sol";

contract AaveAdapter is IAaveAdapter {
    /// @notice Address of the weth gateway contract
    IWETHGateway public immutable wethGateway;

    /// @notice Lending pool address
    ILendingPoolV3 public immutable lendingPool;

    /// @notice wrapped token address like wamtic or weth
    IWETH public immutable weth;

    /// @notice AaveProtocolDataProvider address
    IDataProvider public immutable dataProvider;

    address public immutable parentForwarder;

    constructor(
        address _parentForwarder,
        IPoolAddressProvider _poolAddressesProvider,
        IWETHGateway _wethGateway,
        IDataProvider _dataProvider,
        IWETH _weth
    ) {
        parentForwarder = _parentForwarder;
        lendingPool = ILendingPoolV3(_poolAddressesProvider.getPool());
        wethGateway = _wethGateway;
        dataProvider = _dataProvider;
        weth = _weth;
    }

    function invest(IERC20 _token, uint256 _amount, address _user) external payable {
        if (address(_token) == address(0) || address(_token) == address(weth)) {
            if (address(_token) == address(weth)) {
                // unwraps WrappedToken back into Native Token
                weth.withdraw(_amount);
            }
            // Deposits MATIC into the pool
            wethGateway.depositETH{ value: _amount }(address(lendingPool), address(this), 0);
        } else {
            _token.approve(address(lendingPool), _amount);
            lendingPool.supply(address(_token), _amount, _user, 0);
        }
    }

    function redeem(IERC20 _token, uint256 _amount, address _user) external {
        // Withdraws funds (principal + interest + rewards) from external pool
        if (address(_token) == address(0) || address(_token) == address(weth)) {
            address aTokenAddress;
            if (address(_token) == address(0)) {
                (aTokenAddress,,) = dataProvider.getReserveTokensAddresses(address(weth));
            } else {
                (aTokenAddress,,) = dataProvider.getReserveTokensAddresses(address(_token));
            }

            IAToken(aTokenAddress).approve(address(wethGateway), _amount);

            wethGateway.withdrawETH(address(lendingPool), _amount, _user);
        } else {
            lendingPool.withdraw(address(_token), _amount, _user);
        }
    }
}
