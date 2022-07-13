const axios = require('axios').default;

class ReCaptcha {
  constructor() {
    this.siteKey = process.env.RECAPTCHA_SITE_KEY;
    this.secretKey = process.env.RECAPTCHA_SECRET_KEY;
  }

  async validate(token) {
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${this.secretKey}&response=${token}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
      }
    );

    return data;
  }
}

module.exports = ReCaptcha;
