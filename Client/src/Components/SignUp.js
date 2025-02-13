// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import PhoneInput from "react-native-phone-number-input";

// const SignupScreen = () => {
//   const [phone, setPhone] = useState("");
//   const [code, setCode] = useState("");
//   const [confirm, setConfirm] = useState(null);
//   const [name, setName] = useState("");
//   const [country, setCountry] = useState("");
//   const [isVerified, setIsVerified] = useState(false);

//   const sendOTP = async () => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phone);
//       setConfirm(confirmation);
//       Alert.alert("OTP Sent", "Please check your messages.");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   const verifyOTP = async () => {
//     try {
//       await confirm.confirm(code);
//       setIsVerified(true);
//       Alert.alert("Verified", "Phone number verified successfully.");
//     } catch (error) {
//       Alert.alert("Invalid OTP", "Please enter the correct OTP.");
//     }
//   };

//   const saveUserData = async () => {
//     if (!name || !country) {
//       Alert.alert("Missing Info", "Please enter your name and country.");
//       return;
//     }
//     const user = auth().currentUser;
//     await firestore().collection("users").doc(user.uid).set({
//       name,
//       country,
//       phone: user.phoneNumber,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
//     Alert.alert("Success", "Account created successfully!");
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
//       {!isVerified ? (
//         <>
//           <PhoneInput value={phone} onChangeFormattedText={setPhone} defaultCode="US" />
//           <TouchableOpacity onPress={sendOTP} style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}>
//             <Text style={{ color: "white", textAlign: "center" }}>Send OTP</Text>
//           </TouchableOpacity>

//           {confirm && (
//             <>
//               <TextInput placeholder="Enter OTP" value={code} onChangeText={setCode} keyboardType="number-pad" />
//               <TouchableOpacity onPress={verifyOTP} style={{ backgroundColor: "green", padding: 10, marginTop: 10 }}>
//                 <Text style={{ color: "white", textAlign: "center" }}>Verify OTP</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <TextInput placeholder="Enter Name" value={name} onChangeText={setName} />
//           <TextInput placeholder="Enter Country" value={country} onChangeText={setCountry} />

//           <TouchableOpacity onPress={saveUserData} style={{ backgroundColor: "purple", padding: 10, marginTop: 10 }}>
//             <Text style={{ color: "white", textAlign: "center" }}>Create Account</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// export default SignupScreen;












import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import PhoneInput from "react-native-phone-number-input";

const { width } = Dimensions.get("window");

const SignupScreen = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const sendOTP = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      Alert.alert("OTP Sent", "Please check your messages.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirm.confirm(code);
      setIsVerified(true);
      Alert.alert("Verified", "Phone number verified successfully.");
    } catch (error) {
      Alert.alert("Invalid OTP", "Please enter the correct OTP.");
    }
  };

  const saveUserData = async () => {
    if (!name || !country) {
      Alert.alert("Missing Info", "Please enter your name and country.");
      return;
    }
    const user = auth().currentUser;
    await firestore().collection("users").doc(user.uid).set({
      name,
      country,
      phone: user.phoneNumber,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    Alert.alert("Success", "Account created successfully!");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Signup</Text>

        {!isVerified ? (
          <>
            <PhoneInput
              value={phone}
              onChangeFormattedText={setPhone}
              defaultCode="US"
              containerStyle={styles.input}
              textContainerStyle={styles.textInput}
            />
            <TouchableOpacity onPress={sendOTP} style={styles.button}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>

            {confirm && (
              <>
                <TextInput
                  placeholder="Enter OTP"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  style={styles.input}
                />
                <TouchableOpacity onPress={verifyOTP} style={[styles.button, { backgroundColor: "green" }]}>
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <>
            <TextInput
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Country"
              value={country}
              onChangeText={setCountry}
              style={styles.input}
            />

            <TouchableOpacity onPress={saveUserData} style={[styles.button, { backgroundColor: "purple" }]}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: width * 0.9,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: "transparent",
  },
  button: {
    width: width * 0.9,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignupScreen;

