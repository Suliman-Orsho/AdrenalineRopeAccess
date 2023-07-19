import { Address } from "src/app/enums/address.enum";
import { Gender } from "src/app/enums/gender.enum";
import { Nationality } from "src/app/enums/nationality.enum";
import { Rank } from "src/app/enums/rank.enum";

export interface EmployeeDetails {
    id: number;
    fullName: string;
    gender: Gender;
    dob: string;
    irataLevel: number;
    address: Address;
    salary: number;
    nationality: Nationality;
    mobileNumber: string;
    rank: Rank;
    totalAdvances: number;
    age: number;
}