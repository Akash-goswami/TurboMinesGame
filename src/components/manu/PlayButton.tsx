import { useEffect, useState } from "react";
import { useBackground } from "../../context/backgroundClassProvider";
import { useSocket } from "../../context/socket/socketProvider";
import { useSound } from "../../context/soundContext";
import ClickImg from "/public/MenuImages/ClickPumpImg.webp";
import PumpImg from "/public/MenuImages/pumpImg.webp";
import {
  blueWinPop,
  BoyPump_It,
  First_Pull,
  GirlPump_It,
  greenWinPop,
  Secound_Pull,
  stopAllPullSound,
  stopAllWinSound,
  stopFirstPull,
  stopSecoundPull,
  Third_Pull,
  Try_Again,
  yellowWinPop,
} from "../../utils/gameSettings";
import "./PlayButton.css";

interface PlayButtonProps {
  currentPlayer: string;
  setIsGameRunning: (value: boolean) => void;
  setShowNotification: (value: boolean) => void;
  setMultiplier: (value: number) => void;
  setBank: (value: number) => void;
  activeBetAmount: string;
  tryAgainText: boolean;
  setIsWinPopUp: (value: boolean) => void;
  setTryAgainText: (value: boolean) => void;
  setWonAmount: (value: number) => void;
}

const PlayButton = ({
  currentPlayer,
  setIsGameRunning,
  setShowNotification,
  setMultiplier,
  setBank,
  activeBetAmount,
  setIsWinPopUp,
  setTryAgainText,
  tryAgainText,
  setWonAmount,
}: PlayButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentAnimation, setCurrentAnimation] = useState<string>(""); // Track current animation
  const { backgroundClass } = useBackground();
  const { sound } = useSound();
  const {
    socket,
    increaseBalance,
    decreaseBalance,
    userInfo,
    multiplierArray,
  } = useSocket();


  const startAction = () => {
    if (isActive) return; // Prevent duplicate start calls
    console.log("activeBetAmount", activeBetAmount);
    setIsActive(true);
    setShowNotification(false);
    setIsGameRunning(false);

    if (currentPlayer === "boy") {
      if (sound) {
        BoyPump_It();
      }
    }

    if (currentPlayer === "girl") {
      if (sound) {
        GirlPump_It();
      }
    }

    const betAmount = parseFloat(activeBetAmount);
    decreaseBalance(betAmount);

    if (activeBetAmount) {
      socket?.emit("action", `pb:${activeBetAmount}`); // Notify server of button press
    }

    if (sound) {
      First_Pull(); // TODO RESET REMIANING
    }
  };

  const stopAction = () => {
    if (!isActive) return; // Prevent duplicate stop calls

    setIsActive(false);
    setIsGameRunning(true);

    socket?.emit("action", "co"); // Notify server of button release
  };

  useEffect(() => {
    // Listen for game over events
    const handleGameOver = (data: any) => {
      setIsGameRunning(true); // Stop the game
      if (data?.matchEndWon?.result === "won") {
        setWonAmount(data.matchEndWon.won_amt);
        increaseBalance(data.matchEndWon.won_amt);

        if (sound) {
          stopAllPullSound();
          setTimeout(() => {
            if (data?.matchEndWon?.multiplier <= 2.0) {
              blueWinPop();
            } else if (data?.matchEndWon?.multiplier <= 10.0) {
              greenWinPop();
            } else if (data?.matchEndWon?.multiplier <= 20.0) {
              yellowWinPop();
            } else {
              yellowWinPop();
            }
          }, 200);
        }

        setIsWinPopUp(true);

        setTimeout(() => {
          setIsWinPopUp(false);
          setIsActive(false); // Ensure isActive is reset
          setCurrentAnimation("idle");
          backgroundClass?.changeAnimation(currentPlayer, "idle");
        }, 2000);
      } else {
        setTryAgainText(true);
        setCurrentAnimation("loss");
        backgroundClass?.changeAnimation(currentPlayer, "loss");

        if (sound) {
          stopAllPullSound();
          setTimeout(() => {
            Try_Again();
          }, 200);
        }

        setTimeout(() => {
          setTryAgainText(false);
          setIsActive(false); // Ensure isActive is reset
          setCurrentAnimation("idle");
          backgroundClass?.changeAnimation(currentPlayer, "idle");
        }, 1000);
      }
    };

    socket?.on("game_over", handleGameOver);

    return () => {
      socket?.off("game_over", handleGameOver);
    };
  }, [socket, backgroundClass, currentPlayer]);

  useEffect(() => {
    // Listen for multiplier updates
    const handleMultiplierUpdate = (data: any) => {
      if (!data) return;

      setMultiplier(data.multiplier);
      setBank(data.bank);

      let newAnimation: string = "";

      if (data.multiplier <= 2.0) {
        newAnimation = "1_easy";
      }

      if (data.multiplier > 2.0 && data.multiplier <= 10.0) {
        newAnimation = "2_medium";
        stopFirstPull();
        Secound_Pull();
      }

      if (data.multiplier > 10.0 && data.multiplier <= 20.0) {
        newAnimation = "3_hard";
        stopSecoundPull();
        Third_Pull();
      }

      if (newAnimation && newAnimation !== currentAnimation) {
        setCurrentAnimation(newAnimation);
        backgroundClass?.changeAnimation(currentPlayer, newAnimation);
      }
    };

    socket?.on("multiplier_update", handleMultiplierUpdate);

    return () => {
      socket?.off("multiplier_update", handleMultiplierUpdate);
    };
  }, [socket, currentAnimation, currentPlayer]);

  

  

  const handleWindowBlur = () => {
    if (isActive) {
      stopAction();
    }
  };

  useEffect(() => {
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isActive]);


  const handlePointerDown = (e: any) => {
    if (!currentPlayer) {
      backgroundClass?.getCharacter();
    }

    if (e.pointerType === "touch") {
      console.log("Touch Start (Pointer)");
      if (!isActive) {
        stopAllWinSound();
        startAction();
      }
      
    } else if (e.pointerType === "mouse") {
      console.log("Mouse Down (Pointer)");
      if (!isActive) {
        stopAllWinSound();
        startAction();
      }
    }
  };
  
  const handlePointerUp = (e: any) => {
    if (e.pointerType === "touch") {
      console.log("Touch End (Pointer)");
      if (isActive) stopAction();
    } else if (e.pointerType === "mouse") {
      console.log("Mouse Up (Pointer)");
      if (isActive) stopAction();
    }
  };
  
  const handlePointerLeave = (e: any) => {
    if (e.pointerType === "mouse") {
      console.log("Mouse Leave (Pointer)");
      if (isActive) stopAction();
    }
  };
  

  return (
    <button
      className="pump-button-container"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      
      disabled={
        userInfo?.bl! <= multiplierArray[0] ||
        multiplierArray.length === 0 ||
        tryAgainText
      }
      style={{
        opacity:
          userInfo?.bl! <= multiplierArray[0] ||
          multiplierArray.length === 0 ||
          tryAgainText
            ? 0.5
            : 1,
      }}
    >
      <div
        className="pump-button-wrapper"
        style={{
          animation: isActive
            ? "none"
            : "PumpWrapper01 .6s linear infinite alternate",
        }}
      ></div>
      <div
        className="pump-button-wrapper-inner"
        style={{
          animation: isActive
            ? "none"
            : "PumpWrapper01 .6s linear infinite alternate",
        }}
      ></div>
      <div
        className="pump-button"
        style={{
          backgroundImage: isActive
            ? `url('${ClickImg}')`
            : `url('${PumpImg}')`,
        }}
      ></div>
      <span className="pump-button-text" data-text="Pump">
        Pump
      </span>
    </button>
  );
};

export default PlayButton;