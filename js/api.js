const getData = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onError('Ошибка загрузки данных. Попробуйте обновить страницу');
    });
};

const sendData = async(onSuccess, onError, body) => {
  fetch('https://26.javascript.pages.academy/kekstagra',
    {
      method: 'POST',
      body
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
      return;
    }
    onError();
  })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
