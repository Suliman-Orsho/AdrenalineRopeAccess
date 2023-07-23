import { Work } from "src/app/enums/work.enum";

export interface ProjectDetails {
    id: number;
    name: string;
    work: Work;
    income: number;
    isPaid: boolean;
    spending: number;
    startDate: string;
    finishDate: string;
    clientNumber: string;
    linesCount: number;
    
}