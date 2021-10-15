export interface bonbonDataModel {
    id:number;
    title: string;
    main_title: string;
    image_url: string;
    selected:boolean;
    Items_Remaining:number;
    Candy_Machine_Config:string;
    Candy_Machine_Id:string;
    Solana_RPC_Host: string ;
    Treasury_Address: string;
    Solana_Network:string;
    config?:any;
    soldOut?:boolean;
}