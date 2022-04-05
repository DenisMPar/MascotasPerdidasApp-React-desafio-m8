import { getMe, getPetData, getPetsAround, getUserPets } from "lib/api";
import { atom, useRecoilValue, selector, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const userEmail = atom({
  key: "userEmail",
  default: "",
});

//selector que trae la data del user de la api
export const userData = selector({
  key: "userData",
  get: async ({ get }) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const myUserData = await getMe(token);
      return myUserData;
    }
  },
});

export const useUserData = () => useRecoilValue(userData);
export const useUserEmail = () => useRecoilState(userEmail);

//estado del user que se guarda en el local storage
const UserState = atom({
  key: "userState",
  default: {
    location: null,
  },
  effects_UNSTABLE: [persistAtom],
});

//selector que devuelve las mascotas cercanas a las coordenadas del user
const useGetPetsAround = selector({
  key: "useGetPetsAround",
  get: async ({ get }) => {
    const userState = get(UserState);
    if (userState.location) {
      const pets = await getPetsAround(userState.location);
      //si hay mascotas cerca devuevlo el array pets, si no devuelvo false
      //esto es porque si devuelvo el array vacio me lo toma como truthy y no renderiza bien la pagina
      return pets.length > 0 ? pets : false;
    }
  },
});

// selector que devuelve todas las mascotas reportadas por el user
const useGetUserPets = selector({
  key: "useGetUserPets",
  get: async ({ get }) => {
    const token = localStorage.getItem("auth_token");
    const pets = await getUserPets(token);
    //si hay mascotas cerca devuevlo el array pets, si no devuelvo false
    //esto es porque si devuelvo el array vacio no renderiza bien la pagina
    return pets.length > 0 ? pets : false;
  },
});

//selector que devuelve los datos de una mascota segun su id
const useGetPetData = selector({
  key: "useGetPetData",
  get: async ({ get }) => {
    const state = get(petState);
    const petId = state.id;
    const token = localStorage.getItem("auth_token");
    const petData = await getPetData({ petId, token });
    return petData;
  },
});
//estado local de la mascota
const petState = atom({
  key: "petState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
//estado que guarda la key "redirect", para redireccionar al usuario despues del login
//por defecto lo manda al home
const menuRedirectState = atom({
  key: "menuRedirect",
  default: "/",
});

//estado que guarda la url de la imagen de una mascota
const pictureUrlState = atom({
  key: "pictureUrl",
  default: null,
});

export {
  UserState,
  useGetPetsAround,
  petState,
  menuRedirectState,
  useGetUserPets,
  pictureUrlState,
  useGetPetData,
};
