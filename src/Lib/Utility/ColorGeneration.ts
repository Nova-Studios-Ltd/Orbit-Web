import { GetRandomInt } from "Lib/Utility/Utility";

function HslToHex(h: number, s: number, l: number) : string {
  try {
    const ll = l / 100;
    const a = s * Math.min(ll, 1 - ll) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  catch {
    return "#FFF";
  }
}

function RGBCompToHex(c: number) : string {
  const hex = c.toString(16);
  return hex.length === 1? "0" + hex : hex;
}

function RgbToHex(r: number, g: number, b: number) {
  return `#${RGBCompToHex(r)}${RGBCompToHex(g)}${RGBCompToHex(b)}`;
}

/**
 * Generate a HEX color string
 * @param lightness Optional lightness value (default: 75)
 * @returns A HEX string containing a color
 */
export default function GenerateRandomColor(lightness: number = 75) : string {
  return HslToHex(GetRandomInt(0, 360), GetRandomInt(0, 100), lightness);
}

/**
 * Generates a HEX color string using random RGB values
 * @returns A HEX string containing a color
 */
export function GenerateRandomHexColor() : string {
  return RgbToHex(GetRandomInt(0, 255), GetRandomInt(0, 255), GetRandomInt(0, 255));
}

