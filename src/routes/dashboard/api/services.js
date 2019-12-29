import services from "../_services.js";

export async function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify({ size: 5, list: services }));
}