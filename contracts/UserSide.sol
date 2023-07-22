//SPDX-License-Identifier: MIT
//Following contract contains all the functions realted to user/patient-side.
//This includes creating a patient profile,booking and mapping appointments to respective doctors and patients,etc.
pragma solidity ^0.8.7;

contract UserSide {

    uint256 public userId;
    uint256 public appointmentId;

    mapping(uint256 => User) public userIdMapping;
    mapping(address => User) public userAddressMapping;
    mapping(string => User) public userAadharMapping;
    mapping(address => string[]) public userAddressReportsMapping;
    mapping(address => Appointment[]) public userAddressAppointmentsMapping;
    mapping(address => Appointment[]) public doctorAddressAppointmentsMappings;
    mapping(uint256 => Appointment) public appointmentIdMapping;
    mapping(address => uint256) public isPatientRegistered;

    struct Appointment{
        uint256 appId;
        string doctorName;
        string patientName;
        string appDate;
        string appTime;
        address doctorWalletAddress;
        address patientWalletAddress;
    }

    struct User {
        address patientWalletAddress;
        string name;
        string email;
        string aadharNo;
        string gender;
        string age;
        string bloodGrp;
        string dob;
        bool isDiabetic;
        bool isHighBp;
        bool isHandicap;
    }
    
    function createUser(string memory name,string memory email,string memory aadharNo,string memory gender,string memory age,string memory bloodGrp,string memory dob,bool isDiabetic,bool isHighBp,bool isHandicap) public{
        User memory u1 = User(msg.sender,name,email,aadharNo,gender,age,bloodGrp,dob,isDiabetic,isHighBp,isHandicap);
        userId++;
        userIdMapping[userId] = u1;
        userAddressMapping[msg.sender] = u1;
        userAadharMapping[aadharNo] = u1;
        isPatientRegistered[msg.sender]++;
    }

    function addUserReport(address patientWalletAddress,string memory reportIpfsHash) public{
        userAddressReportsMapping[patientWalletAddress].push(reportIpfsHash);
    }

    function getUserbyWalletAddress(address patientWalletAddress) public view returns (User memory) {
        return userAddressMapping[patientWalletAddress];
    }
    
    function bookAppointment(string memory doctorName,string memory patientName,string memory appDate,string memory appTime,address doctorWalletAddress) public {
        appointmentId++;
        Appointment memory a1 = Appointment(appointmentId,doctorName,patientName,appDate,appTime,doctorWalletAddress,msg.sender);
        userAddressAppointmentsMapping[msg.sender].push(a1);
        doctorAddressAppointmentsMappings[doctorWalletAddress].push(a1);
        appointmentIdMapping[appointmentId] = a1;
    }

    function getTotalAppointmentsPatient(address patientWalletAddress) public view returns (uint256){
        return userAddressAppointmentsMapping[patientWalletAddress].length;
    }

    function getTotalAppointmentsDoctor(address doctorWalletAddress) public view returns (uint256){
        return doctorAddressAppointmentsMappings[doctorWalletAddress].length;
    }

    function getAppointmentDetailsPatient(address patientWalletAddress,uint256 index) public view returns (Appointment memory) {
        return userAddressAppointmentsMapping[patientWalletAddress][index];
    }

    function getAppointmentDetailsDoctor(address doctorWalletAddress,uint256 index) public view returns (Appointment memory) {
        return doctorAddressAppointmentsMappings[doctorWalletAddress][index];
    }

    function checkPatientRegistered(address patientWalletAddress) public view returns(bool) {
        return isPatientRegistered[patientWalletAddress] > 0;
    }
}