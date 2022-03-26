import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "components/layout";
import { Home } from "pages/home/Index";
import { Login } from "pages/login";
import { Password } from "pages/password";
import { UserData } from "pages/user-data";
import { UserPets } from "pages/user-pets";
import { Publish } from "pages/publish";
import { Edit } from "pages/edit";
import { Form } from "pages/form";
import { MapboxSeach } from "pages/prueba";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/password" element={<Password />} />
        <Route path="/user/data" element={<UserData />} />
        <Route path="/user/pets" element={<UserPets />} />
        <Route path="/user/pets/publish" element={<Publish />} />
        <Route path="/user/pets/edit" element={<Edit />} />
        <Route path="/test" element={<MapboxSeach />} />
      </Route>
    </Routes>
  );
}
export { AppRoutes };
