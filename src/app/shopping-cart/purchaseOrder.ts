export class PurchaseOrder {
    PurchaseOrderId! : number;
    ApplicationUserId! : number;
    Username!: string;
    PurchaseOrderDate!: Date;
    PurchaseOrderTotalAmount!: number;
    AddressStreetNumber!: string;
    AddressStreetName!: string;
    AddressCity!: string;
    AddressState!: string;
    AddressZipCode!: string;
    CardId!: number;
    CardNumber!: number;
}