import { Division } from "../modules/division/division.model";

export const generateSlug = async (name: string) => {
  const baseSlug = name.toLowerCase().split(" ").join("-");

  let slug = `${baseSlug}-division`;
  let count = 0;

  while (await Division.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-division-${count}`;
  }

  return slug;
};