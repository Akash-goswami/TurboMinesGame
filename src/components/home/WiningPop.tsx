import React from 'react'
import "./WiningPop.css"

function WiningPop() {
  return (
    <div className='winingPop_Container'>
        <div
              className={`game__item _diamondBlue`} 
            //   onClick={() => handleTileClick(index)}
            >
              <div className="game__item-layout1">
                <div className="game__item-layout2 winPop_grid">
                    <div
                    style={{
                        fontWeight:'bold',
                        fontSize:'28px'
                    }}
                    >YOU WIN!</div>
                    <div
                    style={{
                        fontWeight:'bold',
                        fontSize:'26px'
                    }}
                    >1.22</div>
                 <div className='border_Multiplyer'>
                    <div>Multiplier</div>
                    <div style={{
                        fontWeight:'bold'
                    }}>x1.22</div>
                 </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default WiningPop
