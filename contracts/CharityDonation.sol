// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import 'hardhat/console.sol';

contract CharityDonation {
    mapping(address => uint256) public donations;
    mapping(address => bool) public registeredCharities;
    address[] public charities;
    address public owner;
    
    event CharityRegistered(address indexed charity);
    event DonationMade(address indexed donor, address indexed charity, uint256 amount);
    event CharityRemoved(address indexed charity);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        console.log("Contract deployed by:", owner);
    }
    
    // Register a new charity
    function registerCharity(address charity) public onlyOwner {
        console.log("Attempting to register charity:", charity);
        require(charity != address(0), "Invalid charity address");
        require(!registeredCharities[charity], "Charity already registered");
        
        registeredCharities[charity] = true;
        charities.push(charity);
        
        console.log("Charity registered:", charity);
        emit CharityRegistered(charity);
    }
    
    // Remove a charity
    function removeCharity(address charity) public onlyOwner {
        console.log("Attempting to remove charity:", charity);
        require(registeredCharities[charity], "Charity not registered");
        
        registeredCharities[charity] = false;
        
        // Remove from charities array
        for (uint256 i = 0; i < charities.length; i++) {
            if (charities[i] == charity) {
                charities[i] = charities[charities.length - 1];
                charities.pop();
                break;
            }
        }
        
        console.log("Charity removed:", charity);
        emit CharityRemoved(charity);
    }
    
    // Donate to a charity
    function donate(address charity) public payable {
        console.log("Attempting to donate to charity:", charity, "Amount:", msg.value);
        require(msg.value > 0, "Donation must be greater than 0");
        require(registeredCharities[charity], "Charity not registered");
        
        // Remove the contract check to allow regular addresses
        // require(charity.code.length > 0, "Charity must be a contract");
        
        // Transfer the donated Ether to the charity address using a more secure pattern
        (bool success, ) = payable(charity).call{value: msg.value}("");
        require(success, "Failed to send Ether");
        
        // Update the donations mapping
        donations[charity] += msg.value;
        
        console.log("Donation made by:", msg.sender);
        console.log("To charity:", charity);
        console.log("Amount:", msg.value);
        emit DonationMade(msg.sender, charity, msg.value);
    }
    
    // Get the list of registered charities
    function getCharities() public view returns (address[] memory) {
        console.log("Fetching list of registered charities");
        return charities;
    }
    
    // Get total donations for a charity
    function getDonationAmount(address charity) public view returns (uint256) {
        console.log("Fetching total donations for charity:", charity);
        return donations[charity];
    }
    
    // Check if a charity is registered
    function isCharityRegistered(address charity) public view returns (bool) {
        console.log("Checking if charity is registered:", charity);
        return registeredCharities[charity];
    }
    
    // Allow contract to receive Ether
    receive() external payable {
        console.log("Received Ether:", msg.value, "from:", msg.sender);
    }
    
    fallback() external payable {
        console.log("Fallback function called with Ether:", msg.value, "from:", msg.sender);
    }
}