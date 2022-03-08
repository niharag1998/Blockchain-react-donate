import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import donate from './donate';

class App extends Component {
  state = {
    trequest: '',
    nrequest: '',
    tdonation: '',
    donationCompleted: '',
    balance: '',
    reason: '',
    reason1: '',
    value: '',
    result: '',
    result1: '',
    request: '',
    index: '',
    address: '',
    status: '',
    Request_value: '',
    Generated_value: '',
    result2: '',
    donateValue: '',
    requestee: [],
    result3: '',
    result4: ''
  }
  
  async componentDidMount(){
    const nrequest = await donate.methods.getNrequest().call();
    const trequest = await donate.methods.getTrequest().call();
    const tdonation = await donate.methods.getTdonations().call();
    const donationCompleted = await donate.methods.getTdonationsCompleted().call();
    const balance = await web3.eth.getBalance(donate.options.address);

    this.setState({
      nrequest:nrequest,
      trequest:trequest,
      tdonation: tdonation,
      donationCompleted: donationCompleted,
      balance: balance
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const value = this.state.value;
    const reason = this.state.reason;
    let status = await donate.methods.requestStatus(String(accounts[0])).call();
    if(status !== "Request Live"){
      this.setState({result1: "processing"});
      await donate.methods.requestdonation(String(reason),Number(value)).send({
        from: accounts[0]
      });
      status = await donate.methods.requestStatus(String(accounts[0])).call();
      this.setState({result1: status});
    }else
      this.setState({result1: "Request Already Present"});
  };

  onEnter = async (event) => {
    event.preventDefault();
    const address = this.state.address;
    const reason = await donate.methods.getReason(String(address)).call();
    const status = await donate.methods.requestStatus(String(address)).call();
    const Request_value = await donate.methods.getValue(String(address)).call();
    const Generated_value = await donate.methods.getGeneValue(String(address)).call();
    this.setState({reason1: reason,status:status,Request_value:Request_value,Generated_value:Generated_value});
    this.setState({result: "Status - " + this.state.status + ", Reason - " + this.state.reason1 + ", Requested Value - " + web3.utils.fromWei(this.state.Request_value, 'ether')  + " ether, Generated Value - " + web3.utils.fromWei(this.state.Generated_value, 'ether') + " ether."});
  }

  donate = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const address = this.state.address;
    const genValue = await donate.methods.getGeneValue(String(address)).call();
    const reqValue = await donate.methods.getValue(String(address)).call();
    if(genValue === reqValue){
      this.setState({result2: "Cannot donate - maximum limit reached"});
    }else{
      this.setState({result2: "Donation in process"});
      await donate.methods.donate(String(address)).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.donateValue, 'ether')
      });
      this.setState({result2: "Thank you for Donating"});
    }
  }

  GetAddresses = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const addresses = await donate.methods.getallreqaddress().call({
      from: accounts[0]
    });
    this.setState({requestee: addresses});
    this.setState({result3: addresses});
  }

  Release = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const index = this.state.index;
    const address = this.state.requestee[index];
    const genValue = await donate.methods.getGeneValue(String(address)).call();
    const reqValue = await donate.methods.getValue(String(address)).call();
    if(genValue === reqValue){
      this.setState({result4: "Payout is in Process"});
      await donate.methods.pay(index).send({
        from: accounts[0]
      });
      this.setState({result4: "Payout Successfull"});
    }else{
      this.setState({result4: "Target not reched"});
    }
  }
  
  render() {
    
    return (
      <div>
        <center>
          <h2>Welcome to Donate Contract - This is a Donation system using Ethereum Blockchain Technology</h2>
          <h3>The Total number of Request : {this.state.trequest}</h3>
          <h3>The Total number of Request Pending : {this.state.nrequest}</h3>
          <h3>The Total number of Donation Made till date : {this.state.tdonation}</h3>
          <h3>The Total number of Donation Completed till date : {this.state.donationCompleted}</h3>
          <h3>The Balance in the Contract : {web3.utils.fromWei(this.state.balance, 'ether')} ether</h3>
        </center>
        <hr/>
        <form onSubmit = {this.onSubmit}>
          <h4>Want to Request for donation?</h4>
          <div>
            <label>Enter the Reason for asking for the donation : </label>
            <input
              value = {this.state.reason}
              onChange = {event => this.setState({reason: event.target.value})}
            />
          </div>
          <div>
            <label>Enter the Value (in ether) to ask as a donation : </label>
            <input
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Submit</button>
          <h3>Result: {this.state.result1}</h3>
        </form>
        <hr/>
        <form onSubmit = {this.onEnter}>
          <h4>Get Details of a request</h4>
          <div>
            <label>Enter the Address of the requestee : </label>
            <input
              value = {this.state.address}
              onChange = {event => this.setState({address: event.target.value})}
            />
          </div>
          <button>Submit</button>
          <h3>Result: {this.state.result}</h3>
        </form>
        <hr/>
        <form onSubmit = {this.donate}>
          <h4>Donate Fund</h4>
          <div>
            <label>Enter the Address of the Recipent : </label>
            <input
              value = {this.state.address}
              onChange = {event => this.setState({address: event.target.value})}
            />
          </div>
          <div>
            <label>Enter the Amount to be Donated : </label>
            <input
              value = {this.state.donateValue}
              onChange = {event => this.setState({donateValue: event.target.value})}
            />
          </div>
          <button>Donate</button>
          <h3>Result: {this.state.result2}</h3>
        </form>
        <hr/>
        <h3><b>Section just for manager</b></h3>
        <hr/>
        <form onSubmit = {this.GetAddresses}>
          <h4>Get the address of all the Requestee........</h4>
          <button>Click Here to get the adresses</button>
          <h3>Result: {this.state.result3}</h3>
        </form>
        <hr/>
        <form onSubmit = {this.Release}>
          <h4>Release Funds.....</h4>
          <div>
            <label>Enter the Index of the Recipent : </label>
            <input
              value = {this.state.index}
              onChange = {event => this.setState({index: event.target.value})}
            />
          </div>
          <button>Donate</button>
          <h3>Result: {this.state.result4}</h3>
        </form>
      </div>
    );
  }
}

export default App;
