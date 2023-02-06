//import { useState, useEffect } from "react";
import "./css/GUIHome.css";
import React, { Component } from 'react';
import Porst from "../../Component/Ports/Ports"
//import Sidebar from "../../Component/Sidebar/Sidebar";

import { useLocation } from "react-router";
import Header from "../../Component/Header/header";

export default function GUIHome() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header />
      <div className="home">
        <Porst />
      
      </div>
    </>
  );
}