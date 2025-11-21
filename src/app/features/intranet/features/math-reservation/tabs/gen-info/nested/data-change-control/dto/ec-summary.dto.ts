export interface EcSummaryDto {
  codigoRegla: string;
  nombreEndoso: string;
  nombreVariable: string;
  idVariable: number;
  totalCasos: number;
  totalAciertos: number;
  totalErrores: number;
  porcentajeError: number;
  porcentajeAciertos: number;
  semaforo: number;
  clasificacion: string;
  esValido: boolean;
}
