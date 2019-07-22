
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
/* const axios = require('axios') */
const moment = require('moment')

const OAuth2 = google.auth.OAuth2;

async function getCron() {
    // type de requete axios a faire
    /* const requete = await axios({
        method: 'GET',
        url: 'http://localhost:8080/site/getAllSite'
    }) 
    const site = requete.data.site*/

    // un exemple de site
    const site = [{
        debut_hebergement: '2019-04-08',
        fin_hebergement: '2019-08-22'
    }][0]

    const now = moment().format('DD-MM-YYYY')
    const fin_hebergement = moment(site.fin_hebergement).subtract(1, 'month').format('DD-MM-YYYY')

    if (now === fin_hebergement) {

        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET, // Client Secret
            'https://developers.google.com/oauthplayground' // Redirect URL
        )
        oauth2Client.setCredentials({
            refresh_token: process.env.TOKEN_REF
        });
        const tokens = await oauth2Client.getRequestHeaders()
        const accessToken = tokens.Authorization.slice(7)
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oauth2',
                user: 'wawan.jb@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.TOKEN_REF,
                accessToken
            }
        });

        const text = 'Votre hébergement prend fin le : ' + fin_hebergement
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Toto 👻" <wawan.jb@gmail.com>', // sender address
            to: process.env.MAIL_TO, // list of receivers
            subject: "Fin d'hébergement", // Subject line
            text, // plain text body
            html: "<b>"+ text +"</b>" // html body
        })
    }
}

module.exports = getCron