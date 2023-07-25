import { UploaderImage } from "src/app/directives/image-uploader/UploaderImage.data";

export interface EquipmentDetails {
    id: number;
    name: string;
    entryDate: string;
    projectName: string;
    images: UploaderImage[];

}