import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import CustomButton from "../components/common/CustomButton";
import CustomInput from "../components/common/CustomInput";
import CustomLabel from "../components/common/CustomLabel";
import CustomText from "../components/common/CustomText";
import CustomTitle from "../components/common/CustomTitle";
import PressableOpacity from "../components/common/PressableOpacity";
import { useAuth } from "../context/AuthContext";
import { sharedStyles } from "../styles/styles";
import theme from "../utils/theme";

interface FormData {
  name: string;
  password: string;
  nameError: boolean;
  passwordError: boolean;
}

type AuthStackParams = {
  Home: undefined;
  SignIn: undefined;
};

export default function SignInScreen({
  navigation,
}: StackScreenProps<AuthStackParams, "SignIn">) {
  const [formData, setFormData] = useState<FormData>({
    name: "a",
    password: "a",
    nameError: false,
    passwordError: false,
  });
  const { signIn } = useAuth();

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      [`${name}Error`]: false,
    }));
  };

  const handleSubmit = () => {
    if (formData.name.trim() === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        nameError: true,
      }));
    }
    if (formData.password.trim() === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        passwordError: true,
      }));
    }
    if (formData.name.trim() !== "" && formData.password.trim() !== "") {
      signIn();
    }
  };

  return (
    <SafeAreaView
      style={[sharedStyles.container, { backgroundColor: theme.colors.white }]}>
      <View style={styles.wrapper}>
        <CustomTitle>Sign In</CustomTitle>
      </View>
      <View style={styles.container}>
        <CustomLabel label="Name" style={styles.label} />
        <CustomInput
          value={formData.name}
          inputStyle={styles.input}
          errorTextStyle={styles.errorText}
          onChangeText={(text) => handleInputChange("name", text)}
          error={formData.nameError}
          errorMessage="Name is required"
        />
      </View>
      <View style={styles.container}>
        <CustomLabel label="Password" style={styles.label} />
        <CustomInput
          value={formData.password}
          inputStyle={styles.input}
          errorTextStyle={styles.errorText}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
          error={formData.passwordError}
          errorMessage="Password is required"
        />
      </View>
      <CustomButton
        style={styles.button}
        buttonTextStyle={styles.buttonText}
        title="Sign In"
        onPress={handleSubmit}
      />
      <View style={styles.wrapper}>
        <PressableOpacity
          style={styles.pressable}
          activeOpacity={0.5}
          onPress={() => {}}>
          <CustomText>Forgot Password?</CustomText>
        </PressableOpacity>
        <PressableOpacity
          style={styles.pressable}
          activeOpacity={0.5}
          onPress={() => {}}>
          <CustomText>
            Don’t have an account? <Text style={styles.textBold}>SIGN UP</Text>
          </CustomText>
        </PressableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  wrapper: {
    alignItems: "center",
    gap: 20,
  },
  pressable: {
    borderRadius: 4,
    padding: 8,
  },
  textBold: {
    fontWeight: "bold",
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.secondary,
  },
  errorText: {
    color: theme.colors.red,
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: theme.colors.main,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
