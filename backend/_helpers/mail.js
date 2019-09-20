var nodemailer = require('nodemailer');
const db = require('../_helpers/db');
const User = db.User;

module.exports = coolmail;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'epamlibrarian@gmail.com',
         pass: 'l1brari@n'
     }
 });


async function coolmail(req, res, next) {
  console.log(req.body);

  const user = await User.findById(req.body.id).select('-hash');

  const mailOptions = {
    from: 'epamlibrarian@gmail.com', // sender address
    to: user.username, // list of receivers
    subject: req.body.subject, // Subject line
    html: `Hello ${user.firstName} ${user.lastName} \n ${req.body.message}`// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      return err;
    else
      return info;
 });
}