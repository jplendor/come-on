/* eslint-disable import/prefer-default-export */
const objectUrlToFile = async (image: string): Promise<Blob> => {
  const file = await fetch(image || "").then((r) => r.blob())
  return file
}

export { objectUrlToFile }
