import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const POST = async (req: NextRequest) => {
  try {
    const { htmlContent } = await req.json();

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const cssPath = path.join(
      process.cwd(),
      "public",
      "styles",
      "blocknote.css"
    );
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Add the BlockNote ShadCN styles to the HTML content
    const contentWithCSS = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>${cssContent}</style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    await page.setContent(contentWithCSS, { waitUntil: "networkidle0" });

    // Generate the PDF with styles applied
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "60px", bottom: "60px", left: "20px", right: "20px" },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
