import { ItemDetail } from "./global.type";

export interface Movie extends ItemDetail {
    name: string;
    description: string;
    url_image: string;
    url_image2: string;
}
