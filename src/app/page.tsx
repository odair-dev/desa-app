import Background from "@/components/Background";
import Description from "@/components/Description";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Slogan from "@/components/Slogan";
import Filter from "@/components/filter";
import Link from "next/link";


export default function Home() {
  return (
    <main id="home">
      <Background>
        <Filter>
          <Header/>
          <Slogan/>
        </Filter>
        {/* <Link href={`/schedules/`}>Imóveis</Link> */}
      </Background>
      <Description />
      <Footer />
    </main>
  )
}
