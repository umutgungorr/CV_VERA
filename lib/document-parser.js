import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

import { cleanText, MAX_FILE_SIZE } from "./input-validation.js";

export async function extractResumeText(file) {
  if (!file || typeof file.size !== "number" || typeof file.name !== "string") {
    throw new Error("UNSUPPORTED_FILE");
  }

  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    throw new Error("FILE_SIZE");
  }

  const filename = file.name.trim().toLowerCase();
  const data = Buffer.from(await file.arrayBuffer());

  if (filename.endsWith(".pdf")) {
    if (data.subarray(0, 5).toString("ascii") !== "%PDF-") {
      throw new Error("INVALID_PDF");
    }

    const parser = new PDFParse({ data });
    try {
      const result = await parser.getText({ first: 10 });
      return cleanText(result.text ?? "");
    } finally {
      await parser.destroy().catch(() => {});
    }
  }

  if (filename.endsWith(".docx")) {
    if (data.length < 4 || data[0] !== 0x50 || data[1] !== 0x4b) {
      throw new Error("INVALID_DOCX");
    }
    try {
      const result = await mammoth.extractRawText({ buffer: data });
      return cleanText(result.value ?? "");
    } catch {
      throw new Error("INVALID_DOCX");
    }
  }

  throw new Error("UNSUPPORTED_FILE");
}
