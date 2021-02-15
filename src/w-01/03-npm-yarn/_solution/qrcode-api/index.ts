import * as express from "express"
import * as qrcode from "qrcode"
import * as http from "http"
import "colors"

const app = express();

const port = 8080;
const baseUrl = `http://localhost:${port}`;

function getQRCode(url, callback) {
    http.get(url, res => {
        let body = '';
        res.on("data", chunk => body += chunk);
        res.on("end",() => {
            try {
                if (res.statusCode !== 200) {
                    callback(new Error(`API Error: ${res.statusCode} - ${body}`))
                } else {
                    const response = JSON.parse(body);
                    if (response.error) {
                        callback(new Error(response.error))
                    } else {
                        callback(null, response)
                    }
                }
            } catch (e) {
                callback(e)
            }

        });
    });
}

app.get('/', (req, res) => {
    const text = req.query.text || "Hello";
    const encoded = encodeURIComponent(text);
    getQRCode(`${baseUrl}/api/qr/${encoded}`, (err, response) => {
        if (err) {
            console.error(err);
            res.status(500);
            return res.json({
                error: err.message,
            });
        }
        const instructions = `To get QR code open <a href="${baseUrl}?text=YourText">${baseUrl}?text=YourText</a>`;
        res.send(`<div><h1>QR Code API:</h1><p>${instructions}</p><img src="${response.base64Url}" alt="${response.text}"/></div>`);
    });
});


app.get('/api/qr/:text', (req, res) => {
    const passedText = req.params.text;
    qrcode.toDataURL(passedText, (err, base64Url) => {
        if (err) {
            console.error(err);
            res.status(500);
            return res.json({
                error: err.message,
            });
        }
        res.json({
            base64Url: base64Url,
            text: passedText,
        });
    })
});

app.listen(port, () => {
    console.log(`QR server started at ${baseUrl}`.magenta);
} );
