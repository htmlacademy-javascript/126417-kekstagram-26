const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const imgUpLoadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUpLoadScaleElement.querySelector('.scale__control--value');
const scaleControlSmallerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerBtnElement = imgUpLoadScaleElement.querySelector('.scale__control--bigger');
const imgUpLoadPreviewElement = document.querySelector('.img-upload__preview img');//дефолтное изображение

const onScaleBtnClick = (evt) => {
  const scaleElement = evt.target;
  let scaleValue = Number(scaleControlValueElement.value.replace('%', ''));
  if (scaleElement.classList.contains('scale__control--smaller')) {
    scaleValue -= STEP_SCALE;
  } else if (scaleElement.classList.contains('scale__control--bigger')) {
    scaleValue += STEP_SCALE;
  }
  if (scaleValue >= MIN_SCALE && scaleValue <= MAX_SCALE) {
    imgUpLoadPreviewElement.style.transform = `scale(${scaleValue}/100)`;
    scaleControlValueElement.value = `${String(scaleValue)}%`;
  }
};

const changeScale = () => {
  scaleControlSmallerBtnElement.addEventListener('click', onScaleBtnClick);
  scaleControlBiggerBtnElement.addEventListener('click', onScaleBtnClick);
};


export {changeScale, imgUpLoadPreviewElement};

