import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";

const divisionShema=new Schema<IDivision>({
name:{type:String,required:true},
slug:{type:String,required:true,unique:true},
thumbnail:{type:String},
description:{ type:String},
},
{timestamps:true});

export const Division=model<IDivision>("Division",divisionShema)