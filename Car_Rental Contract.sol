// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Rent2Me {

    // State variables
    address public owner;
    address public renter;
    uint public rentAmount;
    uint public depositAmount;
    uint public startTime;
    uint public endTime;
    bool public carReturned;
    bool public rentalPaid;

    // Enum for rental states
    enum State { Created, Started, Ended }
    State public state;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyRenter() {
        require(msg.sender == renter, "Only renter can call this function");
        _;
    }

    // Events
    event RentalStarted(address indexed renter, uint startTime);
    event RentalEnded(address indexed renter, uint endTime);
    event CarReturned(uint endTime);
    event RentalRefunded(uint refundTime);

    // Constructor to initialize contract with rent and deposit amounts
    constructor(uint _rentAmount, uint _depositAmount) {
        owner = msg.sender;
        rentAmount = _rentAmount;
        depositAmount = _depositAmount;
        state = State.Created;
    }

    // Function to start the rental by the owner
    function startRental() public onlyOwner {
        require(state == State.Created, "Rental has already started");
        state = State.Started;
        startTime = block.timestamp;
        emit RentalStarted(renter, startTime);
    }

    // Function to end the rental by the owner
    function endRental() public onlyOwner {
        require(state == State.Started, "Rental has not started yet");
        state = State.Ended;
        endTime = block.timestamp;
        emit RentalEnded(renter, endTime);
    }

    // Function for the renter to return the car
    function returnCar() public onlyOwner {
        require(state == State.Ended, "Rental has not ended yet");
        require(!carReturned, "Car already returned");
        carReturned = true;
        emit CarReturned(endTime);
    }

    // Function for the owner to refund deposit to the renter
    function refundDeposit() public onlyOwner {
        require(state == State.Ended, "Rental has not ended yet");
        require(!rentalPaid, "Rental amount already paid");
        payable(renter).transfer(depositAmount);
        rentalPaid = true;
        emit RentalRefunded(block.timestamp);
    }

    // Function for the renter to rent the car by paying the deposit
    function rentCar() public payable {
        require(state == State.Created, "Rental has already started");
        require(msg.value == depositAmount, "Deposit amount mismatch");
        require(msg.sender != owner, "Owner cannot rent the car");
        renter = msg.sender;
        state = State.Started;
        startTime = block.timestamp;
        emit RentalStarted(renter, startTime);
    }

    // Function for the owner to withdraw the rent amount after the rental ends
    function withdrawRent() public onlyOwner {
        require(state == State.Ended, "Rental has not ended yet");
        require(rentalPaid, "Rental amount not yet paid");
        payable(owner).transfer(rentAmount);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Function to destroy the contract instance
    function destroyContract() public onlyOwner {
    require(state == State.Ended, "Contract can only be destroyed after rental ends");
    
    // Transfer any remaining balance to the contract owner
    payable(owner).transfer(address(this).balance);
    }
}
