import './css/style.css';

export default class Popup {
  constructor() {
    this.container = document.querySelector('body');
  }

  render(data) {
    const loading = document.querySelector('.loading');
    const markup = Popup.markup(data);
    Popup.remove();

    if (loading) {
      loading.insertAdjacentHTML('beforebegin', markup);
    } else {
      this.container.insertAdjacentHTML('beforeend', markup);
    }

    const close = document.querySelector('.form__btn-close');
    close.addEventListener('click', Popup.close);
  }

  static close() {
    Popup.remove();
  }

  static remove() {
    const items = document.querySelectorAll('.popup');

    if (items.length) {
      items.forEach((item) => {
        item.parentNode.removeChild(item);
      });
    }
  }

  static markup(data) {
    return `
      <div class="popup">
        <div class="popup__window">
          <div class="popup__title">${data.title}</div>
          <div class="popup__body">${data.body}</div>
        </div>
      </div>
    `;
  }
}
