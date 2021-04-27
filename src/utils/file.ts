import fs from 'fs';

const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (err) {
    return;
  }

  fs.promises.unlink(filename);
};

export { deleteFile };
