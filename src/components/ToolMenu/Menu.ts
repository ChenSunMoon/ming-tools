export interface Menu  {
    name: string,
    key: string,
    icon?:string,
    path?:string,
    children?: Menu[]
}
export interface MenuItem {
    name: string,
    key: string,
    icon?:string
}