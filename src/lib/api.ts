type coordinates = {
  lat: number;
  lng: number;
};
const API_BASE_URL = "https://mascotas-perdidas-m7.herokuapp.com";

//obtiene las mascotas cercanas
export async function getPetsAround(coordinates: coordinates) {
  const response = await fetch(
    API_BASE_URL + `/pets-around?lat=${coordinates.lat}&lng=${coordinates.lng}`
  );
  const json = await response.json();
  return json;
}
//envia el reporte cuando una mascota fue vista
export async function sendPetReport(params) {
  const res = await fetch(API_BASE_URL + "/pets/report", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(params),
  }).catch((err) => {
    return err;
  });
  const resJson = await res.json();
  return resJson;
}

//chekcea si existe el email del user
export async function checkEmail(email) {
  const res = await fetch(API_BASE_URL + "/check", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).catch((err) => {
    return err;
  });
  const resJson = await res.json();
  return resJson;
}
//logea al usuario y obtiene el token
export async function auth(email, password) {
  const res = await fetch(API_BASE_URL + "/auth/token", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).catch((err) => {
    return err;
  });
  const resJson = await res.json();
  return resJson;
}

// obtiene la data del user vinculada al token
export async function getMe(token: string) {
  const res = await fetch(API_BASE_URL + "/me", {
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  });
  const resJson = await res.json();
  return resJson;
}
//modifica los datos de un usuario
export async function modifyUser({ body, token }) {
  const res = await fetch(API_BASE_URL + "/me", {
    method: "put",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const resJson = await res.json();
  return resJson;
}

type newUser = {
  name: string;
  email: string;
  password: string;
};
//da de alta un nuevo user
export async function signUpUser(body: newUser) {
  const res = await fetch(API_BASE_URL + "/auth", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resJson = await res.json();
  return resJson;
}
//obtiene todas las mascotas de un usuario
export async function getUserPets(token: string) {
  const res = await fetch(API_BASE_URL + "/me/pets", {
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  });
  const resJson = await res.json();
  return resJson;
}
//da de alta una nueva mascota reportada
export async function reportPet({ body, token }) {
  const res = await fetch(API_BASE_URL + "/pets", {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    return err;
  });

  const resJson = await res.json();

  return resJson;
}
//obtiene la data de una mascota segun su id
export async function getPetData({ petId, token }) {
  const res = await fetch(API_BASE_URL + "/pets/" + petId, {
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  }).catch((err) => {
    return err;
  });

  const resJson = await res.json();
  const petData = {
    id: resJson.id,
    name: resJson.name,
    pictureUrl: resJson.pictureUrl,
    lat: resJson.lat,
    lng: resJson.lng,
    condition: resJson.condition,
    userId: resJson.userId,
    zone: resJson.zone,
  };
  return petData;
}
//edita los datos de una mascota
export async function editUserPet({ body, token, id }) {
  const res = await fetch(API_BASE_URL + "/pets/" + id, {
    method: "put",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    return err;
  });

  const resJson = await res.json();
  return resJson;
}
//elimina una mascota reportada
export async function deleteUserPet({ token, id }) {
  const res = await fetch(API_BASE_URL + "/pets/" + id, {
    method: "delete",
    headers: {
      authorization: `bearer ${token}`,
    },
  }).catch((err) => {
    return err;
  });

  const resJson = await res.json();
  return resJson;
}
