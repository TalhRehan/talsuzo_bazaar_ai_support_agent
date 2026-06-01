import { productType } from "./product.type";

export interface CartData{

cartOwner:string;
createdAt: string;
products:product[];
totalCartPrice:number;
updatedAt: string;
__v:number;
_id:string;


}
export interface product{
    count: number;
    price:number;
    _id: string;
    product: productType
}