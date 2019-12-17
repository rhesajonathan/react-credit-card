import React from 'react';
import './styles.css';

function formatCreditCardNumber(number){
  let template = "0000 0000 0000 0000";
  let length = number.length;

  return number + template.substring(length);
}

function renderLogo(creditCardNumber){

  let firstDigit = creditCardNumber.charAt(0);

  if(firstDigit === "4"){
    return <img className="Visa" src="http://www.pngall.com/wp-content/uploads/2017/05/Visa-Logo-PNG-Image.png"  alt="Visa logo vector download" />;
  }
  else if(firstDigit === "5"){
    return <img className="Mastercard" src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png"/>
  }
}

function CreditCard({number = "0000 0000 0000 0000",owner = "John Doe",expired = "20/20",cvv = "123",rotate = false}){
    let styleRotate = rotate == true?{transform: 'rotateY(180deg)'}:{};
    return(
        <div className="credit-card-container">
          <div className="credit-card-inner" style={styleRotate}>
            <div className="credit-card-container-front">
              <div className="credit-card-logo">
                {renderLogo(number)}
              </div>
              <div className="credit-card-number">
                    {formatCreditCardNumber(number)}
              </div>
              <div>
                <div className="credit-card-owner-name">
                    {owner == ''?'John Doe':owner}
                </div>
                <div className="credit-card-expired">
                    <div>
                      VALID
                      <br/>
                      THRU
                    </div>
                    {expired == ''?'20/20':expired}
                </div>
              </div>
            
            </div>
            <div className="credit-card-container-back">
              <div className="credit-card-magnetic-stripe">

              </div>
              <div>
                <div className="credit-card-signature-area">
                    
                </div>
                <div className="credit-card-cvv">
                    {cvv == ''?'XXX':cvv}
                </div>
              </div>
            </div>
          </div>
        </div>

    );
}

export default CreditCard