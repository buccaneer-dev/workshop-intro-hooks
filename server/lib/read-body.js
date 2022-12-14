const readBody = (req) =>
    new Promise(resolve => {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
    });

module.exports = readBody;