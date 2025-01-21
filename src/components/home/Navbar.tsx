import { LiaWalletSolid } from "react-icons/lia"
import { useSound } from "../../context/soundContext"
import { useState } from "react";
import { useBackground } from "../../context/backgroundClassProvider";
import "./Navbar.css"

function Navbar() {
    const [isClickedMute, setIsClickedMute] = useState(false);
    const [isClickedMenu, setIsClickedMenu] = useState(false);
    const { sound ,toggleMute } =useSound()
    const { menuOpen, setMenuOpen } = useBackground();

    const handleMenuOpen = () => {
        setIsClickedMenu(true);
        setMenuOpen(!menuOpen);
        setTimeout(() => {
          setIsClickedMenu(false);
        }, 200);
      };

    const IsclickChange = () => {
        setIsClickedMute(true);
        setTimeout(() => {
          setIsClickedMute(false);
          toggleMute();
        }, 200);
      };
    
      const IsmenuclickChange = () => {
        setIsClickedMenu(true);
        setTimeout(() => {
          setIsClickedMenu(false);
          handleMenuOpen();
        }, 200);
      };

  return (
    <nav>
    <div className="header">
      <div className="header-balance">
        <span className="header-balance-text">Balance:</span>
        {/* <LiaWalletSolid className="WallateIcon" /> */}
        <span className="header-balance-value">
          100.00
        </span>
        {/* <span
          className={`balanceSum--_ab3Z ${
            isWinPopUp ? "balanceAnimate--wIMrh" : ""
          }`}
        >
          {new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(
            parseFloat(userInfo?.bl?.toString() ?? "0")
          )}{" "}
          {isWinPopUp && (
            <span className="balanceDifference--an2T4">
              +{bank}
            </span>
          )}
        </span> */}
      </div>
      <div className="header-icon">
        {sound ? (
          <img
            src={`${
              isClickedMute
                ? "/MenuImages/soundIconColor.png"
                : "/MenuImages/soundIcon.png"
            }`}
            alt="SoundIcon"
            className="header-icon-item"
            width="20px"
            onClick={IsclickChange}
          />
        ) : (
          <img
            src={`${
              isClickedMute
                ? "/MenuImages/muteIconColor.png"
                : "/MenuImages/muteIcon.png"
            }`}
            alt=""
            onClick={IsclickChange}
            className="header-icon-item"
            width="16px"
          />
        )}

        <img
          src={`${
            isClickedMenu
              ? "/MenuImages/menuIconColor.png"
              : "/MenuImages/hamburger.png"
          }`}
          onClick={IsmenuclickChange}
          className="header-icon-item"
          alt=""
          width="22px"
        />
      </div>
    </div>
  </nav>
  )
}

export default Navbar
