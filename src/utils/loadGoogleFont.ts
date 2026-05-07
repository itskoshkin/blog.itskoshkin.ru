import { readFile } from "node:fs/promises";
import { join } from "node:path";

type SatoriFont = {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: string;
};

async function loadLocalFont(path: string): Promise<ArrayBuffer> {
  const buffer = await readFile(join(process.cwd(), path));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}

async function loadOptionalFont(path: string): Promise<ArrayBuffer | null> {
  try {
    const buffer = await readFile(path);
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  } catch {
    return null;
  }
}

async function loadGoogleFonts(_text: string): Promise<SatoriFont[]> {
  void _text;

  const fontsConfig = [
    {
      name: "Canela Deck",
      path: "public/fonts/CanelaDeck-Regular.woff",
      weight: 400,
      style: "normal",
    },
    {
      name: "Canela Deck",
      path: "public/fonts/CanelaDeck-Bold.woff",
      weight: 700,
      style: "normal",
    },
    {
      name: "Canela Text",
      path: "public/fonts/CanelaText-Light.woff",
      weight: 300,
      style: "normal",
    },
    {
      name: "Canela Text",
      path: "public/fonts/CanelaText-Medium.woff",
      weight: 500,
      style: "normal",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, path, weight, style }) => ({
      name,
      data: await loadLocalFont(path),
      weight,
      style,
    }))
  );

  const georgia = await loadOptionalFont(
    "/System/Library/Fonts/Supplemental/Georgia.ttf"
  );

  if (georgia) {
    fonts.push({
      name: "Georgia",
      data: georgia,
      weight: 400,
      style: "normal",
    });
  }

  return fonts;
}

export default loadGoogleFonts;
