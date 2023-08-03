const buttonLeft = document.getElementById("buttonLeft");

buttonLeft.addEventListener('click', function() {
  const Qkey = new KeyboardEvent('keydown', { key: 'q' });
  window.dispatchEvent(Qkey);
});