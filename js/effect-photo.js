const imgUpLoadPreviewElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = sliderContainerElement.querySelector('.effect-level__value');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');

const effects = {
  'none': {
    filter: 'none',
    measure: '',
    options: {
      range: {
        min: 1,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower'
    }
  },

  'chrome': {
    filter: 'grayscale',
    measure: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower'
    }
  },

  'sepia': {
    filter: 'sepia',
    measure: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower'
    }
  },

  'marvin': {
    filter: 'invert',
    measure: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower'
    }
  },

  'phobos': {
    filter: 'blur',
    measure: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower'
    }
  },

  'heat': {
    filter: 'brightness',
    measure: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower'
    }
  }
};

let effect = effects.none;

const applyEffectClass = (effectName) => {
  const effectNames = Object.keys(effects);
  const effectClasses = effectNames.map((className) => `effects__preview--${className}`);

  imgUpLoadPreviewElement.classList.remove(...effectClasses);
  imgUpLoadPreviewElement.classList.add(`effects__preview--${effectName}`);
};

const loadEffect = (effectName) => {
  effect = effects[effectName];

  sliderElement.noUiSlider.updateOptions(effect.options);

  applyEffectClass(effectName);
};

const onEffectValueUpdate = () => {
  if (effect.filter === 'none') {
    sliderContainerElement.classList.add('hidden');

    imgUpLoadPreviewElement.style.filter = '';
  } else {
    sliderContainerElement.classList.remove('hidden');

    effectLevelValueElement.value = sliderElement.noUiSlider.get();
    imgUpLoadPreviewElement.style.filter = `${effect.filter}(${effectLevelValueElement.value}${effect.measure})`;
  }
};

const onTargetEffectChange = (evt) => {
  loadEffect(evt.target.value);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 1,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  loadEffect('none');

  sliderElement.noUiSlider.on('update', onEffectValueUpdate);
  effectsListElement.addEventListener('change', onTargetEffectChange);
};

const destroySlider = () => {
  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.destroy();

  effectsListElement.removeEventListener('change', onTargetEffectChange);
};

export {createSlider, destroySlider};
