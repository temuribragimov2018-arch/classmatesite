/**
 * ClassMate Landing — scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // APK — прямая ссылка из config.js
  const btnApk = document.getElementById('btn-apk');
  if (btnApk && typeof CONFIG !== 'undefined' && CONFIG.apkUrl) {
    btnApk.href = CONFIG.apkUrl;
    btnApk.setAttribute('download', 'ClassMate-release.apk');
  }

  // EXE пока отключён — кнопка disabled в HTML
  // Когда появится файл, раскомментируй и поставь ссылку в config.js

  // Версия и дата из конфига
  if (typeof CONFIG !== 'undefined') {
    document.querySelectorAll('.version').forEach(el => {
      el.textContent = 'v' + CONFIG.version;
    });
    document.querySelectorAll('.update-date').forEach(el => {
      el.textContent = CONFIG.updateDate;
    });
  }

  // Плавное появление
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-in').forEach(el => {
    observer.observe(el);
  });

  // Анимация только активных кнопок
  document.querySelectorAll('.btn:not(.btn-disabled)').forEach(btn => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.97)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});
