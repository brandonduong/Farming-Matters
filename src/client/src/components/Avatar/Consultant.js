import React, { useState } from 'react';
import AvatarDialog from './AvatarDialog';
import { consultantDialog } from '../GameLogic/constants';
import { useEffect } from 'react';

const Consultant = (props) => {
  const defaultPrice = 150; //$150
  const [consultantPrice, setConsultantPrice] = useState(defaultPrice);

  function canPurchaseConsultant() {
    if (props.money < consultantPrice) {
      return false;
    }
    return true;
  }

  function purchaseConsultant() {
    if (!canPurchaseConsultant()) {
      return;
    }
    const currentMoney = props.money;
    props.setMoney(currentMoney - consultantPrice);
    props.setAccessToConsultant(true);
    //console.log("PURCHASED CONSULTANT");
    //console.log("ACCESS TO CONSULTANT = "+props.accessToConsultant);
  }

  return (
    <div>
      {
        <AvatarDialog
          isConsultant={true}
          purchaseConsultant={purchaseConsultant}
          canPurchaseConsultant={canPurchaseConsultant}
          consultantPrice={consultantPrice}
          statement={props.consultantStatement}
          {...props}
        />
      }
    </div>
  );
};
export default Consultant;
