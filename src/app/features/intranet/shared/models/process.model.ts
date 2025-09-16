import { ProcessStatusModel } from '../models/process-status.model';

export class ProcessModel {
	period?: string | undefined;
  status: ProcessStatusModel | undefined;
}
