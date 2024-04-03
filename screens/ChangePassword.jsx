import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(dispatch);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />

      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Change Password</Text>
        </View>
        <TextInput
          {...inputOptions}
          placeholder="Old Password"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          {...inputOptions}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Button
          loading={loading}
          textColor={colors.color2}
          style={styles.btn}
          onPress={submitHandler}
        >
          Change
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;
