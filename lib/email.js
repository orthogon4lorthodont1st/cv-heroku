const sg = require('sendgrid').SendGrid("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"); // my API KEY

const request = sg.emptyRequest();

class Email {

    static sendEmail(obj){
        return new Promise(
            (resolve, reject) => {
                request.body = {
                    "from": {
                        "email": obj.email,
                        "name": `${obj.firstName} ${obj.lastName}`
                    },
                    "subject": "A new website contact request",
                    "content": [
                        {
                            "type": "text/html",
                            "value": `
                            <html>
                            <p>
                                ${obj.firstName} ${obj.lastName} has sent you an email
                            </p>
                            <p>
                                ${obj.message}
                            </p>
                            </html>`
                        }
                    ],
                    "personalizations": [
                        {
                            "to": [
                                {
                                    "email": "rshahsawary1@hotmail.com"
                                }
                            ]
                        }
                    ]
                };

                request.method = 'POST';
                request.path = '/v3/mail/send';

                sg.API(request, function (response) {
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response.headers);
                    if (response.statusCode === 200){
                        resolve();
                    } else {
                        reject("An error has occurred");
                    }
                });
            }
        )
    }
}
module.exports = Email;