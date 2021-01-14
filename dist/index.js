"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
mail_1.default.setApiKey(process.env.SENDGRID_API || '');
app.post('/send-mail', (req, res) => {
    const message = {
        to: req.body.to,
        from: 'mstanciu552@gmail.com',
        subject: req.body.subject,
        text: req.body.text,
        html: '<strong>sent from Sendgrid</strong>',
    };
    console.log(req.body);
    mail_1.default
        .send(message)
        .then(result => res.json({ result }))
        .catch(err => res.json({ message: err.toString() }));
});
app.listen(process.env.PORT || 3030, () => console.log(`Server listening on port ${process.env.PORT || 3030}`));
//# sourceMappingURL=index.js.map