const imgUpLoadPreviewElement = document.querySelector('.img-upload__preview img');//дефолтное изображение
const imgUpLoadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = imgUpLoadEffectLevelElement.querySelector('.effect-level__value');
const sliderElement = imgUpLoadEffectLevelElement.querySelector('.effect-level__slider');//слайдер
const noEffectElement = document.querySelector('#effect-none');
const cromeEffectElement = document.querySelector('#effect-chrome');
const sepiaEffectElement = document.querySelector('#effect-sepia');
const marvinEffectElement = document.querySelector('#effect-marvin');
const phobosEffectElement = document.querySelector('#effect-phobos');
const heatEffectElement = document.querySelector('#effect-heat');

const effects = {
  'effect-none': {
    effectName: 'none',
    measure: '',
    range: {
      min: 1,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower'
  },

  'effect-chrome': {
    effectName: 'grayscale',
    measure: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower'

  },

  'effect-sepia': {
    effectName: 'sepia',
    measure: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower'

  },

  'effect-marvin': {
    effectName: 'invert',
    measure: '%',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower'
  },

  'effect-phobos': {
    effectName: 'blur',
    measure: 'px',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower'
  },

  'effect-heat': {
    effectName: 'brightness',
    measure: '',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower'
  }
};


const effect = effects['effect-heat'];

noUiSlider.create(sliderElement, effect);

sliderElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = sliderElement.noUiSlider.get();
  imgUpLoadPreviewElement.style.filter = `${effect.effectName}(${effectLevelValueElement.value})`;
});



//функцию получения ключей
//сопоставить id с
// const applyEffectPhoto = (evt) => {
//   const effectElement = evt.target;
//   if (effectElement.id ===  )
// };
