const fs = require('fs');
const content = fs.readFileSync('/Users/markmo/Downloads/directions_sample.json');
const json = JSON.parse(content);
const points = [];
const routes = json['routes'];
for (let i = 0; i < routes.length; i++) {
	const legs = routes[i]['legs'];
	for (let j = 0; j < legs.length; j++) {
		let steps = legs[j]['steps'];
		for (let k = 0; k < steps.length; k++) {
			let startLocation = steps[k]['start_location'];
			points.push(startLocation);
		}
	}
}
fs.writeFileSync('/Users/markmo/Downloads/output.json', JSON.stringify(points));