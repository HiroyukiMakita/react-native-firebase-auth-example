import { useState, useRef } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { ApplicationVerifier, linkWithCredential, PhoneAuthProvider, updateCurrentUser } from 'firebase/auth';
import { app, auth } from '../../../../lib/firebase';
import FirebaseRecaptchaVerifierModal from 'expo-firebase-recaptcha/build/FirebaseRecaptchaVerifierModal';
import FirebaseRecaptchaBanner from 'expo-firebase-recaptcha/build/FirebaseRecaptchaBanner';
import { PhoneNumberInput } from '../../../components/atoms/form/PhoneNumberInput';
import { VerificationCodeInput } from '../../../components/atoms/form/VerificationCodeInput';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Double-check that we can run the example
if (!app?.options
    || Platform.OS === 'web'
) {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

const LinkWithPhoneNumberScreen = () => {
    const navigation = useNavigation();

    // Ref or state management hooks
    const recaptchaVerifier = useRef(null as unknown as ApplicationVerifier);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = useState();
    const attemptInvisibleVerification = false;

    const loginCheck = (): boolean => {
        if (auth.currentUser === null) {
            showMessage({ text: 'Error: ユーザーが見つかりません', color: 'red' } as any);
            return false;
        }
        return true;
    };

    useFocusEffect(() => {
        loginCheck();
    });

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
        if (!loginCheck()) {
            return;
        }
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId as any,
                verificationCode as any
            );
            const userCredential = await linkWithCredential(auth.currentUser!, credential);
            console.log('link with phone number success: ', userCredential);
            await updateCurrentUser(auth, userCredential.user)
                .then(() => console.log('currentUser updated.'))
                .catch((error) => {
                    console.log(error.message);
                });
            showMessage({ text: '電話番号認証が完了しました。' } as any);
            navigation.navigate('Home' as never);
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
                title="確認コードを確認して電話番号認証にリンクする"
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

export default LinkWithPhoneNumberScreen;