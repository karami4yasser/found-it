import { UpdateUserDetailsForm } from "../screens/EditProfile/EditProfile";
import { SignInForm } from "../screens/SignIn/SignIn";
import { SignUpForm } from "../screens/SignUp/SignUp";
import { COLORS } from "../styles/theme";
import Toaster from "./Toaster";

type validatingFieldsSignUpProps = {
  createUserDetailsForm: SignUpForm;
  setFirstNameHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setLastNameHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setphoneHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

type validatingFieldsEditProfileProps = {
  editUserDetailsForm: UpdateUserDetailsForm;
  setFirstNameHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setLastNameHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setphoneHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const validatingFieldsSignUp = ({
  createUserDetailsForm,
  setLastNameHasError,
  setFirstNameHasError,
  setphoneHasError,
  setPasswordHasError,
}: validatingFieldsSignUpProps) => {
  let hasError = false;
  // Minimum and maximum length validation for First Name (e.g., between 2 and 30 characters).
  if (
    createUserDetailsForm.firstName === "" ||
    createUserDetailsForm.firstName.length < 2 ||
    createUserDetailsForm.firstName.length > 30
  ) {
    Toaster.show(
      "First Name should be between 2 and 30 characters",
      1500,
      true,
      COLORS.red
    );
    setFirstNameHasError(true);
    hasError = true;
  } else {
    setFirstNameHasError(false);
  }

  // Minimum and maximum length validation for Last Name (e.g., between 2 and 30 characters).
  if (
    createUserDetailsForm.lastName === "" ||
    createUserDetailsForm.lastName.length < 2 ||
    createUserDetailsForm.lastName.length > 30
  ) {
    Toaster.show(
      "Last Name should be between 2 and 30 characters",
      1500,
      true,
      COLORS.red
    );
    setLastNameHasError(true);
    hasError = true;
  } else {
    setLastNameHasError(false);
  }
  if (!validphone(createUserDetailsForm.phone)) {
    Toaster.show("Phone number is not valid", 1500, true, COLORS.red);
    setphoneHasError(true);
    hasError = true;
  } else {
    setphoneHasError(false);
  }
  if (
    createUserDetailsForm.password === "" ||
    createUserDetailsForm.password.length < 6
  ) {
    Toaster.show(
      "Password must be at least 6 characters",
      1500,
      true,
      COLORS.red
    );
    setPasswordHasError(true);
    hasError = true;
  } else {
    setPasswordHasError(false);
  }

  return !hasError;
};

export const validatingFieldsEditProfile = ({
  editUserDetailsForm,
  setLastNameHasError,
  setFirstNameHasError,
  setphoneHasError,
}: validatingFieldsEditProfileProps) => {
  let hasError = false;
  // Minimum and maximum length validation for First Name (e.g., between 2 and 30 characters).
  if (
    editUserDetailsForm.firstName === "" ||
    editUserDetailsForm.firstName.length < 2 ||
    editUserDetailsForm.firstName.length > 30
  ) {
    Toaster.show(
      "First Name should be between 2 and 30 characters",
      1500,
      true,
      COLORS.red
    );
    setFirstNameHasError(true);
    hasError = true;
  } else {
    setFirstNameHasError(false);
  }

  // Minimum and maximum length validation for Last Name (e.g., between 2 and 30 characters).
  if (
    editUserDetailsForm.lastName === "" ||
    editUserDetailsForm.lastName.length < 2 ||
    editUserDetailsForm.lastName.length > 30
  ) {
    Toaster.show(
      "Last Name should be between 2 and 30 characters",
      1500,
      true,
      COLORS.red
    );
    setLastNameHasError(true);
    hasError = true;
  } else {
    setLastNameHasError(false);
  }
  if (!validphone(editUserDetailsForm.phone)) {
    Toaster.show("Phone number is not valid", 1500, true, COLORS.red);
    setphoneHasError(true);
    hasError = true;
  } else {
    setphoneHasError(false);
  }
  return !hasError;
};

export function validphone(phone: string): boolean {
  const emailRegex =
    /^(00\d{1,3}( )?|\+\d{1,3}( )?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/g;
  return emailRegex.test(phone);
}

type validatingFieldsSignInProps = {
  signInForm: SignInForm;
  setPhoneNumberEmailHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordHasError: React.Dispatch<React.SetStateAction<boolean>>;
};
export const validatingFieldsSignIn = ({
  signInForm,
  setPhoneNumberEmailHasError,
  setPasswordHasError,
}: validatingFieldsSignInProps) => {
  let hasError = false;
  //signInForm.email.length !== 10
  if (signInForm.emailOrPhone === "") {
    Toaster.show("This field is necessary!", 1500, true, COLORS.red);
    setPhoneNumberEmailHasError(true);
    hasError = true;
  } else if (
    !isValidPhoneNumber(signInForm.emailOrPhone) &&
    !isValidEmail(signInForm.emailOrPhone)
  ) {
    Toaster.show(
      "Invalid email address or phone number. Please enter a valid email or a 10-digit phone number!",
      1500,
      true,
      COLORS.red
    );
    setPhoneNumberEmailHasError(true);
    hasError = true;
  } else {
    setPhoneNumberEmailHasError(false);
  }
  if (signInForm.password === "" || signInForm.password.length < 6) {
    Toaster.show("This field is necessary !", 1500, true, COLORS.red);
    setPasswordHasError(true);
    hasError = true;
  } else {
    setPasswordHasError(false);
  }

  return !hasError;
};
function isValidEmail(input: string) {
  // Regular expression for email validation
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;
  return emailRegex.test(input);
}
function isValidPhoneNumber(input: string) {
  return (
    input.length === 10 && Array.from(input).every((c) => c <= "9" && c >= "0")
  );
}
