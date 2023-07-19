import { Gender } from "src/app/enums/gender.enum";
import { Rank } from "src/app/enums/rank.enum";

export interface EmployeeList {
    id: number;
    fullName: string;
    gender: Gender;
    age: number;
    rank: Rank;
    mobileNumber: string;
    salary: number;
}