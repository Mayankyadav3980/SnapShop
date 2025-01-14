import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";

const initialState = {
  userDetails: {
    uId: "",
    uEmail: "",
    uPassword: "",
  },
};

export const addUserToDb = createAsyncThunk(
  "user/addUserToDb",
  async ([uid, email], thunkAPI) => {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { userEmail: email, cartItems: [] });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { uId, uEmail, uPassword } = action.payload;
      state.userDetails = {
        uId,
        uEmail,
        uPassword,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserToDb.fulfilled, (state, action) => {
        toast.success("user signed up successfully");
      })
      .addCase(addUserToDb.rejected, (state, action) => {
        toast.error("Something went wrong");
      });
  },
});

export const userReducer = userSlice.reducer;
export const { setUserDetails } = userSlice.actions;
