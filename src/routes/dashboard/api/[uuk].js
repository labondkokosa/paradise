import _uuk from "../_uuk.js";

export async function get(req, res) {
  const uuk = req.params.uuk;

  // Ищем этот UUK в базе данных и отдаём ответ...
  _uuk.find(uuk).then((data) => {
    if (data) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify({ error: "\\NotFound" }));
    }
  })
}