
async function sendEmail(){
    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'info.chanblock@gmail.com',
          pass: 'iwhagjedpdpxfnct'
        }
    });
    var mail = {
        from: "info.chanblock@gmail.com",
        to: "3wtfinance@gmail.com",
        subject: "Gas transactions",
        text: "Transactions with gas high.Note: Some of the urls in the file may not be signed in the last block ",
        attachments: [
            {
              filename: 'pendingTnxs.json',
              path:fileName = path.join(__dirname, 'pendingTnxs.json')
            }
          ]
    };
    
   sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully: "
                + info.response);
        }
    });
}