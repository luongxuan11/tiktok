// generateOTP.js
const otpGenerator = require('otp-generator');

const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    digits: true, 
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
  
  return otp;
};

module.exports = generateOTP;
