import { useState, useRef } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { ApplicationVerifier, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { app, auth } from '../../../../lib/firebase';
import FirebaseRecaptchaVerifierModal from 'expo-firebase-recaptcha/build/FirebaseRecaptchaVerifierModal';
import FirebaseRecaptchaBanner from 'expo-firebase-recaptcha/build/FirebaseRecaptchaBanner';
import { PhoneNumberInput } from '../../../components/atoms/form/PhoneNumberInput';
import { VerificationCodeInput } from '../../../components/atoms/form/VerificationCodeInput';

// Double-check that we can run the example
if (!app?.options
    || Platform.OS === 'web'
) {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

/**
 * Expo 利用の場合 Firebase が用意する UI は使えない
 * 以下の Expo 公式に expo-firebase-recaptcha を利用した電話番号認証方法が記載
 * @ref https://docs.expo.dev/versions/latest/sdk/firebase-recaptcha/
 * @returns 
 */
const RegisterUsePhoneNumberScreen = () => {
    // Ref or state management hooks
    const recaptchaVerifier = useRef(null as unknown as ApplicationVerifier);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = useState();
    const attemptInvisibleVerification = false;

    const sendVerificationCode = async () => {
        // The FirebaseRecaptchaVerifierModal ref implements the
        // FirebaseAuthApplicationVerifier interface and can be
        // passed directly to `verifyPhoneNumber`.
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId as any);
            showMessage({
                text: '確認コードを送信しました。',
            } as any);
        } catch (err) {
            showMessage({ text: `Error: ${(err as any).message}`, color: 'red' } as any);
        }
    };

    const confirmVerificationCode = async () => {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId as any,
                verificationCode as any
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: '電話番号認証が完了しました。' } as any);
        } catch (err) {
            showMessage({ text: `Error: ${(err as any).message}`, color: 'red' } as any);
        }
    };

    return (
        <View style={{ padding: 20, marginTop: 50 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier as unknown as string}
                firebaseConfig={firebaseConfig}
            // attemptInvisibleVerification
            />
            <Text style={{ marginTop: 20 }}>電話番号を入力</Text>
            <PhoneNumberInput value={phoneNumber} setValue={setPhoneNumber} />
            <Button
                title="確認コードを送信する"
                disabled={!phoneNumber}
                onPress={sendVerificationCode}
            />
            <Text style={{ marginTop: 20 }}>確認コードを入力</Text>
            <VerificationCodeInput value={verificationId} setValue={setVerificationCode} />
            <Button
                title="確認コードを確認"
                disabled={!verificationId}
                onPress={confirmVerificationCode}
            />
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        ({ backgroundColor: 0xffffffee, justifyContent: 'center' } as any),
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: (message as any).color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                        }}>
                        {(message as any).text}
                    </Text>
                </TouchableOpacity>) : (undefined)}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
    );
};

export default RegisterUsePhoneNumberScreen;