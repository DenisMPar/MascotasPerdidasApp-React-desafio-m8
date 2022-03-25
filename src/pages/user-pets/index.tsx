import React from "react";
import { PetsCard } from "components/petsCard";
import { MyText } from "ui/text";
import { useGetUserPets } from "atoms";
import { useRecoilValue } from "recoil";
import css from "./index.css";

function UserPets() {
  const pets = useRecoilValue(useGetUserPets);

  return (
    <div className={css.root}>
      <MyText type="title">Tus mascotas reportadas</MyText>
      {pets ? (
        pets.map((pet) => {
          return <PetsCard key={pet.id} petData={pet} owner={true}></PetsCard>;
        })
      ) : (
        <MyText>No hay mascotas reportadas</MyText>
      )}
    </div>
  );
}
export { UserPets };
