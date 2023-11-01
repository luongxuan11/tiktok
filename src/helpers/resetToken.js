const crypto = require('crypto');

const resetToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // tạo ra 1 đoạn token
    const passwordResetExpires = Date.now() + 15 * 60 * 1000;
  
    return {resetToken,passwordResetToken, passwordResetExpires};
  };

  export default resetToken