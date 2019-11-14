export function getClipBox(node) {
  const cliplength = node.style.clip.length - 1;
  let clipArr = node.style.clip.slice(5, cliplength).split(",");

  const clipMap = clipArr.map(clip => {
    return parseInt(clip.replace("px", ""));
  });
  console.log("clipArr", clipMap);

  return {
    top: clipMap[0],
    right: clipMap[1],
    bottom: clipMap[2],
    left: clipMap[3]
  };
}
