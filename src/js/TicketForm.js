/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  static markup(data = null) {
    const type = data ? 'edit' : 'create';
    const name = data ? data.name : '';
    const description = data ? data.description : '';
    return `
      <form class="form" name="${type}">
        <div class="form__group">
          <label for="popupFormName" class="form__label">Краткое описание</label>
          <input type="text" class="form__input-text" name="name" id="popupFormName" value="${name}">
        </div>
        <div class="form__group">
          <label for="popupFormDescription" class="form__label">Подробное описание</label>
          <textarea name="description" id="popupFormDescription" class="form__textarea">${description}</textarea>
        </div>
        <div class="form__buttons">
          <button class="form__btn form__btn-close" type="button">Отмена</button>
          <button class="form__btn">Ok</button>
        </div>
      </form>
    `;
  }

  static markupDelete() {
    return `
      <form class="form" name="delete">
        <div class="form__group">
          Вы уверены, что хотите удалить тикет? Это действие необратимо.
        </div>
        <div class="form__buttons">
          <button class="form__btn form__btn-close" type="button">Отмена</button>
          <button class="form__btn">Ok</button>
        </div>
      </form>
    `;
  }
}
