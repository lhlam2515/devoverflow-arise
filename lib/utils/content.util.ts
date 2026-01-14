export const extractOuterMarkdownContent = (content = "") => {
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
