import { Work } from "src/app/enums/work.enum";
import { EmployeeList } from "../employees/employeeList.model";
import { Equipment } from "../equipments/equipment.model";

export interface ProjectDetails {
    id: number;
    name: string;
    work: Work;
    income: number;
    isPaid: boolean;
    spending: number;
    startDate?: string;
    finishDate?: string;
    clientNumber: string;
    linesCount: number;
    employees: EmployeeList[];
    equipments: Equipment[];
}