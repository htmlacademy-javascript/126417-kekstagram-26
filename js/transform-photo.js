const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const DEFAULT_SCALE = 100;

const imgUpLoadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUpLoadScaleElement.querySelector('.scale__control--value');
const scaleControlSmallerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--bigger');
const imgUpLoadPreviewElement = document.querySelector('.img-upload__preview img');//дефолтное изображение

scaleControlSmallerBtnElement.addEventListener('click', () => {
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  scaleValue -= STEP_SCALE;
  if (scaleValue >= MIN_SCALE && scaleValue <= MAX_SCALE) {
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue}/100)`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
});

scaleControlBiggerBtnElement.addEventListener('click', () => {
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  scaleValue += STEP_SCALE;
  if (scaleValue >= MIN_SCALE && scaleValue <= MAX_SCALE) {
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue}/100)`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
});
scaleControlValueElement.value = `${DEFAULT_SCALE}%`;
