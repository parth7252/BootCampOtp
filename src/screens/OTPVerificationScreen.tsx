import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import OTPInput from '../components/OTPInput/OTPInput';
import useTimer from '../hooks/useTimer';
import { verifyOtp, resendOTP } from '../services/authService';

const OTPVerificationScreen = (): React.ReactElement => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const { timeLeft, reset } = useTimer(60);
  const fullOtp = useMemo(() => otp.join(''), [otp]);

  const handleVerify = async () => {
    if (fullOtp.length < 4) {
      Alert.alert('Invalid', 'Please enter a 4-digit code');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(fullOtp);
      console.log('Entered OTP:', fullOtp);
      if (res.ok) Alert.alert('Success', 'OTP verified (mock)');
      else Alert.alert('Failed', 'Invalid OTP (mock)');
    } catch {
      Alert.alert('Error', 'Network error (mock)');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    setResending(true);
    try {
      const r = await resendOTP();
      if (r.ok) {
        reset();
        setOtp(['', '', '', '']);
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent you on
      </Text>
      <Text style={styles.email}>example@gmail.com</Text>

      <OTPInput value={otp} onChange={setOtp} />

      <TouchableOpacity
        style={[styles.verifyButton, (fullOtp.length < 4 || loading) && styles.disabled]}
        onPress={handleVerify}
        disabled={fullOtp.length < 4 || loading}
        accessibilityLabel="Verify"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify</Text>
        )}
      </TouchableOpacity>

      <View style={styles.resendRow}>
        <Text style={styles.helper}>Didn't receive the code? </Text>
        {timeLeft > 0 ? (
          <Text style={styles.timer}>{`Resend in ${timeLeft}s`}</Text>
        ) : (
          <TouchableOpacity onPress={handleResend} disabled={resending}>
            <Text style={styles.resend}>{resending ? 'Resending...' : 'Resend'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, paddingTop: 80, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { textAlign: 'center', marginTop: 12, color: '#6B7280' },
  email: { textAlign: 'center', marginTop: 6, fontWeight: '700' },
  verifyButton: {
    marginTop: 8,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
  verifyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  resendRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helper: { color: '#6B7280' },
  timer: { color: '#6B7280', fontWeight: '700' },
  resend: { color: '#0EA5E9', fontWeight: '700' },
});
