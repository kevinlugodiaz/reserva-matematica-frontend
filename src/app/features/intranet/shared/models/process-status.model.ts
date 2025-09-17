import { ProductCode } from '@shared/enums/branch-code.enum';
import { ProcessStatus } from '../enums/process-status.enum';
import { BlockProcess } from '../enums/block-process.enum';
import { StageProcess } from '../enums/stage-process.enum';
import { ProcessStatusResponse } from '../interfaces/process-status-response.interface';

export class ProcessStatusModel {
  constructor(
    public id: number | undefined,
    public periodId: string,
    public productId: ProductCode,
    public statusId: ProcessStatus,
    public label: string,
    public startTime: Date,
    public endTime: Date | null,
    public description: string | null,
    public block: BlockProcess,
    public stage: StageProcess,
    public createdAt: Date,
  ) {}

  static getStatusLabel(code: ProcessStatus): string {
    switch (code) {
      case ProcessStatus.Pending:
        return 'Pendiente';
      case ProcessStatus.InProgress:
        return 'En Proceso';
      case ProcessStatus.Completed:
        return 'Completado';
      case ProcessStatus.Failed:
        return 'Fallido';
      case ProcessStatus.Disrupted:
        return 'Interrumpido';
      default:
        return 'Desconocido';
    }
  }

  static build(payload: ProcessStatusResponse): ProcessStatusModel {
    let date: Date = new Date();
    if (payload?.dDregtimestamp) {
      date = new Date(payload.dDregtimestamp!);
    }

    if (payload?.fechaHora) {
      date = new Date(payload.fechaHora!);
    }

    return new ProcessStatusModel(
      payload.id,
      payload.idPeriodo,
      payload.idProducto,
      payload.idEstado,
      this.getStatusLabel(payload.idEstado),
      new Date(payload.horaInicio),
      payload.horaFin ? new Date(payload.horaFin) : null,
      payload.descripcion,
      payload.bloque,
      payload.etapa,
      date,
    );
  }
}
