const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const imgUpLoadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUpLoadScaleElement.querySelector('.scale__control--value');
const scaleControlSmallerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--bigger');
const imgUpLoadPreviewElement = document.querySelector('.img-upload__preview img');


let value = MAX_SCALE;

const setDefaultPhotoScale = () => {
  value = MAX_SCALE;
  imgUpLoadPreviewElement.style.transform = `scale(${value / 100})`;
  scaleControlValueElement.value = `${value}%`;
};

const onIncreaseScalePhotoClick = () => {
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  if (scaleValue > MIN_SCALE) {
    scaleValue -= STEP_SCALE;
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue/100})`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
};

const onDecreaseScalePhotoClick = () => {
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  if (scaleValue < MAX_SCALE ) {
    scaleValue += STEP_SCALE;
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue/100})`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
};

export {scaleControlBiggerBtnElement, scaleControlSmallerBtnElement, setDefaultPhotoScale, onIncreaseScalePhotoClick, onDecreaseScalePhotoClick};
