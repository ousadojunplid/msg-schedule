import { Dispatch } from "redux";
import mainAPI from "../providers/api.provider";
import { AxiosError } from "axios";
import { propsAuthActions } from "../reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

interface propsFieldsLogin {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false as boolean);
  const [error, setError] = useState<any>(null as any);
  const [fields, setFields] = useState<propsFieldsLogin>(
    {} as propsFieldsLogin
  );
  const [_cookies, setCookies] = useCookies(["auth"]);
  const dispatch: Dispatch<propsAuthActions> = useDispatch();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setError(null);
        setLoad(true);
        const { data } = await mainAPI.post("/v1/public/create/login", fields);
        setLoad(false);
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.data.token,
            full_name: data.data.full_name,
            type: data.data.type,
          },
        });
        setCookies("auth", data.data.token, {
          maxAge: 2147483647,
          path: "/",
          sameSite: "strict",
        });
        navigate("/panel");
      } catch (error) {
        setLoad(false);
        if (error instanceof AxiosError) {
          setError(error.response?.data?.body[0]);
          return;
        }
      }
    },
    [dispatch, fields, navigate]
  );

  const handleValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFields({ ...fields, [e.target.name]: e.target.value });
    },
    [fields]
  );

  return { onSubmit, handleValues, error, load };
}
