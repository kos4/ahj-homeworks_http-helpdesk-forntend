/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(container) {
    this.container = container;
  }

  renderItem(data) {
    const list = this.container.querySelector('.tickets__list');
    list.insertAdjacentHTML('beforeend', TicketView.item(data));
  }

  render(data = null) {
    this.container.appendChild(TicketView.btn());
    this.container.appendChild(TicketView.list(data));
  }

  static btn() {
    const element = document.createElement('div');
    element.classList.add('tickets__btn-add');
    element.innerText = 'Добавить тикет';

    return element;
  }

  static list(data = null) {
    const list = document.createElement('div');
    list.classList.add('tickets__list');

    if (data) {
      data.forEach((item) => {
        list.insertAdjacentHTML('beforeend', TicketView.item(item));
      });
    }

    return list;
  }

  static item(data) {
    const date = new Date(data.created);
    return `
      <div class="tickets__item" data-id="${data.id}">
        <div class="tickets__item-preview">
          <div class="tickets__item-status${data.status ? ' tickets__item-status-complete' : ''}"></div>
          <div class="tickets__item-text">
            <div class="tickets__item-title">
              ${data.name}
            </div>
            <div class="tickets__item-description"></div>
          </div>
          <div class="tickets__item-datetime">
            ${date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })}
          </div>
          <div class="tickets__item-buttons">
            <div class="tickets__btn-edit tickets__btn "></div>
            <div class="tickets__btn-remove tickets__btn"></div>
          </div>
        </div>
      </div>
    `;
  }
}
