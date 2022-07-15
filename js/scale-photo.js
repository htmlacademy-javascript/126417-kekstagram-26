const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const imgUpLoadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUpLoadScaleElement.querySelector('.scale__control--value');
const scaleControlSmallerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--bigger');
const imgUpLoadPreviewElement = document.querySelector('.img-upload__preview img');//дефолтное изображение

const increaseScalePhoto = () => {
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  if (scaleValue > MIN_SCALE) {
    scaleValue -= STEP_SCALE;
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue/100})`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
};

const decreaseScalePhoto = () => {
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  if (scaleValue < MAX_SCALE ) {
    scaleValue += STEP_SCALE;
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue/100})`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
};

export {scaleControlBiggerBtnElement, scaleControlSmallerBtnElement, increaseScalePhoto, decreaseScalePhoto};
