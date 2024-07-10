/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  static async list(callback) {
    const response = await fetch('http://localhost:7070/?method=allTickets');

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async get(id, callback) {
    const response = await fetch(`http://localhost:7070/?method=ticketById&id=${id}`);

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async create(data, callback) {
    const response = await fetch('http://localhost:7070/?method=createTicket', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data)),
    });

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async update(id, data, callback) {
    let list = data;

    if (list instanceof FormData) {
      list = Object.fromEntries(list);
    }
    const response = await fetch(`http://localhost:7070/?method=updateById&id=${id}`, {
      method: 'POST',
      body: JSON.stringify(list),
    });

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async delete(id, callback) {
    const response = await fetch(`http://localhost:7070/?method=deleteById&id=${id}`);

    if (response.ok) {
      try {
        callback();
      } catch (e) {
        console.error(e);
      }
    }
  }
}
