const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://auth.org.goinfra.info/application/o/lakhtistefr/jwks/` 
  }),

  // Validate the audience and the issuer.
  audience: 'rhmdrPWmhU6JWw2eH9hO2RPErguJ7Y9gZp1fRJ5b', 
  issuer: `https://auth.org.goinfra.info/application/o/lakhtistefr/`, // Remplacez par l'URL de votre émetteur
  algorithms: ['RS256']
});

module.exports = checkJwt;