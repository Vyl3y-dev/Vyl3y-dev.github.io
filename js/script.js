document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const appID = icon.getAttribute('data-app');
    document.getElementById(appID).style.display = 'block';
  });
});

document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.app-window').style.display = 'none';
  });
});
