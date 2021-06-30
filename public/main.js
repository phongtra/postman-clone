document.getElementById('request-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const method = document.getElementById('request-method').value;
  const url = document.getElementById('request-url').value;

  const params = {};
  for (let [keyInput, valueInput] of [
    ...document.querySelectorAll('.key-value')
  ].map((node) => node.children)) {
    if (keyInput.value && valueInput.value)
      params[keyInput.value] = valueInput.value;
  }

  axios({
    method,
    url,
    params
  })
    .then((res) => {
      console.log(res);
      document.getElementById('response-status').textContent = res.status;
      document.getElementById('response-content-type').textContent =
        res.headers['content-type'];
      document.getElementById('response-body').textContent = JSON.stringify(
        res.data,
        null,
        2
      );
    })
    .catch((error) => {
      document.getElementById('response-status').textContent =
        error.response.status;
      document.getElementById('response-content-type').textContent =
        error.response.headers['content-type'];
      document.getElementById('response-body').textContent = JSON.stringify(
        error.response.data,
        null,
        2
      );
    });
});

document.getElementById('params-button').addEventListener('click', () => {
  document.getElementById('params-form').style.display = 'block';
  document.getElementById('headers-form').style.display = 'none';
  document.getElementById('body-form').style.display = 'none';
});
document.getElementById('headers-button').addEventListener('click', () => {
  document.getElementById('headers-form').style.display = 'block';
  document.getElementById('params-form').style.display = 'none';
  document.getElementById('body-form').style.display = 'none';
});
document.getElementById('body-button').addEventListener('click', () => {
  document.getElementById('body-form').style.display = 'block';
  document.getElementById('headers-form').style.display = 'none';
  document.getElementById('params-form').style.display = 'none';
});
document.getElementById('params-add-button').addEventListener('click', () => {
  const newKeyValue = document
    .querySelector('.key-value:last-child')
    .cloneNode(true);
  const childNodes = newKeyValue.childNodes;
  for (let node of childNodes) {
    node.value = '';
  }
  document.getElementById('params-container').appendChild(newKeyValue);
});
