import assert from "node:assert/strict";
import test from "node:test";

import { extractResumeText } from "../lib/document-parser.js";

function createMockFile(name, size, bytes = []) {
  const buffer = Buffer.from(bytes);
  return {
    name,
    size,
    arrayBuffer: async () => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
  };
}

test("geçersiz veya boş dosya nesnesinde UNSUPPORTED_FILE hatası verir", async () => {
  await assert.rejects(async () => {
    await extractResumeText(null);
  }, { message: "UNSUPPORTED_FILE" });

  await assert.rejects(async () => {
    await extractResumeText({});
  }, { message: "UNSUPPORTED_FILE" });
});

test("0-byte dosyada FILE_SIZE hatası verir", async () => {
  const file = createMockFile("cv.pdf", 0, []);
  await assert.rejects(async () => {
    await extractResumeText(file);
  }, { message: "FILE_SIZE" });
});

test("10 MB sınırını aşan dosyada FILE_SIZE hatası verir", async () => {
  const file = createMockFile("cv.pdf", 11 * 1024 * 1024, []);
  await assert.rejects(async () => {
    await extractResumeText(file);
  }, { message: "FILE_SIZE" });
});

test("desteklenmeyen dosya uzantısında UNSUPPORTED_FILE hatası verir", async () => {
  const file = createMockFile("ozgecmis.txt", 100, [65, 66, 67]);
  await assert.rejects(async () => {
    await extractResumeText(file);
  }, { message: "UNSUPPORTED_FILE" });
});

test("sahte PDF dosyasını tespit edip INVALID_PDF hatası verir", async () => {
  // Uzantısı .pdf ama içeriği %PDF- ile başlamıyor
  const file = createMockFile("cv.pdf", 120, [1, 2, 3, 4, 5, 6]);
  await assert.rejects(async () => {
    await extractResumeText(file);
  }, { message: "INVALID_PDF" });
});

test("sahte DOCX dosyasını tespit edip INVALID_DOCX hatası verir", async () => {
  // Uzantısı .docx ama içeriği PK (0x50, 0x4B) ile başlamıyor
  const file = createMockFile("cv.docx", 120, [1, 2, 3, 4, 5, 6]);
  await assert.rejects(async () => {
    await extractResumeText(file);
  }, { message: "INVALID_DOCX" });
});
