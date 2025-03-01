// // import jwt from 'jsonwebtoken';

// // export const createToken = (
// //   jwtPayload: { email: string; role: string },
// //   secret: string,
// //   expiresIn: string,
// // ) => {
// //   jwt.sign(jwtPayload, secret, { expiresIn});
// // };

// import jwt from 'jsonwebtoken';

// export const createToken = async (
//   jwtPayload: { email: string; role: 'admin' | 'user' |Undefiend },
//   secret: string,
//   expiresIn: string ,
// ) : Promise<string> => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn ,
//   });
// };