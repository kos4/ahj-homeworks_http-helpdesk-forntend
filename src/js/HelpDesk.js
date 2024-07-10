import TicketService from './TicketService';
// import crypto from "crypto";
import TicketView from './TicketView';
import Loading from './components/loading/Loading';
import Popup from './components/popup/Popup';
import TicketForm from './TicketForm';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.view = new TicketView(container);
    this.loading = new Loading();
    this.popup = new Popup();

    this.clickList = this.clickList.bind(this);
    this.clickBtnAdd = this.clickBtnAdd.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderTicket = this.renderTicket.bind(this);
  }

  init() {
    this.loading.init();
    TicketService.list(this.view.render.bind(this.view)).then(() => {
      const list = document.querySelector('.tickets__list');
      const btnAdd = document.querySelector('.tickets__btn-add');

      list.addEventListener('click', this.clickList);
      btnAdd.addEventListener('click', this.clickBtnAdd);

      this.loading.remove();
    });
  }

  renderTicket(data) {
    this.view.renderItem(data);
    this.loading.remove();
  }

  submitForm(form, data, e) {
    e.preventDefault();
    this.loading.init();
    Popup.remove();

    const formData = new FormData(form);

    switch (form.getAttribute('name')) {
      case 'create':
        TicketService.create(formData, this.renderTicket);
        break;
      case 'delete':
        TicketService.delete(data.id, this.removeTicket.bind(this, data.item));
        break;
      case 'edit':
        TicketService.update(
          data.data.id,
          formData,
          this.editTicket.bind(this, data.item, data.data.id),
        );
        break;
      default:
    }
  }

  clickBtnAdd() {
    this.renderForm('Добавить тикет', TicketForm.markup());
  }

  clickTitle(id, description) {
    const descr = description;
    if (descr.classList.contains('tickets__item-description-show')) {
      descr.classList.remove('tickets__item-description-show');
      descr.innerText = '';
    } else {
      this.loading.init();
      TicketService.get(id, this.showDescription.bind(this, description));
    }
  }

  renderForm(title, body, data = null) {
    this.popup.render({
      title,
      body,
    });

    const form = document.querySelector('.form');
    form.addEventListener('submit', this.submitForm.bind(this, form, data));
  }

  clickRemove(id, item) {
    this.renderForm('Удалить тикет', TicketForm.markupDelete(), { id, item });
  }

  removeTicket(item) {
    item.remove();
    this.loading.remove();
  }

  editTicket(item, id, data) {
    const element = data.filter((el) => el.id === id)[0];
    const name = item.querySelector('.tickets__item-title');
    name.innerText = element.name;
    this.loading.remove();
  }

  showEdit(item, data) {
    this.renderForm('Изменить тикет', TicketForm.markup(data), { item, data });
    this.loading.remove();
  }

  clickEdit(id, item) {
    this.loading.init();
    TicketService.get(id, this.showEdit.bind(this, item));
  }

  clickList(e) {
    const item = e.target;
    const itemClassName = item.classList[0];
    const parent = item.closest('.tickets__item');
    const { id } = parent.dataset;

    switch (itemClassName) {
      case 'tickets__item-title': {
        const description = parent.querySelector('.tickets__item-description');
        this.clickTitle(id, description);
        break;
      }
      case 'tickets__item-status':
        this.clickStatus(id, item);
        break;
      case 'tickets__btn-remove':
        this.clickRemove(id, parent);
        break;
      case 'tickets__btn-edit':
        this.clickEdit(id, parent);
        break;
      default:
    }
  }

  showDescription(description, data) {
    const descr = description;
    descr.innerText = data.description;
    descr.classList.add('tickets__item-description-show');
    this.loading.remove();
  }

  clickStatus(id, item) {
    this.loading.init();
    let status = true;

    if (item.classList.contains('tickets__item-status-complete')) {
      status = false;
    }

    TicketService.update(id, { status }, this.toggleStatus.bind(this, item));
  }

  toggleStatus(item) {
    item.classList.toggle('tickets__item-status-complete');
    this.loading.remove();
  }
}
