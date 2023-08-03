const buttonRight = document.getElementById("buttonRight");

buttonRight.addEventListener('click', function() {
  const Dkey = new KeyboardEvent('keydown', { key: 'd' });
  window.dispatchEvent(Dkey);
});