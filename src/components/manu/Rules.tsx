import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useBackground } from "../../context/backgroundClassProvider";
import "./Manu.css";
import "./Rules.css";

const Rules: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const { setActiveComponent, setMenuOpen, menuOpen } = useBackground();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(now);

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentDateTime(`${formattedDate} | ${formattedTime}`);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const TogaleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveComponent("menu");
  };

  return (
    <div className="Rules-container">
      <div className="Rules-container-header">
        <span
          className="zoomIcon"
          onClick={() => setActiveComponent("menu")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
          }}
        >
          <IoIosArrowBack />
          <span
            style={{
              fontSize: "14px",
            }}
          >
            Back
          </span>
        </span>
        <div>Rules</div>
        <RxCross2 onClick={TogaleMenu} className="rules-cross zoomIcon" />
      </div>
      <div className="Rules-container-body">
        <div className="Rules-container-body-box01">
          <ul>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule0");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>How to Play?</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule1");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Game Details</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule2");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Settings</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule3");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Disconnection Policy</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule4");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Version</li>
            </a>
          </ul>
        </div>
        <div className="Rules-container-body-box02">
          <div className="how-to-Play" id="rule0">
            <h2>How to Play?</h2>
            <ul>
              <li>Select a character</li>
              <li>Place your bet</li>
              <li>
                Hold down the "PUMP" button and pump the muscles until the
                coefficient reaches your desired target
              </li>
              <li>
                Claim your winnings by releasing the button before the character
                gets tired
              </li>
            </ul>
            <p>
              The longer you pump the muscles, the bigger your winnings will be.
              Keep in mind that the character can get tired at any moment. If
              you don’t claim your winnings before the character gets tired, you
              will lose your bet.
            </p>
          </div>
          <div className="Game_Details" id="rule1">
            <h2>Game Details</h2>
            <h6>Place Bet</h6>
            <p>
              Select the bet amount under the "PUMP" button and hold down the
              "PUMP" button to start your athletic earnings!
            </p>
            <h6>Cash Out</h6>
            <p>
              Release the "PUMP" button at any moment during the exercise before
              the character gets tired. The bet amount will be multiplied by the
              coefficient at the time of the stop, and this athletic approach
              will be completed.
              <br />
              The winning amount is rounded to two decimal places.
            </p>
            <h6>Min & Max Multiplier</h6>
            <p>
              The minimum winning coefficient is x1.01.
              <br />
              The maximum winning coefficient is x100.00. However, the maximum
              winnings are limited by the operator. You can review it in the
              "Limits" section in the settings menu.
            </p>
            <h6>Ping</h6>
            <p>
              Ping is the delay between your device and the game servers.
              <br />
              <br />
              If the ping exceeds 5000 ms, playing is not recommended as the
              displayed game situation will lag 5 seconds behind the actual
              situation.
            </p>
            <h6>RTP</h6>
            <p>
              The game is based on a coefficient called "RTP" (Return to
              Player), which is a statistical <br /> average of payouts over
              billions of rounds. <br />
              In PumpedX, the RTP is 96.0%
            </p>
          </div>
          <div className="Settings" id="rule2">
            <h2>Settings</h2>
            <p>
              Click on the icon with three sliders in the upper right corner of
              the screen to open the settings menu. In the settings, you can:
            </p>
            <ul>
              <li>view your username</li>
              <li>
                view betting limits: minimum bet, maximum bet, and maximum
                profit
              </li>
              <li>enable/disable sounds</li>
              <li>view your betting history</li>
            </ul>
            <p>
              You can also change your character on the main game screen using
              the slider located on the right. <br />
              Similarly, the mute button is located on the main screen to the
              left of the settings button.
            </p>
          </div>
          <div className="Disconnection_Policy" id="rule3">
            <h2>Disconnection Policy</h2>
            <p>
              We prioritize the safety and satisfaction of our players, even in
              cases of unexpected internet disconnections. Here's how we handle
              such situations:
            </p>
            <ul>
              <li>
                If a player's internet connection is lost during active
                gameplay, the placed bets will remain active.
              </li>
              <li>
                In the rare event that our server experiences issues, we have a
                policy to refund all bets placed during the affected game
                rounds. The full bet amount will be returned to the player's
                balance.
              </li>
            </ul>
          </div>
          <div className="Version" id="rule4">
            <h2>Version</h2>
            <p>
              Game Version: "1.0.0" <br />
              {/* RNG version: "2.0.0" */}
            </p>
          </div>
        </div>
      </div>
      <div
        className="footer-container"
        style={{
          fontSize: "10px",
        }}
      >
        <div>PumpedX | Version: "1.0.0"</div>
        <div>
          {`${new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
            .format(new Date())
            .replace(
              /(\d{2}) (\w{3}) (\d{4})/,
              "$1 $2, $3"
            )} | ${new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}`}
        </div>
      </div>
    </div>
  );
};

export default Rules;
