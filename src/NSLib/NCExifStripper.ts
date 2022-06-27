export async function StripExif(image: Blob) : Promise<Blob | undefined> {
  if (image.type !== "image/jpeg") return undefined;

}

async function removeExif(image: Blob, dv: DataView) : Promise<Blob> {
  let offset = 0, recess = 0;
  let pieces = [];
  let i = 0;
  if (dv.getUint16(offset) === 0xffd8) {
    offset += 2;
    const app1 = 0;
    offset += 2;
    while (offset < dv.byteLength) {
      if (app1 === 0xffe1) {
        pieces[i] = {recess,offset};
        recess = offset + dv.getUint16(offset);
        i++;
      }
      else if (app1 === 0xffda) {
        break;
      }
      offset += dv.getUint16(offset);
      let app1 = dv.getUint16(offset);
      offset += 2;
    }
    if (pieces.length > 0) {
      let newPeices = [];
      pieces.forEach(function(v) {
        newPeices.push(image.slice(v.recess, v.offset));
      }, this);
      newPeices.push(image.slice(recess));
      let br = new Blob(newPeices, {type: "image/jpeg"});
      return br;
    }
  }
  return null;
}
