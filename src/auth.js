import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebaseInit";
const auth = getAuth(app);

export const handleSignUp = async (userDetails) => {
  const { email, password } = userDetails;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    alert(err);
  }
};

export const handleSignIn = async (userDetails) => {
  const { email, password } = userDetails;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("user signedUp successfully");
    return true;
  } catch (err) {
    console.log("error occured: user not signedIn, " + err);
  }
};
