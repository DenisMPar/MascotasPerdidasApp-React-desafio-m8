import { useRecoilValue } from "recoil";
import { petState } from "atoms";
import { auth } from "lib/api";

export function usePetData() {
  const petStateData = useRecoilValue(petState);
  return petStateData;
}

export function useAuth() {
  async function login(email, pass) {
    const res = await auth(email, pass);
    if (res.token) {
      localStorage.setItem("auth_token", res.token);
      return true;
    } else {
      return false;
    }
  }

  return {
    login,
  };
}
export function useSendPetReport() {
  async function sendReport(email, pass) {
    const res = await auth(email, pass);
    if (res.token) {
      localStorage.setItem("auth_token", res.token);
      return true;
    } else {
      return false;
    }
  }

  return {
    sendReport,
  };
}
