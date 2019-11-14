export function getClipBox(node) {
    let clipMap = [];

    if (node.style.clip !== "") {
        const cliplength = node.style.clip.length - 1;
        let clipArr = node.style.clip.slice(5, cliplength).split(",");
        
        console.log('clipArr',node.style)
        
        clipMap = clipArr.map(clip => {
            return parseInt(clip.replace("px", ""));
        });
    } else {
        clipMap = [0,0,0,0];
    }

  return {
    top: clipMap[0],
    right: clipMap[1],
    bottom: clipMap[2],
    left: clipMap[3]
  };
}
