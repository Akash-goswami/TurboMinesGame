import "./Home.css";
// import { playToggleSound } from "../src/utils/gameSettings";
import Rotate from "/MenuImages/Rotate.webp";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import { useBackground } from "./context/backgroundClassProvider";
import ParentComponent from "./components/manu/ParentComponent";
import MainGame from "./components/home/MainGame";

interface HomeProps {
  shouldShowRotateImage: boolean;
}

export default function Home({ shouldShowRotateImage }: HomeProps) {
  const { menuOpen, setMenuOpen, showComponent } = useBackground();
  return (
    <>
      {shouldShowRotateImage ? (
        <img src={Rotate} alt="rotate" width="100%" height="100%" />
      ) : (
        <div>
          <Navbar />
          <MainGame/>
          <Footer/>
          <div
                className={`animation--Pf2PO animationOpen--lhuEa ${
                  menuOpen
                    ? "animeTranslate01 animation--Pf2PO animation-top-up"
                    : ""
                }`}
              >
                <div
                  className={`animationInner--O9n3F ${
                    menuOpen ? "animeTranslate02" : ""
                  }`}
                >
                  <div className="tmp--Kw11C">
                    <div className="tmpInner--Ya0As tmpInnerBg--fkOXm">
                      {showComponent ? <ParentComponent /> : null}
                    </div>
                  </div>
                </div>
              </div>
        </div>
      )}
    </>
  );
}
