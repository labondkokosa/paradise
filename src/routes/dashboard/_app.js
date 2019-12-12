const url = "https://wdatas.glitch.me/app";
const token = "vWg9sHwF0ZgfDBC";

const fetch = require('node-fetch');

const _app = {
  get: {
    // Берём всех игроков сервера из базы данных...
    // Аргумент ID нужен для того, что бы взять определённого человека.
    users: (id) => {

      return new Promise((resolve, reject) => {
        fetch(`${url}/${token}/data/${JSON.stringify({ 
          $$storage: "paradise_users",
          type: "Civilian" 
        })}`)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
      })
    },
    // Берём все паспорта...
    passports: (id) => {
      
      return new Promise((resolve, reject) => {
        fetch(`${url}/${token}/data/${JSON.stringify({
          $$storage: "paradise_passports",
          type: "Passport" 
        })}`)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
      })
    },
    // Берём все преступления
    crimes: (id) => {
      
      return new Promise((resolve, reject) => {
        fetch(`${url}/${token}/data/${JSON.stringify({
          $$storage: "paradise_crimes",
          type: "Crime"
        })}`)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
      })
    }
  },
  add: {
    // Добавляем нового жителя...
    user: (name, discord) => {

    },
    // Добавляем новое преступление..
    crime: (user, title, description) => {

    },
    // Добавляем новый паспорт
    passport: (user, data) => {

    }
  }
}

export default _app;