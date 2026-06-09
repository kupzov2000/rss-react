import {
  convertImageToBase64,
  getFileFromInput,
  isAllowedImageSize,
  isAllowedImageType,
  MAX_IMAGE_SIZE_BYTES,
} from '@/shared/lib/image/image';
import { describe, expect, it } from 'vitest';

describe('image helpers', () => {
  it('checks allowed image type', () => {
    const pngFile = new File(['content'], 'avatar.png', {
      type: 'image/png',
    });

    const jpegFile = new File(['content'], 'avatar.jpg', {
      type: 'image/jpeg',
    });

    const textFile = new File(['content'], 'avatar.txt', {
      type: 'text/plain',
    });

    expect(isAllowedImageType(pngFile)).toBe(true);
    expect(isAllowedImageType(jpegFile)).toBe(true);
    expect(isAllowedImageType(textFile)).toBe(false);
  });

  it('checks allowed image size', () => {
    const validFile = new File(['content'], 'avatar.png', {
      type: 'image/png',
    });

    const oversizedFile = new File(
      [new Uint8Array(MAX_IMAGE_SIZE_BYTES + 1)],
      'large.png',
      {
        type: 'image/png',
      }
    );

    expect(isAllowedImageSize(validFile)).toBe(true);
    expect(isAllowedImageSize(oversizedFile)).toBe(false);
  });

  it('gets first file from FileList', () => {
    const file = new File(['content'], 'avatar.png', {
      type: 'image/png',
    });

    const input = document.createElement('input');
    input.type = 'file';

    Object.defineProperty(input, 'files', {
      value: {
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
        0: file,
      },
    });

    expect(getFileFromInput(input.files)).toBe(file);
  });

  it('returns null when FileList is null', () => {
    expect(getFileFromInput(null)).toBeNull();
  });

  it('converts image to base64', async () => {
    const file = new File(['content'], 'avatar.png', {
      type: 'image/png',
    });

    const result = await convertImageToBase64(file);

    expect(result).toMatch(/^data:image\/png;base64,/);
  });
});
