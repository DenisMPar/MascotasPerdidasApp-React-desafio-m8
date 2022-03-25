import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "router/index";
import { RecoilRoot } from "recoil";
import { LoaderComp } from "components/loader";

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={<LoaderComp />}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>,
  document.getElementById("root")
);
