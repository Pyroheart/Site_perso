const buttonEnter = document.getElementById("enterButton");

buttonEnter.addEventListener('click', function() {
  const Ekey = new KeyboardEvent('keydown', { key: 'e' });
  window.dispatchEvent(Ekey);
});