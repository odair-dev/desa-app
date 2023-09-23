import Background from "@/components/Background";
import Description from "@/components/Description";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Slogan from "@/components/Slogan";
import Filter from "@/components/filter";


export default function Home() {
  return (
    <main id="home">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      <Background>
        <Filter>
          <Header/>
          <Slogan/>
        </Filter>
      </Background>
      <Description />
      <Footer />
    </main>
  )
}
