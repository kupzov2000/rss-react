export const WIDTH = 1024;
export const HEIGHT = 1024;

export const MAX_IMAGE_SIZE_BYTES = WIDTH * HEIGHT;

export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

export function isAllowedImageType(file: File) {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

export function isAllowedImageSize(file: File) {
  return file.size <= MAX_IMAGE_SIZE_BYTES;
}

export function getFileFromInput(fileList: FileList | null) {
  const file = fileList?.item(0);

  if (!file || file.size === 0) {
    return null;
  }

  return file;
}

export function convertImageToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
          return;
        }

        reject(new Error('Image conversion failed'));
      },
      { once: true }
    );

    reader.addEventListener(
      'error',
      () => {
        reject(new Error('Image conversion failed'));
      },
      { once: true }
    );

    reader.readAsDataURL(file);
  });
}
