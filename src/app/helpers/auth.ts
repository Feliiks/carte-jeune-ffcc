import Axios from "axios";


export const getUserSession = async (sessionToken: any) => {
  try {
    if (!sessionToken) throw new Error();
    let res = await Axios.post("http://localhost:3009/user/session/get", { sessionToken: sessionToken });

    if (res.status === 200) return res.data;
  } catch {
    return null;
  }
}

export const getYouthCardFromUser = async (userId: any) => {
  try {
    if (!userId) throw new Error()

    let res = await Axios.post("http://localhost:3009/user/card/get", { userId: userId });

    if (!res.data) throw new Error()

    return res.data
  } catch {
    return null
  }
}
