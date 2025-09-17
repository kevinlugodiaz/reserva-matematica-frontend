import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '../enums/block-process.enum';
import { StageProcess } from '../enums/stage-process.enum';
import { ProcessStatus } from '../enums/process-status.enum';

export interface ProcessStatusResponse {
  id: number;
  idPeriodo: string;
  idProcess?: string;
  idProducto: ProductCode;
  idEstado: ProcessStatus;
  horaInicio: Date;
  horaFin: Date | null;
  descripcion: string | null;
  bloque: BlockProcess;
  etapa: StageProcess;
  dDregtimestamp?: Date;
	fechaHora?: Date;
}
