import { useState } from "react";
import { tender_product, offer } from "../models/Invitation"
import { NumericFormat } from 'react-number-format';
import style from './Offer.module.scss';


export default function Offer(props: {item: tender_product , currency: string, onChange: (idtenderproduct:number, offer: offer) => void}) {
  const [offer, setOffer] = useState({Qty:'', Price:'', PlusMinusAmount:'', PlusMinusPercent:''});
  const updateOffer = (e:any) => {
    e.preventDefault();
    setOffer({...offer, [e.target.name]: e.target.value});
    props.onChange(props.item.IdTenderProduct, {...offer, [e.target.name]: e.target.value});
  }
  
  return (<div className={style.offer}> 
    <h3>{props.item.product}</h3>
    <div className={style.span1}>
      <label>Quantity:</label>
      <NumericFormat decimalScale={2} name="Qty" value={offer.Qty} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
      <label>MT</label>
    </div>
    {
      props.item.publication === 'fixed' ? 
      <div className={style.span1}>
        <label>Price:</label>
        <NumericFormat decimalScale={2} name="Price" value={offer.Price} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
        <label>{props.currency}</label>
      </div> :
      <div className={style[`span${props.item.AmountInput+props.item.PercentageInput}`]}>
        <label>Plus/Minus:</label>
        {props.item.PercentageInput === 1 && 
        <>
          <NumericFormat decimalScale={2} name="PlusMinusPercent" value={offer.PlusMinusPercent} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
          <label>%</label>
        </>}
        {props.item.AmountInput === 1 && 
        <>
          <NumericFormat decimalScale={2} name="PlusMinusAmount" value={offer.PlusMinusAmount} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
          <label>{props.currency}</label>
        </>}
        
      </div> 
    }
  </div>);
}