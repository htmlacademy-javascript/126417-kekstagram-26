import { imgUpLoadPreviewElement } from './scale-photo';

const imgUpLoadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = imgUpLoadEffectLevelElement.querySelector('.effect-level__value');
const sliderElement = imgUpLoadEffectLevelElement.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 1,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


const effects = {
  none: {
    filter: () => 'none',
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

  chrome: {
    filter: (value) => `grayscale(${value})`,
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

  sepia: {
    filter: (value) => `sepia(${value})`,
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

  invert: {
    filter: (value) => `invert(${value})`,
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

  blur: {
    filter: (value) => `blur(${value})`,
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

  brightness: {
    filter: (value) => `brightness(${value})`,
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

const renderPhotoEffect = (object) => {
  imgUpLoadEffectLevelElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions (object.options);
  sliderElement.noUiSlider.on('update', () => {
    effectLevelValueElement.value = sliderElement.noUiSlider.get();
    imgUpLoadPreviewElement.style.filter = object.filter(effectLevelValueElement.value);
  });
};

const onFormChange = () => {
  const checkedFilter = document.querySelector('input[name="effect"]:checked').value;
  imgUpLoadPreviewElement.className = `effects__preview--${checkedFilter}`;
  renderPhotoEffect(effects[checkedFilter]);
  if (checkedFilter === 'none') {
    effectLevelValueElement.classList.add('hidden');
  }
};

export {onFormChange};
