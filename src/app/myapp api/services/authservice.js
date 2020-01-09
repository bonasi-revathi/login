var { Register } = require('../Models/mongoschema');
const bycrypt = require("bcryptjs");
let generator = require("generate-password");
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
const saltRounds = 8;
exports.registeruser = function (userdata, callback) {
    Register.find({ Email: userdata.Email }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else if(doc.length) {
            console.log(doc);
            var status = {
                info: 'user registered already',
                status: 409,
                data: doc
            }
            return callback(err, status);
        } else {
            jwt.sign({userdata},'3x6le09r0^p',{expiresIn: '1d'},(err,token) => {
            let password = generator.generate({
                length: 8,
                numbers: true
            });
            console.log(password);
            bycrypt.hash(password, saltRounds, async function (err, hash) {
                var enrolldata = new Register({
                    fname:userdata.fname,
                    lname: userdata.lname,
                    Email: userdata.Email,
                    password: hash,
                });
                enrolldata.save((err, doc1) => {
                    if (!err) {
                        console.log('1',doc);
                    } else {
                        console.log(err);
                    }
                    var status = {
                        data: doc1,
                        password: password,
                        authtoken: token
                    }
                    sendEmail(userdata,password);
                      callback(err, status);
                })

            })
        })
        }
    })
}

function sendEmail(userdata, password) {
    /* Email Triggering module */
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "lakshmisrikanth.thota@gmail.com",
        pass: "srikanth@2014"
      }
    });
    console.log("SMTP Configured");
    let mailOptions = {
      from: "lakshmisrikanth.thota@gmail.com",
      to: userdata.Email,
      subject: "Your Password has been Created",
      text:
        `Dear ` +
        userdata.fname +
        `,` +
        `
  This is a confirmation that the password for your account has just been Created.

                      UserName : ` +
       userdata.Email +
        `
                      Password  : ` +
        password
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      } else {
        console.log("Email Sent:  " + info.response);
      }
    });
  }


  exports.loginuser = function (logindata, callback) {
      var emp = new Register(logindata)
      console.log(emp);
      Register.find({Email:emp.Email},(err, doc) => {
          if(err) {
              console.log(err)
          }
          else if(doc.length < 1) {
              var status = {
                  info: 'User not registered',
                  status: 409
              }
              return callback(err, status);
          } else {
              console.log('Docsriii',doc[0].password);
            //  console.log(emp.password);
            //  console.log(doc.password);
            if (bycrypt.compareSync(emp.password, doc[0].password)) {
                jwt.sign({logindata},'3x6le09r0^p',{expiresIn:'1d'},(err,token) => {
                var status = {
                    info: 'User authenticated successfully',
                    status: 200,
                    data: doc,
                    authtoken: token
                }
                return callback(err,status);
            })
            } else {
                var status = {
                    info:'Invalid Credentials',
                    status: 406
                }
                return callback(err,status);
            }
          }
      })
  }


  exports.updatepassword =  function(updatedata, callback) {
      console.log(updatedata.password);
     bycrypt.hash(updatedata.password, saltRounds, async function (err, hash) {
         Register.findOneAndUpdate({Email: updatedata.Email},{password:hash},(err, doc)=> {
             if(!err) {
                 console.log(doc);
             } else {
                 console.log(err);
             }
             return callback(err, doc);
         })

     })
    return;
  }
