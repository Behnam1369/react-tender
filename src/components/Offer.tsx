import { useState } from "react";
import { tender_product } from "../models/Invitation"
import { NumericFormat } from 'react-number-format';
import style from './Offer.module.scss';


export default function Offer(props: {item: tender_product , currency: string}){
  const [offer, setOffer] = useState({qty:0, price:0, plusminusamount:0, plusminuspercent:0});
  const updateOffer = (e:any) => {
    e.preventDefault();
    setOffer({...offer, [e.target.name]: e.target.value});
  }
  
  return (<div className={style.offer}> 
    <h3>{props.item.product}</h3>
    <div className={style.span1}>
      <label>Quantity:</label>
      <NumericFormat decimalScale={2} name="qty" value={offer.qty} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
      <label>MT</label>
    </div>
    {
      props.item.publication === 'fixed' ? 
      <div className={style.span1}>
        <label>Price:</label>
        <NumericFormat decimalScale={2} name="price" value={offer.price} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
        <label>{props.currency}</label>
      </div> :
      <div className={style[`span${props.item.AmountInput+props.item.PercentageInput}`]}>
        <label>Plus/Minus:</label>
        {props.item.AmountInput === 1 && 
        <>
          <NumericFormat decimalScale={2} name="plusminusamount" value={offer.plusminusamount} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
          <label>{props.currency}</label>
        </>}
        {props.item.PercentageInput === 1 && 
        <>
          <NumericFormat decimalScale={2} name="plusminuspercent" value={offer.plusminuspercent} onChange={(e) => updateOffer(e)} thousandSeparator=","  />
          <label>%</label>
        </>}
      </div> 
    }
  </div>);
}