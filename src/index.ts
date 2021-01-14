import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API || '');

app.post('/send-mail', (req: Request, res: Response) => {
  const message = {
    to: req.body.to,
    from: 'mstanciu552@gmail.com',
    subject: req.body.subject,
    text: req.body.text,
    html: '<strong>sent from Sendgrid</strong>',
  };
  console.log(req.body);
  sgMail
    .send(message)
    .then(result => res.json({ result }))
    .catch(err => res.json({ message: err.toString() }));
});

app.listen(process.env.PORT || 3030, () =>
  console.log(`Server listening on port ${process.env.PORT || 3030}`)
);
