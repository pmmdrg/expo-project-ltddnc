import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useMessageAndErrorUser } from "../utils/hooks";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  const submitHandler = () => {
    dispatch(login(email, password));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={defaultStyle}>
        <View style={styles.container}>
          <View style={{ marginBottom: 10 }}>
            <Text style={formHeading}>Login</Text>
          </View>
          <TextInput
            {...inputOptions}
            placeholder="Email"
            autoCapitalize={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            {...inputOptions}
            autoCapitalize={false}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={styles.forget}>Forget Password?</Text>
          </TouchableOpacity>

          <Button
            loading={loading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
          >
            Log In
          </Button>

          <Text style={styles.or}>OR</Text>

          <Button
            textColor={colors.color2}
            style={styles.btn}
            onPress={() => navigation.navigate("signup")}
          >
            Sign Up
          </Button>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </SafeAreaView>
  );
};

export default Login;
