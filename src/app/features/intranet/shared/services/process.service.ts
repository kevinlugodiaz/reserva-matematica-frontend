import { inject, Injectable } from '@angular/core';

import { ApiService } from '@core/api/api.service';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '../enums/block-process.enum';
import { StageProcess } from '../enums/stage-process.enum';
import { ProcessStatusResponse } from '../interfaces/process-status-response.interface';
import { SyncProcessRequest } from '../interfaces/sync-process.interface';
import { ApproveStageRequest } from '@intranet/shared/interfaces/approve-stage.interface';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  private readonly apiService = inject(ApiService);

  syncProcess(payload: SyncProcessRequest) {
    return this.apiService.post<ProcessStatusResponse, SyncProcessRequest>('sync', payload);
  }

  approveStage(payload: ApproveStageRequest) {
    return this.apiService.post<ProcessStatusResponse, ApproveStageRequest>('process/approve', payload);
  }

  getStatus(productId: ProductCode, period: string) {
    return this.apiService.get<ProcessStatusResponse>(`process/status/${productId}/${period}`);
  }

  getFile(productId: ProductCode, period: string, block: BlockProcess, stage: StageProcess) {
    return this.apiService.getFile(`process/file/${productId}/${period}/${block}/${stage}`);
  }
}
