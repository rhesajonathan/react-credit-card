import React from 'react';
import './styles.css';

function formatCreditCardNumber(number){
  let template = "0000 0000 0000 0000";
  let length = number.length;

  return number + template.substring(length);
}

function CreditCard({number,owner,expired,cvv,rotate}){
    let styleRotate = rotate == true?{transform: 'rotateY(180deg)'}:{};
    return(
        <div className="credit-card-container">
          <div className="credit-card-inner" style={styleRotate}>
            <div className="credit-card-container-front">
              <div className="credit-card-logo">
                <img src="https://seeklogo.net/wp-content/uploads/2016/11/visa-logo-preview-400x400.png"  alt="Visa logo vector download" />
              </div>
              <div className="credit-card-number">
                    {formatCreditCardNumber(number)}
              </div>
              <div>
                <div className="credit-card-owner-name">
                    {owner == ''?'John Doe':owner}
                </div>
                <div className="credit-card-expired">
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
                    {cvv == ''?'123':cvv}
                </div>
              </div>
            </div>
          </div>
        </div>

    );
}

export default CreditCard