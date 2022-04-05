import { useRecoilState, useRecoilValue } from "recoil";
import { petState, UserState } from "atoms";
import {
  auth,
  editUserPet,
  modifyUser,
  reportPet,
  sendPetReport,
  signUpUser,
} from "lib/api";

//devuelve la data de una mascota
export function usePetData() {
  const petStateData = useRecoilValue(petState);
  return petStateData;
}
//logea al usuario
export function useAuth() {
  const [userData, setUserData] = useRecoilState(UserState);
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
//envia un mail de reporte
export function useSendPetReport() {
  async function sendReport(report) {
    const res = await sendPetReport(report);

    if (res.message == "email sent") {
      return true;
    } else {
      return false;
    }
  }

  return {
    sendReport,
  };
}
//modifica la data de un user
export function useModifyUserData() {
  async function modifyUserData({ body, token }) {
    const res = await modifyUser({ body, token });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  return {
    modifyUserData,
  };
}
//da de alta un nuevo usuario
export function useSignUp() {
  async function signUp({ name, email, password }) {
    const res = await signUpUser({ name, email, password });

    if (res) {
      return true;
    } else {
      return false;
    }
  }

  return {
    signUp,
  };
}
//da de alta una mascota
export function usePublish() {
  async function publish({ body, token }) {
    const res = await reportPet({ body, token });

    if (res.newPet) {
      return true;
    } else {
      return false;
    }
  }

  return {
    publish,
  };
}
export function useEditPet() {
  async function editPet({ body, token, id }) {
    const res = await editUserPet({ body, token, id });
    if (res[0] === 1) {
      return true;
    } else {
      return false;
    }
  }

  return {
    editPet,
  };
}
