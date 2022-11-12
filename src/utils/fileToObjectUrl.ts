/* eslint-disable import/prefer-default-export */
const fileToObjectUrl = (file: File): string => {
  const fileUrl = URL.createObjectURL(file)

  return fileUrl
}

export { fileToObjectUrl }
