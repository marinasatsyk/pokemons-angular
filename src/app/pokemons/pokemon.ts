
export interface Pokemon {
    _id:string;
    name:string;
    hp:number;
    cp:number;
    picture:string;
    types: string[];
    created:Date;
}