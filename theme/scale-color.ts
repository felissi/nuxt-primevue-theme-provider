import chroma from "chroma-js";

/** @description Function for sass scale-color 
 * @example
 * ```javascript
 * console.log(
    scaleColor('#123123', { lightness: 20 }),
    scaleColor('#123123', { lightness: 50 }),
    scaleColor('#123123', { lightness: 90 }),
    scaleColor('#123123', { lightness: -80 }),
  )
  // #2a7251 #5dc395 #dff3ea #040a07 
 * ```
 * 
*/
export function scaleColor(color: string, { saturation = 0, lightness = 0 } = {}) {
  const changed = (change: number, x: number): number =>
    change < 0
      ? (1 - Math.abs(change) / 100) * x
      : 1 - (1 - change / 100) * (1 - x);
  const hsl = chroma(color).hsl();
  const newSaturation = changed(saturation, hsl[1]);
  const newLightness = changed(lightness, hsl[2]);
  return chroma.hsl(hsl[0], newSaturation, newLightness).hex();
}
