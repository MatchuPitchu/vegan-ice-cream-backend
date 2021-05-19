import nodemailer from 'nodemailer';

export const sendConfirmationEmail = ({toUser, user_id}) => {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
        clientID: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    })

    const message = {
      from: process.env.GOOGLE_USER,
      to: toUser.email,
      subject: 'EisMitStil App - Account aktivieren',
      html: `
        <h3>Hello ${toUser.name},</h3>
        <p>herzlich Willkommen in der Community rund um vegane Eisläden.</p>
        <p>Bitte klicke auf den Link, um deine Mailadresse zu bestätigen und deinen Account zu aktivieren: 
          <a target="_" href="${process.env.DOMAIN_API}/auth/activate/user/${user_id}"Aktivierungslink</a>
        </p>
        <p>Genieße dein Eis!</p>
      `
    }

    transporter.sendMail(message, function(err, info) {
      if(err) {
        rej(err) 
      } else res(info);
    })

  })
}