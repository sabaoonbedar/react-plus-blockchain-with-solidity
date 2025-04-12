pragma solidity ^0.8.0;

contract contractApi
{
    struct Degree
    {
        string student_name;
        string father_name;
        string reg_no;
        string serial_no;
        string dec_date;
        string session;
    }

    address owner;

    mapping (uint256 => Degree) public data;

    constructor ()
    {
        owner = msg.sender;
    }

    modifier onlyOwner 
    {
        require (msg.sender == owner);
        _;
    }

    function addDegree (string memory _student_name, string memory _father_name, string memory _reg_no, string memory _serial_no, string memory _dec_date, string memory _session) public onlyOwner 
    {
        uint256 key = uint256(keccak256(abi.encodePacked(_reg_no, _dec_date)));
        data [key] = Degree ({
            student_name : _student_name, 
            father_name :_father_name, 
            reg_no : _reg_no, 
            serial_no : _serial_no, 
            dec_date : _dec_date, 
            session : _session
            });
    }

    function getDegree (string memory _reg_no, string memory _dec_date) public view returns (Degree memory)
    {
        uint256 key = uint256(keccak256(abi.encodePacked(_reg_no, _dec_date)));
        return data [key];
    }
}