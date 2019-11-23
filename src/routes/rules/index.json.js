import rules from './_rules.js';

const contents = JSON.stringify(rules.map(entry => {
	return {
    number: entry.number,
    name: entry.name,
    description: entry.description,
		punishment: entry.punishment,
		category: entry.category
	};
}));

export async function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}