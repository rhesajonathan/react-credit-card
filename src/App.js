import React from 'react';
import './App.css';
import CreditCard from './components/CreditCard/CreditCard'
import TextInput from './components/TextInput/TextInput'
import Button from './components/Button/Button'
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      creditCardNumber : {
        value : '',
        isValid : true,
        invalidReason : ''
      },
      creditCardOwner : {
        value : '',
        isValid : true,
        invalidReason : ''
      },
      creditCardExpired : {
        value : '',
        isValid : true,
        invalidReason : ''
      },
      creditCardCvv : {
        value : '',
        isValid : true,
        invalidReason : ''
      },
      isRotate : false,
      isComplete : false
    };
  }

  isInputValid = () => {
    let tempState = this.state;

    for(var prop in tempState){
      if(typeof tempState[prop] === 'object' && tempState[prop] !== null && tempState[prop].value === ""){
       return false;
      }
    }

    return true;
  }

  handleInput = (event) =>{

    let targetName = event.target.name;
    if(targetName == 'creditCardNumber'){
      this.handleCreditCardNumber(event);
    }
    else if(targetName == 'creditCardOwner'){
      this.handleCreditCardOwner(event);
    }
    else if(targetName == 'creditCardExpired'){
      this.handleCreditCardExpired(event);
    }
    else if(targetName == 'creditCardCvv'){
      this.handleCreditCardCvv(event);
    }

    if(this.isInputValid()){
      this.setState({isComplete : true});
    }
    else 
    {
      this.setState({isComplete : false});
    }
  }

  handleCreditCardNumber = (event) =>{
    let creditCardNumber = event.target.value;
    if((/^[\d\s]+$/.test(creditCardNumber) && creditCardNumber.length < 20 )|| creditCardNumber === '' ){
      let creditCardNumberArray = creditCardNumber.split(" ");
      let lastArray = creditCardNumberArray[creditCardNumberArray.length-1]

      let isNotBackSpace = (creditCardNumber.length - this.state.creditCardNumber.value.length) > 0

      let validCardNumber = true;
      if((creditCardNumber.charAt(0) !== "4" && creditCardNumber.charAt(0) !== "5")){
        validCardNumber = false;
      }
     
      if(lastArray.length === 4 && creditCardNumberArray.length !== 4 && isNotBackSpace){

        let creditCardNumberSpace = creditCardNumber+" ";
        this.setState({[event.target.name]:{
          value: creditCardNumberSpace,
          isValid:true,
          invalidReason:""
        }},()=>console.log(this.state));

        if(!validCardNumber){
          this.setState({[event.target.name]:{
            value: creditCardNumberSpace,
            isValid:false,
            invalidReason:"Credit card number is not recognized"
          }});
        }

      }
      else{

        this.setState({[event.target.name]:{
          value: creditCardNumber,
          isValid:true,
          invalidReason:""
        }},()=>console.log(this.state));

        if(!validCardNumber){
          this.setState({[event.target.name]:{
            value: creditCardNumber,
            isValid:false,
            invalidReason:"Credit card number is not recognized"
          }});
        }

      }
    }
  }

  handleCreditCardOwner = (event) => {
    let creditCardOwner = event.target.value

    if(/^[a-zA-Z\s]*$/.test(creditCardOwner)){
      
      creditCardOwner = creditCardOwner.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

      this.setState({[event.target.name]:{
        value:creditCardOwner,
        isValid:true,
        invalidReason:""
      }},()=>console.log(this.state));
    }

  }

  handleCreditCardExpired = (event) => {
    let creditCardExpired = event.target.value

    let length = creditCardExpired.length;
    if((/^[\d\/]{0,5}$/.test(creditCardExpired) && length < 6 )|| creditCardExpired === ''){
      
      let isMonth = false;
      let isYear = true;

      if(length >= 2){
        console.log(parseInt(creditCardExpired))

        if(length === 3 && creditCardExpired[2] !== '/'){
          creditCardExpired = creditCardExpired.substring(0,2) + '/' + creditCardExpired.substring(2);
        }

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let expiredMonth = creditCardExpired.substring(0,2);
        let currentYear = year.toString()[2]+year.toString()[3];
        let expiredYear = creditCardExpired.substring(3);


        if(parseInt(expiredMonth) > 12 || parseInt(expiredMonth) <= 0){

          this.setState({[event.target.name]:{
            value: creditCardExpired,
            isValid:false,
            invalidReason:"Expired month is invalid"
          }});
          return ;
        }
  
        if(length == 5){
          if(parseInt(expiredYear) < parseInt(currentYear)){
            this.setState({[event.target.name]:{
              value: creditCardExpired,
              isValid:false,
              invalidReason:"Card already expired"
            }});
            return;
          }
          else if(expiredYear === currentYear){
            if(month >= expiredMonth){
              this.setState({[event.target.name]:{
                value: creditCardExpired,
                isValid:false,
                invalidReason:"Card already expired"
              }});
              return;
            }
          }
        }
        
        this.setState({[event.target.name]:{
          value:creditCardExpired,
          isValid:true,
          invalidReason:""
        }},()=>console.log(this.state));
      }
      else
      {
        this.setState({[event.target.name]:{
          ...this.state.creditCardExpired,
          value:creditCardExpired
        }},()=>console.log(this.state));
      }
    }

  }

  handleCreditCardCvv = (event) => {
    let creditCardCvv = event.target.value

    if(/^[\d]{0,3}$/.test(creditCardCvv)){
      

      this.setState({[event.target.name]:{
        ...this.state.creditCardCvv,
        value:creditCardCvv
      }},()=>console.log(this.state));
    }

  }

  handleCvvFocus = (event) => {
    let inputName = event.target.name
    inputName === "creditCardCvv"?this.setState({isRotate:true}):this.setState({isRotate:false});

  }

  handleSubmitButton = () => {

    let tempState = this.state;

    for(var prop in tempState){
      if(typeof tempState[prop] === 'object' && tempState[prop] !== null){
        tempState[prop] = {
          value : '',
          isValid : true,
          invalidReason : ''
        }
      }
      else{
        tempState[prop] = false;
      }
    }
    this.setState({...tempState});
  }

  handleOnBlur = (event) => {

    if(this.state[event.target.name].value === ""){
      this.setState({[event.target.name]:{
        ...this.state[event.target.name],
        isValid: false,
        invalidReason: "Can't be empty"
      }},() => console.log(this.state));
    }
  }


  render(){
    return (
      <div className="App">
        <div>
          <CreditCard number={this.state.creditCardNumber.value} owner={this.state.creditCardOwner.value} expired={this.state.creditCardExpired.value} cvv={this.state.creditCardCvv.value} rotate={this.state.isRotate}/>
          <div className="content">
              <div className="row">
                <TextInput type="text" name ="creditCardNumber" placeholder="Credit Card Number"  size="33" onChange={this.handleInput} value={this.state.creditCardNumber.value} onFocus={this.handleCvvFocus} onBlur={this.handleOnBlur} isValid = {this.state.creditCardNumber.isValid} invalidReason = {this.state.creditCardNumber.invalidReason}/>
              </div>
              <div className="row">
                <TextInput type="text" name ="creditCardOwner" placeholder="John Doe" size="33" value={this.state.creditCardOwner.value} onChange={this.handleInput} onFocus={this.handleCvvFocus} onBlur={this.handleOnBlur} isValid = {this.state.creditCardOwner.isValid} invalidReason = {this.state.creditCardOwner.invalidReason}/>
              </div>
              <div className="row">
                <TextInput type="text" name ="creditCardExpired" placeholder="20/20" size="15" value={this.state.creditCardExpired.value} onChange={this.handleInput} onFocus={this.handleCvvFocus} onBlur={this.handleOnBlur} isValid = {this.state.creditCardExpired.isValid} invalidReason = {this.state.creditCardExpired.invalidReason}/>
                <TextInput type="number"  name ="creditCardCvv" placeholder="CVV" size="13" value={this.state.creditCardCvv.value} onChange={this.handleInput} onFocus={this.handleCvvFocus} onBlur={this.handleOnBlur} isValid = {this.state.creditCardCvv.isValid} invalidReason = {this.state.creditCardCvv.invalidReason}/>
              </div>
              <div className="row">
                <Button onClick = {this.handleSubmitButton} disabled = {this.state.isComplete}/>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
