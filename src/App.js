import React from 'react';
import './App.css';
import CreditCard from './components/CreditCard/CreditCard'
import TextInput from './components/TextInput/TextInput'
import Button from './components/Button/Button'
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      creditCardNumber : '',
      creditCardOwner : '',
      creditCardExpired : '',
      creditCardCvv : '',
      isRotate : false
    };
  }

  handleInput = (event) =>{
    console.log(event.target.name);
    console.log(event.target.value);
    
    this.setState({[event.target.name]:event.target.value},()=>console.log(this.state));
    
  }

  handleCreditCardNumber = (event) =>{
    let creditCardNumber = event.target.value;
    
    console.log(creditCardNumber)
    if((/^[\d\s]+$/.test(creditCardNumber) && creditCardNumber.length < 20 )|| creditCardNumber === '' ){
      let creditCardNumberArray = creditCardNumber.split(" ");
      let lastArray = creditCardNumberArray[creditCardNumberArray.length-1]

      let isNotBackSpace = (creditCardNumber.length - this.state.creditCardNumber.length) > 0

      if(lastArray.length === 4 && creditCardNumberArray.length !== 4 && isNotBackSpace){

        let creditCardNumberSpace = creditCardNumber+" ";
        this.setState({[event.target.name]:creditCardNumberSpace},()=>console.log(this.state));

      }
      else{

        this.setState({[event.target.name]:creditCardNumber},()=>console.log(this.state));

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

      this.setState({[event.target.name]:creditCardOwner},()=>console.log(this.state));
    }

  }

  handleCreditCardExpired = (event) => {
    let creditCardExpired = event.target.value

    let length = creditCardExpired.length;
    if((/^[\d\/]{0,5}$/.test(creditCardExpired) && length < 6 )|| creditCardExpired === ''){
      
      let isMonth = false;
      let isYear = true;

      if(creditCardExpired[0] == 0){

        isMonth = true;

        if(length == 2){
          if(!/^[1-9]$/.test(creditCardExpired[1])){
            isMonth = false;
          }
        }
      }
      else if(creditCardExpired[0] == 1){

        isMonth = true;

        if(length == 2){
          if(!/^[0-2]$/.test(creditCardExpired[1])){
            isMonth = false;
          }
        }
      }
      else if(creditCardExpired == ''){
        isMonth = true;
      }



      if(creditCardExpired.length === 3 && creditCardExpired[2] !== '/'){
        creditCardExpired = creditCardExpired.substring(0,2) + '/' + creditCardExpired.substring(2);
      }

      var today = new Date();
      var year = today.getFullYear();



      let isNotBackSpace = (creditCardExpired.length - this.state.creditCardExpired.length) > 0

      if(length > 2 && isNotBackSpace){
        
        if(creditCardExpired[3] < year.toString()[2]){

          isYear = false;
        }
        
        if(creditCardExpired[4] <= year.toString()[3] && creditCardExpired[3] == year.toString()[2]){
          isYear = false;
        }
      }

      if(isMonth && isYear){
        this.setState({[event.target.name]:creditCardExpired},()=>console.log(this.state));
      }
    }

  }

  handleCreditCardCvv = (event) => {
    let creditCardCvv = event.target.value

    if(/^[\d]{0,3}$/.test(creditCardCvv)){
      

      this.setState({[event.target.name]:creditCardCvv},()=>console.log(this.state));
    }

  }

  handleCvvFocus = (event) => {
    let inputName = event.target.name

    

    inputName === "creditCardCvv"?this.setState({isRotate:true}):this.setState({isRotate:false});

  }


  render(){
    return (
      <div className="App">
        <CreditCard number={this.state.creditCardNumber} owner={this.state.creditCardOwner} expired={this.state.creditCardExpired} cvv={this.state.creditCardCvv} rotate={this.state.isRotate}/>
        <div className="content">
            <div className="row">
              <TextInput type="text" name ="creditCardNumber" placeholder="Credit Card Number"  size="33" onChange={this.handleCreditCardNumber} value={this.state.creditCardNumber} onFocus={this.handleCvvFocus}/>
            </div>
            <div className="row">
              <TextInput type="text" name ="creditCardOwner" placeholder="John Doe" size="33" value={this.state.creditCardOwner} onChange={this.handleCreditCardOwner} onFocus={this.handleCvvFocus}/>
            </div>
            <div className="row">
              <TextInput type="text" name ="creditCardExpired" placeholder="20/20" size="15" value={this.state.creditCardExpired} onChange={this.handleCreditCardExpired} onFocus={this.handleCvvFocus}/>
              <TextInput type="number"  name ="creditCardCvv" placeholder="CVV" size="13" value={this.state.creditCardCvv} onChange={this.handleCreditCardCvv} onFocus={this.handleCvvFocus}/>
            </div>
            <div className="row">
              <Button/>
            </div>
        </div>
      </div>
    )
  }
}

export default App;
