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
    const signedUpRes = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("user signedUp successfully", signedUpRes);

    return { res: signedUpRes, status: "success" };
  } catch (err) {
    alert(err);
    return { res: undefined, status: "failure" };
  }
};

export const handleSignIn = async (userDetails) => {
  const { email, password } = userDetails;
  try {
    const signedInRes = await signInWithEmailAndPassword(auth, email, password);
    return { res: signedInRes._tokenResponse.localId, status: true };
  } catch (err) {
    console.log("error occured: user not signedIn, " + err);
    return { res: null, status: false };
  }
};
