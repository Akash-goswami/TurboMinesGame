import React, { useState, useEffect } from "react";
import "./MainGame.css";
import BlastImg01 from "/public/FIRE/1.png";
import BlastImg02 from "/public/FIRE/2.png";
import BlastImg03 from "/public/FIRE/3.png";
import BlastImg04 from "/public/FIRE/4.png";
import BlastImg05 from "/public/FIRE/5.png";
import BlastImg06 from "/public/FIRE/6.png";
import BlastImg07 from "/public/FIRE/7.png";
import BlastImg08 from "/public/FIRE/8.png";
import BlastImg09 from "/public/FIRE/9.png";
import BlastImg10 from "/public/FIRE/10.png";
import BlastImg11 from "/public/FIRE/11.png";
import BlastImg12 from "/public/FIRE/12.png";
import BlastImg13 from "/public/FIRE/13.png";
import BlastImg14 from "/public/FIRE/14.png";
import BlastImg15 from "/public/FIRE/15.png";

const images: string[] = [
  BlastImg01, BlastImg02, BlastImg03, BlastImg04, BlastImg05,
  BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10,
  BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15,
];

const MainGame: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(true);
  const [clickedTiles, setClickedTiles] = useState<boolean[]>(() => {
    const savedTiles = localStorage.getItem("clickedTiles");
    return savedTiles ? JSON.parse(savedTiles) : Array(9).fill(false);
  });
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
  const [isAllTilesDisabled, setIsAllTilesDisabled] = useState<boolean>(false);



  useEffect(() => {
    let interval: any;
    if (clickedIndex !== null) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex < images.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            setIsAnimationComplete(true);
            return prevIndex;
          }
        });
      }, 35);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clickedIndex]);



  const getTileClass = (index: number): string => {
    if (clickedTiles[index]) {
      if (index < 4) {
        return "_diamondBlue";
      } else if (index >= 4 && index < 7) {
        return "_diamondGreen";
      } else {
        return "_bomb";
      }
    }
    return "";
  };
  const resetGame = () => {
    setTimeout(() => {
      setClickedTiles(Array(9).fill(false)); // Reset clicked tiles
      setClickedIndex(null); // Reset clicked index
      setCurrentImageIndex(0); // Reset animation index
      setIsAnimationComplete(false); // Reset animation state
      setIsAllTilesDisabled(false); // Enable all tiles again
      setIsGameStarted(false); // Reset the game start state
  
      // Clear local storage during game reset
      localStorage.clear();
    }, 3000); // 3 seconds delay
  };

  const handleTileClick = (index: number): void => {
    if (clickedTiles[index] || isAllTilesDisabled) return; // Prevent clicking already clicked tiles or disabled tiles
  
    // Mark the clicked tile and start animation for the blast image
    setClickedIndex(index);
    setCurrentImageIndex(0);
    setIsAnimationComplete(false);
  
    setClickedTiles((prevTiles) => {
      const updatedTiles = [...prevTiles];
      updatedTiles[index] = true; // Mark this tile as clicked
  
      // Save the updated tiles to local storage
      localStorage.setItem("clickedTiles", JSON.stringify(updatedTiles));
      return updatedTiles;
    });
  
    // If bomb tile is clicked, clear local storage and disable all tiles
    if (index >= 7) {
      console.log("Bomb tile clicked, clearing clickedTiles from localStorage...");
      localStorage.removeItem("clickedTiles"); // Remove clickedTiles
      localStorage.setItem("bombClicked", "true"); // Set bomb clicked flag
      setIsAllTilesDisabled(true); // Disable all tiles
      resetGame(); // Reset the game
    }
    
    
  };


  const shouldShowBlastImage = (index: number): boolean => {
    return clickedTiles[index] && getTileClass(index) === "_bomb" && !isAnimationComplete;
  };
  useEffect(() => {
    const savedTiles = localStorage.getItem("clickedTiles");
    if (savedTiles) {
      setClickedTiles(JSON.parse(savedTiles));
    }
  }, []);
  useEffect(() => {
    const bombClicked = localStorage.getItem("bombClicked");
    console.log("Checking bombClicked flag on page load:", bombClicked);
    if (bombClicked === "true") {
      console.log("Bomb was clicked before refresh. Resetting the game...");
      resetGame();
      console.log("Game reset complete. Clearing bombClicked flag...");
      localStorage.removeItem("bombClicked");
    }
  }, []);

  return (
    <div className="template__game">
      <div className="game">
        <div className={`game__grid _3x3 ${isGameStarted ? "" : "_disabled"}`}>
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`game__item ${getTileClass(index)} ${
                isAllTilesDisabled && !clickedTiles[index] ? "gameOver_disabled" : ""
              }`}
              onClick={() => handleTileClick(index)}
            >
              <div className="game__item-layout1">
                <div className="game__item-layout2">
                  {shouldShowBlastImage(index) ? (
                    <div className="game__item-layout3">
                      <img
                        src={images[currentImageIndex]}
                        alt={`Blast Image ${currentImageIndex + 1}`}
                        className="animated__image"
                      />
                    </div>
                  ) : (
                    clickedIndex === index && <div className="game__item-layout3"></div>
                  )}
                  <div className="game__item-sum">$122</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainGame;
