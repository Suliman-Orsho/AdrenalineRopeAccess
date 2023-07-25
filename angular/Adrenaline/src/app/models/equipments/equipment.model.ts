import { UploaderImage } from "src/app/directives/image-uploader/UploaderImage.data";

export interface Equipment {
    id: number;
    name: string;
    entryDate: string;
    projectId?: number;
    images: UploaderImage[];

}