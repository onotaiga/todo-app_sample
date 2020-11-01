'use strict'
const http = require('http');
const server = http.createServer((req, res) => {

    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    switch (req.method) {
        case 'GET':
            if (req.url === '/') {

                const fs = require('fs');
                const rs = fs.createReadStream('./sample.html');
                rs.pipe(res);
            }
            break;
        case 'POST':
            let rawData = '';
            req.on('data', (chunk) => {
                rawData = rawData + chunk;
            }).on('end', () => {
                const decoded = decodeURIComponent(rawData);
                console.info('[' + now + '] 投稿: ' + decoded);
                // res.write('<!DOCTYPE html><html lang="ja"><body><h1>' + decoded + 'が投稿されました</h1></body></html>');
                // res.end();
                const fs = require('fs')
                const rs = fs.createReadStream('./form.html')
                rs.pipe(res);
            });
            break;
        case 'DELETE':
            res.write('DELETE' + req.url);
            console.info('delete 実行')
            break;
        default:
            break;
    }

}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});

const port = 8000;
server.listen(port, () => {
    console.log(`ポート ${port} 番に接続`);
});