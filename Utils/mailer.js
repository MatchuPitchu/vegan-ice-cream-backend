import nodemailer from 'nodemailer'

const EMAIL_SUBJECT_BASE = 'Vegan Ice Cream App | Eis mit Stil:'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
  ...(process.env.NODE_ENV === 'development' && {
    tls: { rejectUnauthorized: false },
  }),
})

export const sendConfirmationEmail = async ({ toUser, user_id }) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: `${EMAIL_SUBJECT_BASE} Account aktivieren`,
    html: `
      <div style="font-family: Calibri, sans-serif; padding-top: 20px">
        <div style="max-width: 660px; text-align: center; margin: 0 auto">
          <div>
            <img style="margin: 0 auto" src="https://rovwyr.stripocdn.email/content/guids/CABINET_9210835e3c737acb4a939c1899d4e512/images/2241621620006081.png" alt style="display: block;" width="150"></a>
          </div>
          <h2>Willkommen bei Eis mit Stil, ${toUser.name}!</h2>
          <div style="padding: 10px 40px">Noch ein Schritt fehlt in die Community rund um vegane Eisläden.</div>
          <div style="padding: 10px 40px">Bitte klicke auf den Link, um deine Mailadresse zu bestätigen und deinen Account zu aktivieren.</div>
          <span style="padding: 5px 10px; background: #f9ce64; border: 1px solid #233033; border-radius: 10px; display: inline-block;">
            <a target="_" href="${process.env.DOMAIN_API}/auth/activate/user/${user_id}" style="text-decoration: none; color: #233033">
              Aktivierung des Accounts
            </a>
          </span>
          <div style="margin: 30px 0 10px 0; border-bottom: 1px solid #233033; height: 1px" ></div>
          <div style="display: flex; align-items: center;">
            <h3 style="margin-left: 40px;">Genieße dein Eis!</h3>
            <div style="display: flex; justify-content: space-arround; margin-left: auto; margin-right: 40px;">
              <div style="margin-right: 30px">
                <a target="_blank" href="https://www.youtube.com/watch?v=yX4nKrUdzc4">
                  <img title="Youtube" src="https://rovwyr.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png" alt="Yt" width="32">
                </a>
              </div>
              <div style="margin-right: 30px">
                <a target="_blank" href="https://eis-mit-stil.netlify.app/ios">
                  <img title="AppStore" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/apple-store-logo-colored-bordered.png" alt="AppStore" width="32">
                </a>
              </div>
              <div>
                <a target="_blank" href="https://play.google.com/store/apps/details?id=eismitstil.app">
                  <img title="Google Play" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/playmarket-logo-colored-bordered.png" alt="Google Play" width="32">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(message)
}

export const sendResetPasswordEmail = async ({ toUser, resetToken }) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: `${EMAIL_SUBJECT_BASE} Passwort zurücksetzen`,
    html: `
      <div style="font-family: Calibri, sans-serif; padding-top: 20px">
        <div style="max-width: 660px; text-align: center; margin: 0 auto">
          <div>
            <img style="margin: 0 auto" src="https://rovwyr.stripocdn.email/content/guids/CABINET_9210835e3c737acb4a939c1899d4e512/images/2241621620006081.png" alt style="display: block;" width="150"></a>
          </div>
          <h2>Du möchtest dein Passwort bei Eis mit Stil zurücksetzen?</h2>
          <div style="padding: 10px 40px">Wenn du tatsächlich dein Passwort vergessen hast, dann klicke auf den Link und erstelle dir ein neues Passwort.</div>
          <span style="padding: 5px 10px; background: #f9ce64; border: 1px solid #233033; border-radius: 10px; display: inline-block;">
            <a target="_" href="${process.env.DOMAIN_API}/auth/reset-password/user/${resetToken}" style="text-decoration: none; color: #233033">
              Passwort zurücksetzen
            </a>
          </span>
          <div style="margin: 30px 0 10px 0; border-bottom: 1px solid #233033; height: 1px" ></div>
          <div style="display: flex; align-items: center;">
            <h3 style="margin-left: 40px;">Genieße dein Eis!</h3>
            <div style="display: flex; justify-content: space-arround; margin-left: auto; margin-right: 40px;">
              <div style="margin-right: 30px">
                <a target="_blank" href="https://www.youtube.com/watch?v=yX4nKrUdzc4">
                  <img title="Youtube" src="https://rovwyr.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png" alt="Yt" width="32">
                </a>
              </div>
              <div style="margin-right: 30px">
                <a target="_blank" href="https://eis-mit-stil.netlify.app/ios">
                  <img title="AppStore" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/apple-store-logo-colored-bordered.png" alt="AppStore" width="32">
                </a>
              </div>
              <div>
                <a target="_blank" href="https://play.google.com/store/apps/details?id=eismitstil.app">
                  <img title="Google Play" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/playmarket-logo-colored-bordered.png" alt="Google Play" width="32">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(message)
}

export const sendConfirmNewMail = async ({ toUser, user_id }) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: `${EMAIL_SUBJECT_BASE} Neue Mailadresse bestätigen`,
    html: `
      <div style="font-family: Calibri, sans-serif; padding-top: 20px">
        <div style="max-width: 660px; text-align: center; margin: 0 auto">
          <div>
            <img style="margin: 0 auto" src="https://rovwyr.stripocdn.email/content/guids/CABINET_9210835e3c737acb4a939c1899d4e512/images/2241621620006081.png" alt style="display: block;" width="150"></a>
          </div>
          <h2>Wechsel der Mailadresse</h2>
          <div style="padding: 10px 40px">Bitte klicke auf den Link, um deine neue Mailadresse zu bestätigen.</div>
          <span style="padding: 5px 10px; background: #f9ce64; border: 1px solid #233033; border-radius: 10px; display: inline-block;">
            <a target="_" href="${process.env.DOMAIN_API}/auth/activate/user/${user_id}" style="text-decoration: none; color: #233033">
              Aktivierung des Accounts
            </a>
          </span>
          <div style="margin: 30px 0 10px 0; border-bottom: 1px solid #233033; height: 1px" ></div>
          <div style="display: flex; align-items: center;">
            <h3 style="margin-left: 40px;">Genieße dein Eis!</h3>
            <div style="display: flex; justify-content: space-arround; margin-left: auto; margin-right: 40px;">
              <div style="margin-right: 30px">
                <a target="_blank" href="https://www.youtube.com/watch?v=yX4nKrUdzc4">
                  <img title="Youtube" src="https://rovwyr.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png" alt="Yt" width="32">
                </a>
              </div>
              <div style="margin-right: 30px">
                <a target="_blank" href="https://eis-mit-stil.netlify.app/ios">
                  <img title="AppStore" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/apple-store-logo-colored-bordered.png" alt="AppStore" width="32">
                </a>
              </div>
              <div>
                <a target="_blank" href="https://play.google.com/store/apps/details?id=eismitstil.app">
                  <img title="Google Play" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/playmarket-logo-colored-bordered.png" alt="Google Play" width="32">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(message)
}
