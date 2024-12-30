export async function convertFileToBuffer(
  file: File | null
): Promise<Buffer | any> {
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
