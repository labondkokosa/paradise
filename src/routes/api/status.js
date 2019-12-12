const ping = require('minecraft-server-util');

export async function get(req, res, next) {
  // paradiseroleplay.aternos.me
	ping('joey.aternos.org', 10368, (error, response) => {
    res.writeHead(200, {
			'Content-Type': 'application/json'
    });
		
		// Подготавливаем статус...
		let status = {};

		if (response == null) {
			// Сервер выключен
			status = { online: false };
		} else {
			// console.log(response);
			if (response.version.includes("Offline")) {
				status = { online: false }
			} else {
				status = { online: true, players: response.onlinePlayers }
			}
		}
		res.end(JSON.stringify({
			status
		}));
	});
}