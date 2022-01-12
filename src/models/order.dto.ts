import { OrderItemDTO } from "./orderItem.dto";
import { PaymentDTO } from "./payment.dto";
import { ReferenceDTO } from "./reference.dto";

export interface OrderDTO {
    client: ReferenceDTO;
    deliveryAddress: ReferenceDTO;
    payment: PaymentDTO;
    items: OrderItemDTO[];

}