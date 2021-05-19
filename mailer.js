import nodemailer from 'nodemailer';

export const sendConfirmationEmail = ({toUser, user_id}) => {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      }
    })

    const message = {
      from: process.env.GOOGLE_USER,
      to: toUser.email,
      subject: 'EisMitStil App - Account aktivieren',
      html: `
        <p>Herzlich Willkommen, ${toUser.name}!</p>
        <p>Noch ein Schritt fehlt in die Community rund um vegane Eisläden.<p>
        <p>Bitte klicke auf den Link, um deine Mailadresse zu bestätigen und deinen Account zu aktivieren: 
          <a target="_" href="${process.env.DOMAIN_API}/auth/activate/user/${user_id}">Aktivierungslink</a>
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