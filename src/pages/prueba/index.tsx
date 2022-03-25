import { useGetPetsAround, UserState } from "atoms";
import { PetsCard } from "components/petsCard";
import { ReportCard } from "components/reportCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MainButton } from "ui/buttons";
import { MapboxSearch } from "ui/map";
import { MyText } from "ui/text";
import css from "./index.css";

function Prueba() {
  return (
    <div>
      <MapboxSearch></MapboxSearch>
    </div>
  );
}
export { Prueba };
