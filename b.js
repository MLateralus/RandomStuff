var fs = require('fs');

const images = [];
let size = 0;
for (let i = 0; i < 6; i++) {
	images.push(fs.readFileSync(`symbol.part_${i}.jpg`));
	size += images[i].length;
}

let newImage;

for (let i of [1, 2]) {
	const len = images[3].length + images[0].length + images[4].length + images[5].length + images[i].length;
	newImage = Buffer.concat([images[3], images[0], images[4], images[5], images[2], images[1]], size);
	fs.writeFileSync(`${i}.jpg`, newImage);
}
