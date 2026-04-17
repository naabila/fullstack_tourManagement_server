import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { Tour, TourType } from "./tour.model"

const createTourType=async(payload:{name:string})=>{
const isExists=await TourType.findOne({name:payload.name});

if(isExists){
    throw new AppError(400,"Tour type already existys")
}

return await TourType.create(payload)

};

//get all tour type
const getAllTourTypes=async()=>{
    const tours=TourType.find();
    return tours
}

//update tourtype
 const updateTourType=async(id: string, payload: { name?: string })=> {
    const updated = await TourType.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updated) {
      throw new AppError(404, "Tour type not found");
    }

    return updated;
  }

//delete tour type
const deleteTourType = async (id: string) => {
  // 1. Check existence first
  const isExists = await TourType.findById(id);
  if (!isExists) {
    throw new AppError(404, "Tour type does not exist");
  }

  // 2. Check if used
  const isUsed = await Tour.findOne({ tourType: id });
  if (isUsed) {
    throw new AppError(400, "Tour type already used");
  }

  // 3. Delete
  const deleted = await TourType.findByIdAndDelete(id);

  return deleted;
};

export const tourService={
createTourType,
getAllTourTypes,
deleteTourType,
updateTourType
}