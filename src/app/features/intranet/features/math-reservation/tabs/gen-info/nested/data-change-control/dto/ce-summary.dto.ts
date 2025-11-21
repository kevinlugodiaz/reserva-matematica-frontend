export interface CeSummaryDto {
  resumenEndosos: CeSummary[];
  rc44: Rc44[];
}

export interface CeSummary {
  nombreEndoso: string;
  nombreVariable: string;
  idVariable: number;
  totalCasos: number;
  totalAciertos: number;
  totalErrores: number;
  porcentajeError: number;
  porcentajeAciertos: number;
  semaforo: number;
  clasificacion?: string;
  esValido: boolean;
}

export interface Rc44 {
  codigoCambio: string;
  idProceso: number;
  t15Id: number;
  polTxtId: string;
  grupoFamiliar: string;
  endoso: string;
  campo: string;
  periodoAnterior?: string;
  periodoActual?: string;
}
