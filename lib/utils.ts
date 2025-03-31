import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techDescriptionMap } from "@/constants/techDescriptionMap";
import { techMap } from "@/constants/techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getTimeStamp(createdAt: Date) {
  const date = new Date(createdAt);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};

export const extractOuterMarkdownContent = (content: string) => {
  const startMarker = "```markdown";
  const endMarker = "```";

  let startMarkerIndex = content.indexOf(startMarker);
  if (startMarkerIndex === -1) {
    return "";
  }
  startMarkerIndex = content.indexOf("\n", startMarkerIndex) + 1;

  const endMarkerIndex = content.lastIndexOf(endMarker, content.length - 1);
  if (endMarkerIndex === -1 || endMarkerIndex <= startMarkerIndex) {
    return "";
  }

  return content.substring(startMarkerIndex, endMarkerIndex).trim();
};
