import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const img1 = PNG.sync.read(fs.readFileSync('img1.png'));
const img2 = PNG.sync.read(fs.readFileSync('img2.png'));
const { width, height } = img1;
const diff = new PNG({ width, height });


function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day =`${date.getDate()}`.padStart(2, '0');
  return `${day}${month}${year}`
}

pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.50 });
fs.writeFileSync(`diff_${getDateString()}.png`, PNG.sync.write(diff));

