import { inject, Injectable } from '@angular/core';

import { ApiService } from '@core/api/api.service';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '../enums/block-process.enum';
import { StageProcess } from '../enums/stage-process.enum';
import { ProcessStatusResponse } from '../interfaces/process-status-response.interface';
import { SyncProcessRequest } from '../interfaces/sync-process.interface';
import { ApiResponse } from '@core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  private readonly apiService = inject(ApiService);

  syncProcess(payload: SyncProcessRequest) {
    return this.apiService.post<ApiResponse<boolean>, SyncProcessRequest>('sync', payload);
  }

  getStatus(productId: ProductCode, period: string, block: BlockProcess, stage: StageProcess) {
	  console.log(block);
	  console.log(stage);
    return this.apiService.get<ProcessStatusResponse>(`process/status/${productId}/${period}`);
  }

  getFile(productId: ProductCode, period: string, block: BlockProcess, stage: StageProcess) {
    return this.apiService.getFile(`process/file/${productId}/${period}/${block}/${stage}`);
  }
}
