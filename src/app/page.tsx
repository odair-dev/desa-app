"use client";
import Background from "@/components/Background";
import Description from "@/components/Description";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalImages from "@/components/Modal/images";
import Slogan from "@/components/Slogan";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";

export default function Home() {
  const { modalAllImages } = useContext(GlobalContext);

  return (
    <main id="home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      {modalAllImages ? <ModalImages /> : null}
      <Background>
        <Header />
        <Slogan />
      </Background>
      <Description />
      <Footer />
    </main>
  );
}
