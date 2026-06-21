const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateFavicon() {
  const svgPath = path.join(__dirname, "public", "hinode-logo.svg");
  const faviconPath = path.join(__dirname, "src", "app", "favicon.ico");

  const svgBuffer = fs.readFileSync(svgPath);

  // Generate a 48x48 PNG from the SVG (standard favicon size)
  const pngBuffer = await sharp(svgBuffer)
    .resize(48, 48, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // Write as PNG (Next.js App Router accepts PNG in favicon.ico slot)
  fs.writeFileSync(faviconPath, pngBuffer);
  console.log("Favicon generated successfully at", faviconPath);
}

generateFavicon().catch(console.error);
