import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';

export interface ApproveStageRequest {
  productId: ProductCode;
  period: string;
  block: BlockProcess;
  stage: StageProcess;
}
