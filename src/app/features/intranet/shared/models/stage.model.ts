export class StageModel {
  static getStageLabel(code: string) {
    switch (code) {
      case '11':
        return 'Generación de Reporte (Foto del Mes)';
      case '12':
        return 'Control de Producción de Primas';
      case '13':
        return 'Reglas de Validación';
      case '14':
        return 'Control de Cambio de Datos';
      default:
        return 'Desconocido';
    }
  }
}
