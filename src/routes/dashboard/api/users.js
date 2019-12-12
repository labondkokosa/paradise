import _app from "../_app.js";

export async function get(req, res) {
  _app.get.users()
  .then((data) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(data));
  })
}