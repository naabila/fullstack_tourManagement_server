import { generateSlug } from "../../utils/generateSlug";
import { IDivision } from "./division.interface"
import { Division } from "./division.model"

//create divition
const createDivition=async(payload:Partial<IDivision>)=>{
const isExist=await Division.findOne({name:payload.name});
// if(isExist){
//     throw new Error("Division Already Exists")
// }

const slug=await generateSlug(payload.name!);
const division=await Division.create({
    ...payload,
    slug
})
return division;
}

//get all division
const getAllDivision=async()=>{
    const divisions=await Division.find();
    return divisions
}

//delete division
const deleteDivision=async(id:string)=>{
    const deleted=await Division.findByIdAndDelete(id);
    if(!deleted){
        throw new Error("Division not found");

    }

    return deleted
}

//update division
const updateDivision=async(payload:Partial<IDivision>,id:string)=>{
   if (payload.name) {
      payload.slug = await generateSlug(payload.name);
    }

    const updated = await Division.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updated) {
      throw new Error("Division not found");
    }

    return updated; 
}

export const divisionService= {
    createDivition,
    getAllDivision,
    deleteDivision,
    updateDivision

}

