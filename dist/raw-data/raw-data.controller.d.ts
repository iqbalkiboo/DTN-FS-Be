import { RawDataService } from './raw-data.service';
export declare class RawDataController {
    private readonly rawDataService;
    constructor(rawDataService: RawDataService);
    getGraph(enodebId: string, cellId: string, startDateStr: string, endDateStr: string): Promise<void>;
}
