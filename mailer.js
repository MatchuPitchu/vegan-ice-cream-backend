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
      subject: 'Eis mit Stil - Account aktivieren',
      html: `
        <div>
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td valign="top">
                  <table style="table-layout: fixed !important; width: 100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td align="center">
                          <table width="700" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                            <tbody>
                              <tr>
                                <td style="padding: 20px 20px 10px 20px" align="left">
                                  <table width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td style="padding-right: 0 !important" width="660" valign="top" align="center">
                                          <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td style="font-size: 0px;" align="center"><a target="_blank"><img class="adapt-img" src="https://rovwyr.stripocdn.email/content/guids/CABINET_9210835e3c737acb4a939c1899d4e512/images/2241621620006081.png" alt style="display: block;" width="150"></a></td>
                                              </tr>
                                              <tr>
                                                <td style="padding-top: 10px" align="center">
                                                  <h2>Willkommen bei Eis mit Stil, ${toUser.name}</h2>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td class="esd-stripe" align="center">
                          <table width="700" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                            <tbody>
                              <tr>
                                <td style="padding: 20px" align="left">
                                  <table width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td width="660" valign="top" align="center">
                                          <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td style="padding: 5px 40px 5px 0px" align="center">
                                                  <p>Noch ein Schritt fehlt in die Community rund um vegane Eisläden.<br><br></p>
                                                  <p>Bitte klicke auf den Link, um deine Mailadresse zu bestätigen und deinen Account zu aktivieren.<br></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style="padding: 10px 0" align="center">
                                                  <span style="padding: 5px; border-style: solid; border-color: #233033; background: #f9ce64; border-width: 1px; display: inline-block; border-radius: 10px; width: auto">
                                                    <a target="_" href="${process.env.DOMAIN_API}/auth/activate/user/${user_id}" style="text-decoration: none !important; color: #233033" target="_blank">
                                                      Aktivierung meines Accounts
                                                    </a>
                                                  </span>
                                                </td>
                                              </tr>
                                            </tbody>
                                         </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="table-layout: fixed !important; width: 100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td align="center">
                          <table style="background-color: #ffffff;" width="700" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                            <tbody>
                              <tr>
                                <td style="padding-right: 20px; padding-left: 20px" align="left">
                                  <table width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td width="660" align="left">
                                          <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td style="padding-top: 10px; padding-bottom: 10px" align="center">
                                                  <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody>
                                                      <tr>
                                                        <td style="border-bottom: 1px solid #233033; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-right: 10px; padding-left: 10px" align="left">
                                  <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                    <tbody>
                                      <tr>
                                        <td style="padding-right: 0 !important; padding-bottom: 20px !important" width="320" align="center">
                                          <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td style="padding-top: 10px; padding-bottom: 10px" align="center">
                                                  <h3>Genieße dein Eis!</h3>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table style="float: right" cellspacing="0" cellpadding="0" align="right">
                                    <tbody>
                                      <tr>
                                        <td width="320" align="center">
                                          <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td style="padding-top: 10px, padding-bottom: 10px" align="center">
                                                  <table style="width: auto !important; display: inline-block !important" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr>
                                                        <td style="padding-right: 30px" valign="top" align="center">
                                                          <a target="_blank" href="https://www.youtube.com/watch?v=yX4nKrUdzc4">
                                                            <img title="Youtube" src="https://rovwyr.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png" alt="Yt" width="32">
                                                          </a>
                                                        </td>
                                                        <td style="padding-right: 30px" valign="top" align="center">
                                                          <img title="AppStore" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/apple-store-logo-colored-bordered.png" alt="AppStore" width="32">
                                                        </td>
                                                        <td valign="top" align="center">
                                                          <img title="Google Play" src="https://rovwyr.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/playmarket-logo-colored-bordered.png" alt="Google Play" width="32">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        `
      }
      
      transporter.sendMail(message, function(err, info) {
        if(err) {
          rej(err) 
        } else res(info);
      })
      
    })
  }
  
  
  
  // <p>Herzlich Willkommen, ${toUser.name}!</p>
  // <p>Noch ein Schritt fehlt in die Community rund um vegane Eisläden.<p>
  // <p>Bitte klicke auf den Link, um deine Mailadresse zu bestätigen und deinen Account zu aktivieren: 
  //   <a target="_" href="${process.env.DOMAIN_API}/auth/activate/user/${user_id}">Aktivierungslink</a>
  // </p>
  // <p>Genieße dein Eis!</p>