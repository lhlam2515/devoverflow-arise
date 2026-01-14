import { techDescriptionMap } from "@/constants/techDescriptionMap";
import { techMap } from "@/constants/techMap";

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export function getDeviconClassName(techName: string) {
  const normalizedTechName = techName.toLowerCase().replace(/[ .]/g, "");

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
}
