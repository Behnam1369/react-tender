export default interface invitation {
  SubmitTime: Date, 
  IdTenderInvitation: number, 
  SendTime: Date, 
  FirstVisitTime: Date,
  IdTender: number,
  IdCustomerInfo: number,
  tender: tender,
  customer: customer,
}

interface tender {
  TenderNo: string, 
  Subject: string, 
  ClosingDate: Date, 
  Cur: string,
  Note: string, 
  InvitationText: string,
  tender_products: tender_product[],
}

interface tender_product {
  IdCommodityProduct: string, 
  formula: string,
  publication: string, 
  Product: string, 
  offer_type: string[],
}

interface customer {
  title: string,
}