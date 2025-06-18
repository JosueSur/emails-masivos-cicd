const ldap = require('ldapjs');

const ldapService = {
  authDN: (usuario, password) => {
    return new Promise((resolve, reject) => {
      const client = ldap.createClient({ url: process.env.LDAP });
      
      client.bind(`${usuario}@pdm.local`, password, (err) => {
        client.unbind();
        if (err) {
          return resolve(false);
          /* reject(err); */
        } else {
          resolve(true);
        }
      });
    });
  }
};

module.exports = ldapService;
