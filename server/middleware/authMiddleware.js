// const protect = (req, res, next) => {
//   console.log(req.session.user);
//   if (req.session.user) {
//     // console.log(req.session.user);
//     next();
//   } else {
//     res.status(401).json({
//       status: "fail",
//       message: "You are not logged in!",
//     });
//   }
// };
const protect = (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in!",
    });
  }
};
module.exports = protect;
