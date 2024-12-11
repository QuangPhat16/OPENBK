require('dotenv').config();
const jwt = require('jsonwebtoken')


//verify JWT// middleware for veryfing JWT
const verifyJWT = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const cookies = req.cookies;

   console.log("VerifyJWT")
   // Check for access token in the Authorization Header
   if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET,
         (err, decoded) => {
            if (err) {//invalid access token
               if (!cookies.jwt) {return res.status(401).json({ message: 'Unauthorized, please log in' });} //No refresh token also

               // Verify refresh token if access token is invalid
               const refreshToken = cookies.jwt;
               jwt.verify(
                  refreshToken,
                  process.env.REFRESH_TOKEN_SECRET,
                  (err, decoded) => {
                     if (err) return res.status(401).json({ message: 'Invalid or expired token, please log in again' });

                     // Refresh token is valid, issue a new access token
                     const newAccessToken = jwt.sign(
                        {
                           name: decoded.name,
                           id: decoded.id,
                           role: decoded.role
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '300s' }
                     );

                     return res.json({ accessToken: newAccessToken });
                  }
               );
            } else {
               // Access token is valid
               req.user = {
                  name: decoded.name,
                  id: decoded.id,
                  role: decoded.role
               };
               next(); // Proceed to the next middleware or route
            }
         }
      );
   } else {
      // No access token; check for refresh token
      if (!cookies.jwt) return res.status(401).json({ message: 'Unauthorized, please log in' });

      const refreshToken = cookies.jwt;
      jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Invalid or expired token, please log in again' });
            
            const newAccessToken = jwt.sign(
               {
                  name: decoded.name,
                  id: decoded.id,
                  role: decoded.role
               },
               process.env.ACCESS_TOKEN_SECRET,
               { expiresIn: '300s' }
            );

            return res.json({ accessToken: newAccessToken });
         }
      );
   }
};


module.exports = verifyJWT