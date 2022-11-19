export default interface invitation {
  SubmitTime?: Date | null, 
  IdTenderInvitation: number, 
  SendTime: Date, 
  FirstVisitTime: Date,
  IdTender: number,
  IdCustomerInfo: number,
  tender: tender,
  customer: customer,
}

export interface tender {
  TenderNo: string, 
  Subject: string, 
  ClosingDate: Date, 
  Cur: string,
  Note: string, 
  InvitationText: string,
  tender_products: tender_product[],
}

export interface tender_product {
  IdTenderProduct: number,
  IdCommodityProduct: string, 
  formula: string,
  publication: string, 
  product: string, 
  offer_type: string[],
  PercentageInput: number,
  AmountInput: number,
  offer: offer,
}

export interface offer {
  Qty?: string,
  Price?: string,
  PlusMinusPercent?: string,
  PlusMinusAmount?: string,
}

interface customer {
  Title: string,
}