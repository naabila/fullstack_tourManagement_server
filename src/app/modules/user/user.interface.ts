import { Types } from "mongoose"

export enum isActive{
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED"
}

export enum Role{
    SUPER_ADMIN="SUPER_ADMIN",
    ADMIN="ADMIN",
    USER="USER",
    GUIDE="GUIDE"
}

export interface isAuthProvider{
    provider:"google" | "credentials",
    providerId:string
}

export interface IUser{
    name:string,
    email:string,
    password:string,
    phone?:string,
    picture?:string,
    address?:string,
    isDeleted?:boolean,
    isActive?:isActive,
    isVerified?:string,
    role: Role,
    auths:isAuthProvider[],
    bookings?:Types.ObjectId[],
    guide?:Types.ObjectId[]

}