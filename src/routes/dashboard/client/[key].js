import users from "../_users.js"
import _uuk from "../_uuk.js";
const sha256 = require('js-sha256');

const lookup = new Map();
users.forEach(user => {
	lookup.set(user.id, JSON.stringify(user));
});

export async function post(req, res) {
  const username = req.params.key;

  const { password, type } = req.body;

  // Проверяем, существует ли такой пользователь вообще
  if (lookup.has(username)) {
    // Проверям пароль...
    const user = JSON.parse(lookup.get(username));

    if (sha256(password) == user.password) {
      if (type == "login") {
        _uuk.log({
            type: "\\LoginLog",
            user: {
              key: username
            },
            data: req.headers
        });
      }

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      // Генерируем новый UUK
      const uuk = _uuk.generate(username);

      res.end(JSON.stringify({ uuk: uuk, key: username, name: user.name, permissions: user.permissions }))
    } else {
      res.writeHead(400, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify({ error: "\\Password" }))
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ error: "\\NotFound" }));
  }
}

export async function get(req, res) {
  const username = req.params.key;

  if (lookup.has(username)) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    const user = JSON.parse(lookup.get(username));
    res.end(JSON.stringify({ key: user.id, username: user.name, avatar: user.avatar, permissions: user.permissions }))

  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ error: "\\NotFound" }));
  }
}