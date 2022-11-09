import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "../API/loginAPI";
import jwt_decode from "jwt-decode";
const initialState = {
  userName: "",
  email: "",
  token: "",
  logged: false,

};

export const LoginAsync = createAsyncThunk(
  "login/Login",
  async (loginData) => {
    const response = await Login(loginData);
    return response.data;
  }
);
// export const doSignupAsync = createAsyncThunk(
//   'login/Register',
//   async (cred) => {
//       console.log(cred)
//       const response = await Register(cred);
//       return response.data;
//   }
// );
// export const doSignOutAsync = createAsyncThunk(
//   'login/myLogout',
//   async (token) => {
//       console.log(token)
//       const response = await myLogout(token);
//       return response.data;
//   }
// );

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        if (action.payload.access) {
          state.token = action.payload.access
          state.logged = true;
          state.userName = jwt_decode(state.token).username
          console.log(state.userName)
          console.log(state.token)
          // state.email = jwt_decode(action.payload.access).eeemail
          // console.log( state.email)
        }
      // }).addCase(doSignOutAsync.fulfilled, (state, action) => {
      //   console.log("log out")
      //   state.token = ""
      //   state.logged = false;
      //   state.userName = ""
      //   state.email = ""
      //   // console.log( state.email)
      // });
  })
  },
});




export default LoginSlice.reducer;
export const selectLogged = (state) => state.login.logged;
export const selectToken = (state) => state.login.token;
export const selectUserName = (state) => state.login.userName;