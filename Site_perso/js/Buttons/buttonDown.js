const buttonDown = document.getElementById("buttonDown");

buttonDown.addEventListener('click', function() {
  const Skey = new KeyboardEvent('keydown', { key: 's' });
  window.dispatchEvent(Skey);
});