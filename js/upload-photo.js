const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


const imgFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = imgFormElement.querySelector('.img-upload__input');
const imgUploadPreviewElement = imgFormElement.querySelector('.img-upload__preview img');

const uploadNewPhoto = () => {
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreviewElement.src = URL.createObjectURL(file);
  }
};

export {uploadNewPhoto};
