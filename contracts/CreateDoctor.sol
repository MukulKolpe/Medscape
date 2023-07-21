//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Doctor.sol";

contract CreateDoctor{
    address owner;
    Doctor[] public _doctors;
    Doctor[] public _verifiedDoctors;
    uint256 constant maxLimit = 20;
    event DoctorAdded(Doctor indexed newDoctor,address indexed owner);

    constructor(){
        owner = msg.sender;
    }

    function doctorCount() public view returns(uint256) {
        return _doctors.length;
    }

    function getVerifiedDoctorCount() public view returns(uint256) {
        return _verifiedDoctors.length;
    }

    function createDoctor(string memory name,uint256 age,string memory imageURL,uint256 yoe,string memory dob,string memory speciality,string memory degreeURL,string memory licenseNum,address payable createdBy,string memory email,string memory gender)public{
        Doctor newDoctor = new Doctor(name,imageURL,age,yoe,dob,createdBy,speciality,degreeURL,licenseNum,email,gender);
        _doctors.push(newDoctor);
        emit DoctorAdded(newDoctor,createdBy);
    }

    function getDoctorByIndex(uint256 index) public view returns (Doctor) {
        return _doctors[index];
    }
    
    function getVerifiedDoctorByIndex(uint256 index) public view returns (Doctor) {
        return _verifiedDoctors[index];
    }

    function verifyDoctor(uint256 index) public {
        require(msg.sender == owner,"Only admin can call this function");
        Doctor d1 = Doctor(_doctors[index]);
        d1.verifyDoctor(true);
        _verifiedDoctors.push(_doctors[index]);
        _doctors[index] = _doctors[_doctors.length - 1];
        _doctors.pop();
    }   

    function doctors(uint256 limit,uint256 offset) public view returns (Doctor[] memory coll) {
        //logic for pagination
        require(offset <= doctorCount(), "offset out of bounds");
        // start our size as difference between total count and offset
        uint256 size = doctorCount() - offset;
        // size should be the smaller of the count or the limit
        size = size < limit ? size : limit;
        // size should not exceed the maxLimit
        size = size < maxLimit ? size : maxLimit;
        // build our collection to return based off of limit and offest
        coll = new Doctor[](size);
        for (uint256 i = 0; i < size; i++) {
            coll[i] = _doctors[offset + i];
        }
        return coll;
    }
}