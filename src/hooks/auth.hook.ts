import { Dispatch } from "redux";
import mainAPI from "../providers/api.provider";
import { AxiosError } from "axios";
import { propsAuthActions } from "../reducers/auth.reducer";

interface propsAuthHook {
  dispatch: Dispatch<propsAuthActions>;
}

interface propsLogin {
  email: string;
  password: string;
}

export default function useAuth({ dispatch }: propsAuthHook) {
  const login = async (props: propsLogin) => {
    try {
      const { data } = await mainAPI.post("/v1/public/create/login", props);
      // alimentar o estado
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error axios", error.response);
        return;
      }
      console.log("Error axios", error);
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      // mandar para  apagina de login
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error axios", error.response);
        return;
      }
      console.log("Error axios", error);
    }
  };

  return { login, logout };
}