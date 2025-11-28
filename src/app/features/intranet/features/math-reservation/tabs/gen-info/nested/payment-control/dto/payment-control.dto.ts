export interface PaymentControlDto {
  groups: PaymentGroup[];
  totalConsolidado: {
    totalOpSoles: number;
    totalContSoles: number;
    diferenciaSoles: number;
  } | null;
}

interface PaymentGroup {
  prestacion: string;
  detalles: PaymentDetail[];
  subtotal: PaymentDetail;
}

interface PaymentDetail {
  moneda: string;
  opTotal: number;
  contTotal: number;
  diferencia: number;
}
