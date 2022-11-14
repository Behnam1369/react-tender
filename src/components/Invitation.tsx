import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import invitation from '../models/Invitation';
import host from "../utils/host";
import style from './Invitation.module.scss';

const http = axios.create({ baseURL: host});

export default function Invitation(){
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
      console.log('visited');
    }
  }, [id, invitation]);
    


  return (
    <div>
      {loading ? <h2>Loading... {id}</h2> : 
       !invitation? <h2>Tender inviattion link is not valid</h2> : 
        invitation.tender.ClosingDate < new Date() ? <h2>Tender inviattion link is expired</h2> :
        invitation.SubmitTime ? <h2>You have already submitted your offer for this tender</h2> :
      <>
        <div className={style.invitation} dangerouslySetInnerHTML={{__html: invitation.tender.InvitationText}}></div>
      </>}
    </div>
  );
};
