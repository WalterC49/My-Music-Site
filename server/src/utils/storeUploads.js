import { FILETYPES, AVATARS_URL, SONGS_URL } from "../contants/conts.js";
import { extname } from "path";
import { createWriteStream, unlink, unlinkSync } from "fs";

export async function storeFile(file, fileType) {
  const { filename, createReadStream } = await file;

  const fileExtension = extname(filename);
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const storedFileName = `avatar${uniqueSuffix}${fileExtension}`;

  const storedFileUrl = new URL(
    storedFileName,
    fileType === FILETYPES.IMAGE ? AVATARS_URL : SONGS_URL,
  );

  const stream = createReadStream();

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(storedFileUrl);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", error => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", error => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  /* return storedFileUrl.pathname; */
  return storedFileName;
}

export function deleteFile(filePath) {
  try {
    unlinkSync(filePath);
  } catch (error) {
    console.log(error);
  }
}
