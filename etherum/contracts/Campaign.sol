// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract CampaignFactory{

    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

}


contract Campaign{

    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) approvers;
    uint approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public  payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    uint numRequest;
    mapping(uint => Request) requests;

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request storage r = requests[numRequest++];
            r.description = description;
            r.value = value;
            r.recipient = recipient;
            r.complete = false;
            r.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage r = requests[index];

        require(approvers[msg.sender]);
        require(!r.approvals[msg.sender]);

        r.approvals[msg.sender] = true;
        r.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage r = requests[index];
        require(r.approvalCount > (approversCount/2));
        require(!r.complete);
        r.recipient.transfer(r.value);
        r.complete = true;
    }
}