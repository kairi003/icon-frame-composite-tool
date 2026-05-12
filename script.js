/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/** @type {HTMLInputElement} */
const frameInput = document.getElementById('frameInput');
/** @type {HTMLInputElement} */
const iconInput = document.getElementById('iconInput');
/** @type {HTMLInputElement} */
const scaleInput = document.getElementById('scaleInput');
/** @type {HTMLButtonElement} */
const downloadButton = document.getElementById('downloadButton');

let frameBitmap = null;
let iconBitmap = null;
let scale = 1;

const updateCanvas = () => {
  if (frameBitmap) {
    canvas.width = frameBitmap.width;
    canvas.height = frameBitmap.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (iconBitmap) {
      const iconWidth = iconBitmap.width * scale;
      const iconHeight = iconBitmap.height * scale;
      const x = (canvas.width - iconWidth) / 2;
      const y = (canvas.height - iconHeight) / 2;
      ctx.drawImage(iconBitmap, x, y, iconWidth, iconHeight);
    }
    ctx.drawImage(frameBitmap, 0, 0);
  }
}

frameInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    frameBitmap = await createImageBitmap(file);
    iconInput.disabled = false;
    updateCanvas();
  }
});

iconInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    iconBitmap = await createImageBitmap(file);
    scaleInput.disabled = false;
    downloadButton.disabled = false;
    updateCanvas();
  }
});

scaleInput.addEventListener('input', (event) => {
  scale = parseFloat(event.target.value);
  updateCanvas();
});

downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'composite.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
