import { Carousel } from 'antd';
import React from 'react';
import '../css/Slider.css';
export default function Slider() {
   
    return(
        <div >
            <Carousel style={{margin:'15px'}} autoplay className="slider-1">
            <div >
              <h3 >
                <img src="img/slider-1.png" alt="123"/>
             </h3>
            </div>
            <div>
              <h3 >
                <img src="img/slider-1.png" alt="123"/>
              </h3>
            </div>
            <div>
              <h3 >
                <img src="img/slider-1.png" alt="123"/>
              </h3>
            </div>
            <div>
              <h3 >
                <img src="img/slider-1.png" alt="123"/>
              </h3>
            </div>
          </Carousel>
          
        </div>
    );
}