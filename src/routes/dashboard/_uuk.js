const Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore/uuk.db', autoload: true });

const _uuk = {
  generate: function (username) {
    // Генерируем uuk ключ и отправляем его в бд и пользователю
    const uuk = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Добовляем 7 дней к времени...
    let unix = new Date().getTime()
    unix = unix + 604800;
    
    // Добавляем в базу данных
    db.insert({
      type: "\\UUKKey",
      id: uuk,
      user: {
        key: username
      },
      expire: unix
    })

    return uuk;
  },
  log: function (data) {
    // Просто добавляем данные в бд
    db.insert(data);
  },
  find: function (uuk) {
    // Ищем
    return new Promise((resolve, reject) => {
      db.findOne({ type: "\\UUKKey", id: uuk }, (error, document) => {
        if (document) {
          resolve(document);
        } else {
          resolve(null);
        }
      })
    })
  }
};

export default _uuk;