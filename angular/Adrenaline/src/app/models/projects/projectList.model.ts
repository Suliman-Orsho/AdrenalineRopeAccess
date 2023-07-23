import { Work } from "src/app/enums/work.enum";

export interface ProjectList {
    id: number;
    name: string;
    work: Work;
    income: number;
    isPaid: boolean;
    spending: number;
    startDate: string;
    finishDate: string;
}