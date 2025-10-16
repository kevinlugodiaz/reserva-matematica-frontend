export interface SummaryRule {
  codigoRegla: string;
  nombreRegla: string;
  categoria: string;
  numeroCasos: number;
  numeroAciertos: number;
  numeroErrores: number;
  numeroOmitidos: number;
  porcentajeError: number;
  semaforo: 0 | 1;
}
