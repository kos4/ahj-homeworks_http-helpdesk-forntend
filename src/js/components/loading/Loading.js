import './css/style.css';

export default class Loading {
  constructor() {
    this.container = document.querySelector('body');
    this.className = 'loading';
  }

  init() {
    if (this.check()) {
      this.remove();
    }

    this.render();
  }

  remove() {
    const items = this.container.querySelectorAll(`.${this.className}`);

    if (items.length) {
      setTimeout(() => {
        items.forEach((item) => {
          item.parentNode.removeChild(item);
        });
      }, 300);
    }
  }

  render() {
    this.container.appendChild(this.markup());
  }

  check() {
    return !!this.container.querySelectorAll(`.${this.className}`).length;
  }

  markup() {
    const element = document.createElement('div');
    element.classList.add(this.className);

    return element;
  }
}
