const buttonMiddle = document.getElementById("buttonMiddle");

buttonMiddle.addEventListener('click', function() {
  const ReleasekeyS = new KeyboardEvent('keyup', { key: 's', });
  const ReleasekeyZ = new KeyboardEvent('keyup', { key: 'z', });
  const ReleasekeyQ = new KeyboardEvent('keyup', { key: 'q', });
  const ReleasekeyD = new KeyboardEvent('keyup', { key: 'd', });

    window.dispatchEvent(ReleasekeyS);

    window.dispatchEvent(ReleasekeyZ);

    window.dispatchEvent(ReleasekeyQ);

    window.dispatchEvent(ReleasekeyD);

});