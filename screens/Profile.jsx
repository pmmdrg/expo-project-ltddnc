import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";

import { loadUser, logout } from "../redux/actions/userActions";
import { updatePic } from "../redux/actions/otherAction";

import {
  useMessageAndErrorOther,
  useMessageAndErrorUser,
} from "../utils/hooks";

import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { colors, defaultImg, defaultStyle } from "../styles/styles";

const Profile = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(defaultImg);
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const loading = useMessageAndErrorUser(navigation, dispatch, "login");

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
        navigation.navigate("orders");
        break;
    }
  };

  const loadingPic = useMessageAndErrorOther(dispatch, null, null, loadUser);

  useEffect(() => {
    if (route.params?.image) {
      const myForm = new FormData();

      setAvatar(route.params.image);

      myForm.append("file", {
        uri: route.params.image,
        type: mime.getType(route.params.image),
        name: route.params.image.split("/").pop(),
      });

      dispatch(updatePic(myForm));
    }

    dispatch(loadUser());
  }, [route.params, dispatch, isFocused]);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[defaultStyle, { padding: 20 }]}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={[styles.container, { marginBottom: 20 }]}>
              <Avatar.Image
                source={{
                  uri: avatar,
                }}
                size={100}
                style={{ backgroundColor: colors.color1 }}
              />
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button
                  disabled={loadingPic}
                  loading={loadingPic}
                  textColor={colors.color2}
                >
                  Thay đổi ảnh
                </Button>
              </TouchableOpacity>
              <Text style={styles.name}>{user?.name}</Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: colors.color2,
                }}
              >
                {user?.email}
              </Text>
            </View>
            <View style={{display: 'flex', gap: 20}}>
              <ButtonBox
                handler={navigateHandler}
                handlerText={"Orders"}
                displayText={"Đơn hàng"}
                icon={"format-list-bulleted-square"}
              />
              {user?.role === "admin" && (
                <ButtonBox
                  handler={navigateHandler}
                  icon={"view-dashboard"}
                  handlerText={"Admin"}
                  displayText={"Admin"}
                  reverse={true}
                />
              )}
              <ButtonBox
                handler={navigateHandler}
                handlerText={"Profile"}
                displayText={"Hồ sơ"}
                icon={"pencil"}
              />
              <ButtonBox
                handler={navigateHandler}
                handlerText={"Password"}
                displayText={"Đổi mật khẩu"}
                icon={"pencil"}
              />
              <ButtonBox
                handler={navigateHandler}
                handlerText={"Sign Out"}
                displayText={"Đăng xuất"}
                icon={"exit-to-app"}
              />
            </View>
          </>
        )}
      </View>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 10,
    color: colors.color2,
  },
});

export default Profile;
