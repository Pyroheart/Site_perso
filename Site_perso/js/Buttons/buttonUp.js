const buttonUp = document.getElementById("buttonUp");

buttonUp.addEventListener('click', function() {
  const Zkey = new KeyboardEvent('keydown', { key: 'z' });
  window.dispatchEvent(Zkey);
});