import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import invitation, { tender, offer } from '../models/Invitation';
import host from "../utils/host";
import style from './Invitation.module.scss';
import Offer from "./Offer";

const http = axios.create({ baseURL: host});

export default function Invitation(){
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState('');
  const [invitation, setInvitation] = useState<invitation>();

  useEffect(()=>{

    const loadData = async () => {
      await http.get<invitation>(`/invitation/${id}`).then((res)=>{
        setInvitation(res.data);
        setLoading(false);
      });
    }
    loadData();
  },[id]);

  useEffect(()=>{
    const visited = async () => {
      await http.patch<invitation>(`/invitation/${id}/visit`);
    }
    if (invitation && !invitation.FirstVisitTime) {
      visited();
    }
  }, [id, invitation]);
    

  const updateOffer = (idtenderproduct:number, offer: offer) => {
    console.log(offer);
    setInvitation({...invitation, 
                      tender: {...invitation?.tender, 
                              tender_products: invitation?.tender.tender_products.map((item) => {
                                if (item.IdTenderProduct === idtenderproduct) {
                                  return {...item, offer};
                                }
                                return item;
                              })
                            } as tender
                          } as invitation); 

  }

  const submitOffer = async (e:any) => {
    e.preventDefault();
    setSubmitted('Submitting');
    let data = { offers: invitation?.tender.tender_products.map((item) => {
      return { 
        IdTenderInvitation: invitation.IdTenderInvitation, 
        IdTenderProduct: item.IdTenderProduct, 
        Qty: item.offer.Qty?.replace(/,/g,''), 
        Price: item.offer.Price?.replace(/,/g,''),  
        PlusMinusAmount: item.offer.PlusMinusAmount?.replace(/,/g,''),
        PlusMinusPercent: item.offer.PlusMinusPercent?.replace(/,/g,''),
      } 
    })};
    await http.post<offer[]>(`/invitation/${id}/offer`, data).then((res)=>{console.log(res.data);});
    setSubmitted('Submitted');
  }

  const discard = (e:any) => {
    e.preventDefault();
    setInvitation({...invitation as invitation, SubmitTime: null});
  }

  return (
    <div>
      {loading ? <h2>Loading...</h2> : 
       !invitation? <h2>Tender inviattion link is not valid.</h2> : 
        invitation.tender.ClosingDate < new Date() ? <h2>Tender inviattion link is expired.</h2> :
        submitted ? <h2>Thanks for submitting your offer. You will receive a copy of your submission into your mailbox shortly.</h2> :
        invitation.SubmitTime ? <h2>You have already submitted your offer for this tender.
          <br/>If you want to change your offer you can discard the offer you submitted before and submit a new one.
          <br/>
          <button className={style.btn} onClick={(e)=> discard(e)} style={{width: '270px'}}>Discard my previous offer</button>
        </h2> :
      <>
        <h2 className={style.customer}>To: {invitation.customer.Title}</h2>
        <div className={style.invitation} dangerouslySetInnerHTML={{__html: invitation.tender.InvitationText}}></div>
        <div className={style.your_offer}> 
          <h2>Submit Your Offer</h2>
          <div className={style.offers}>
            {invitation.tender.tender_products.map((offer, index) => {
              return <Offer key={offer.IdTenderProduct} item={offer} currency={invitation.tender.Cur} onChange={updateOffer}/>
            })}
          </div>
          <p>By clicking on the below button, you hereby confirm and acknowledge that you have read and
          understood the terms and conditions of this tender.</p>
          <button className={style.btn} onClick={(e)=>submitOffer(e)}> {submitted === 'Submitting' ? 'Submit ...': 'Submit'} </button>
        </div>
      </>}
    </div>
  );
};
