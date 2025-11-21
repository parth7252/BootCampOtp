import { wait } from '../utils/wait';

export async function verifyOtp(otp: string) {
  await wait(1500);
  return { ok: otp.length === 4, otp };
}

export async function resendOtp() {
  await wait(700);
  return { ok: true };
}
