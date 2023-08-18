"use client";

import React from "react";

import useAppStore from "@/stores/useAppStore";

import Interface from "../Interface";
import StartScreen from "../StartScreen";

const StartScreenInterfaceSwitch = () => {
  const isStartScreenVisible = useAppStore(
    (state) => state.isStartScreenVisible
  );
  return <> {isStartScreenVisible ? <StartScreen /> : <Interface />}</>;
};

export default StartScreenInterfaceSwitch;
