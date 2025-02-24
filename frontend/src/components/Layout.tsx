import { AppBar, Container } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Navbar />
      </AppBar>
      <Container sx={{ marginTop: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
