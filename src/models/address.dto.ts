import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    cep: string;
    city: CityDTO;
}