import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export async function comparePassword(
  rawPassword: string,
  encryptedPassword: string
) {
  return await bcrypt.compare(rawPassword, encryptedPassword);
}

//fotgot-password
export function getResetToken() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  return {
    resetPasswordToken: crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex'),
    resetPasswordTime: new Date(Date.now() + 15 * 60 * 1000),
    resetToken,
  };
}
