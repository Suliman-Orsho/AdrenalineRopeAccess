import { Work } from "src/app/enums/work.enum";
import { EmployeeList } from "../employees/employeeList.model";

export interface ProjectList {
    id: number;
    name: string;
    work: Work;
    income: number;
    isPaid: boolean;
    spending: number;
    startDate?: string;
    finishDate?: string;    
}