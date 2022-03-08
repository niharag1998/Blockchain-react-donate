pragma solidity ^0.4.17;

contract DonateContract{
    address private manager;//address of the managaer of the system
    uint private trequest;// Total number of requests raised till date
    uint private nrequest;// Number of active request
    uint private tdonation;//Total number of donations
    uint private donationsCompleted;//Total number of donations Completed
    address[] private req_Addr;//address of the current requestee
    
    struct reqinfo{
        string reason; // reasone for raising the request
        uint valuereq; // amount requested for the donation
        uint valuegen;
        uint8 flag;// amount generated through donation
        mapping(address => uint) donaters;
    }
    
    mapping (address => reqinfo) reqesties;
    
    constructor() public {
        manager = msg.sender;
        trequest = 0;
        nrequest = 0;
        tdonation = 0;
        donationsCompleted = 0;
    }
    
    function getContractAddress() public view returns(address){
        return this;
    }
    
    function getTrequest() public view returns(uint){
        return trequest;
    }
    
    function getNrequest() public view returns(uint){
        return nrequest;
    }
    
    function getTdonations() public view returns(uint){
        return tdonation;
    }
    
    function getTdonationsCompleted() public view returns(uint){
        return donationsCompleted;
    }
    
    function getallreqaddress() public view restricted returns (address[]){
         return req_Addr;
    }
    
    function requestdonation(string reason, uint amount) public returns(bool) {
        //donreq.push(msg.sender);
        
        if(!reqPresent(msg.sender)){
            reqinfo storage reqesty = reqesties[msg.sender];
            reqesty.reason = reason;
            reqesty.valuereq = (1000000000000000000) * amount;
            reqesty.valuegen = 0;
            reqesties[msg.sender].flag = 1;
            nrequest = nrequest + 1;
            trequest = trequest + 1;
            req_Addr.push(msg.sender);
            return true;
        }else
            return false;
    }
    
    function getReason(address ad) public view returns(string){
        if(reqPresent(ad)){
            return reqesties[ad].reason;
        }else{
            return "NULL";
        }
    }
    
    function getValue(address ad) public view returns(uint){
        if(reqPresent(ad)){
            return reqesties[ad].valuereq;
        }else{
            return 0;
        }
    }
    
    function getGeneValue(address ad) public view returns(uint){
        if(reqPresent(ad)){
            return reqesties[ad].valuegen;
        }else{
            return 0;
        }
    }
    
    function reqPresent(address ad) private view returns(bool){
        if(reqesties[ad].flag != 1)
            return false;
        else
            return true;
    }
    
    function requestStatus(address ad) public view returns(string){
        if(reqesties[ad].flag == 1){
            return "Request Live";
        }else if(reqesties[ad].flag == 0){
            return "Request not Present";
        }else if(reqesties[ad].flag == 2){
            return "Request Fulllfilled";
        }
    }
    
    function fun_donate(address ad, uint value) private returns(bytes32) {
        // donreq[index of the person to whome the amount is to be transfered].transfer(this.balance); 
        // this will send all the amount in this pertucular contract to the person
        if(reqPresent(ad)){
            if(reqesties[ad].valuereq - reqesties[ad].valuegen >= value){
                reqesties[ad].valuegen += value;
                return 1;
            }else{
                return 0;
            }
        }else{
            return -1;
        }
    }
    
    function donate(address ad) public payable returns(string){
        bytes32 result = fun_donate(ad, msg.value);
        if(result == 1){
            tdonation = tdonation + 1;
            return "Success";
        }else if(result == 0){
            msg.sender.transfer(msg.value);
            return "Value overflow";
        }else if(result == -1){
            msg.sender.transfer(msg.value);
            return "Address not registered";
        }else{
            msg.sender.transfer(msg.value);
            return "Error";
        }
    }
    
    function pay(uint index) public restricted returns (bool){
        if(index < req_Addr.length){
            if(reqesties[req_Addr[index]].valuegen == reqesties[req_Addr[index]].valuereq){
                req_Addr[index].transfer(reqesties[req_Addr[index]].valuereq);
                reqesties[req_Addr[index]].flag = 2;
                req_Addr[index] = req_Addr[req_Addr.length-1];
                delete req_Addr[req_Addr.length-1];
                req_Addr.length--;
                nrequest--;
                donationsCompleted++;
                return true;
            }else
                return false;
            
        }else{
            return false;
        }
    }
    
    modifier restricted(){
        require(msg.sender == manager   );
        _;
    }
    
}