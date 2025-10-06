import { ProductCode } from '@shared/enums/branch-code.enum';

export interface SyncProcessRequest {
  productId: ProductCode;
  period: string;
}
