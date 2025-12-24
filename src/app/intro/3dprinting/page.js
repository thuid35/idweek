'use client';

import React, { useState, useEffect, useRef } from 'react';
import ddd from './3dprinting.module.css';
import Image from 'next/image';
import textData from './texts.json';

export default function ThreeDPrintingPage() {
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isOneVisible, setIsOneVisible] = useState(false);
  const [randomTexts, setRandomTexts] = useState([]);
  const introRef = useRef(null);
  const oneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntroVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (introRef.current) observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOneVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (oneRef.current) observer.observe(oneRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (textData && textData.length > 0) {
      // Shuffle array and pick first 2 (or more)
      const shuffled = [...textData].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10); // Pick top 5 for usage
      setRandomTexts(selected);
    }
  }, []);

  return (
    <div className={ddd.container}>
      {/* COVER Space */}
      <div className={ddd.cover_container}>
        <div className={ddd.cover_image_container}>
          <Image src="/images/intro_3d/cover/3dprinter.png" alt="3D Printing Cover" fill style={{ objectFit: 'cover' }} className={ddd.sway_animation}/>
        </div>
        {/* COVER - TITLE Space */}
        <div className={ddd.cover_title_container}>
          <div className={ddd.cover_title}>
            <h1 className={ddd.cover_title_text}>關於</h1>
            <h1 className={ddd.cover_title_text_pressed}>3D</h1>
            <h1 className={ddd.cover_title_text}>列印</h1>
          </div>
          <div className={ddd.cover_subtitle}>
            <h2 className={ddd.cover_subtitle_text}>將數位模型，一層一層堆疊成實體物件的製造方式。</h2>
          </div>
        </div>
        {/* COVER - TITLE Space End*/}
        <div className={ddd.cover__late_image_container}>
          <Image src="/images/intro_3d/cover/3dline.png" alt="3D Printing Cover" fill style={{ objectFit: 'cover' }}/>
        </div>
      </div>
      {/* COVER Space End*/}
      {/* CONTENT Intro Space */}
      <div className={`${ddd.content_intro_container} ${isIntroVisible ? ddd.visible : ''}`} ref={introRef}>
        <div className={ddd.content_intro_box1}>
          <div className={ddd.content_intro_box1_box1}>
            <p className={ddd.content_intro_box1_box1_title}>從數位檔案<br/>到可被觸摸的實體</p>
          </div>
        </div>
        <div className={ddd.content_intro_box2}>
          <div className={ddd.content_intro_box2_box1}>
            <p className={ddd.content_intro_box2_box1_title}>在模型真正被觸摸之前，它先存在於螢幕裡。從建模、切片到列印，3D 列印的三個步驟，讓想像逐層成形。<br/><br/>這是一段把數位轉化為實體的過程，也為後續的表面處理與噴漆奠定基礎。</p>
          </div>
        </div>
        <div className={ddd.cover__late_image_container} style={{ top: '-60px', right: '90px', width: '100px', height: '100px' }}>
          <Image src="/images/intro_3d/cover/item1.png" alt="3D Printing Cover" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.cover__late_image_container} style={{ top: '280px', left: '-50px', width: '200px', height: '200px' }}>
          <Image src="/images/intro_3d/cover/line2.png" alt="3D Printing Cover" fill style={{ objectFit: 'cover' }}/>
        </div>
      </div>
      {/* CONTENT Intro Space End*/}
      {/* CONTENT One Space */}
      <div className={ddd.content_one_container}>
        <div className={ddd.hor_line} style={{ top: '140px', width: '100%', left:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '315px', width: '40%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '465px', width: '80%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '515px', width: '80%', right:0 }}></div>
        <div className={ddd.ver_line} style={{ top: '200px', height: '180px', right:'200px' }}></div>

        <div className={ddd.hor_line} style={{ top: '815px', width: '80%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '715px', width: '90%', right:0 }}></div>
        <div className={ddd.ver_line} style={{ top: '715px', height: '180px', right:'353px' }}></div>
        <div className={ddd.ver_line} style={{ top: '200px', height: '180px', right:'200px' }}></div>
        
        <div className={ddd.content_one_box1_image_container}>
          <Image src="/images/intro_3d/content/one/fusion.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.content_title_container} style={{ top: '40px', right: '50px' }}>
          <div className={ddd.content_title_container_number}>01</div>
          <div className={ddd.content_title_container_box}>
            <p className={ddd.content_title}>建模</p>
            <p className={ddd.content_title_sub}>使用建模軟體 (如 : blender、fusion、rhino等) 建出模型，轉存STL檔案即可送印。</p>
          </div>
        </div>
        <div className={ddd.paper_container} style={{ top: '300px', left: '-60px' }}>
          <Image src="/images/paper/paper1.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '8deg' }}>{randomTexts[0]}</div>
        </div>
        <div className={ddd.content_one_box2_image_container}>
          <Image src="/images/intro_3d/content/one/image_card1.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.paper_container} style={{ top: '720px', left: '10px', width: '280px', height: '230px', zIndex: 2}}>
          <Image src="/images/paper/paper2.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '12deg' }}>{randomTexts[1]}</div>
        </div>
      </div>
      {/* CONTENT One Space End*/}
      {/* CONTENT Two Space */}
      <div className={ddd.content_two_container}>
        <div className={ddd.hor_line} style={{ top: '140px', width: '100%', left:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '315px', width: '40%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '465px', width: '80%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '515px', width: '80%', right:0 }}></div>
        <div className={ddd.ver_line} style={{ top: '100px', height: '180px', right:'200px' }}></div>
        <div className={ddd.ver_line} style={{ top: '500px', height: '180px', right:'200px' }}></div>
        <div className={ddd.content_two_box1_image_container}>
          <Image src="/images/intro_3d/content/two/sh.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.content_title_container} style={{ top: '40px', left: '50px' }}>
          <div className={ddd.content_title_container_number}>02</div>
          <div className={ddd.content_title_container_box} style={{ height: '240px' }}>
            <p className={ddd.content_title}>切片</p>
            <p className={ddd.content_title_sub}>將3D的建模轉換為2D的語言讓機器讀取的過程。因為機器列印時是圖層疊起的方式列印，可以將切片想像成將3D切成2D圖層的過程。</p>
          </div>
        </div>
        <div className={ddd.paper_container} style={{ top: '400px', left: '-60px', width: '280px', height: '230px' , rotate: '-20deg' }}>
          <Image src="/images/paper/paper2.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '12deg' }}>{randomTexts[2]}</div>
        </div>
        <div className={ddd.paper_container} style={{ top: '620px', right: '50px', width: '280px', height: '230px', zIndex: 2 }}>
          <Image src="/images/paper/paper3.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '13deg' }}>{randomTexts[3]}</div>
        </div>
      </div>
      {/* CONTENT Two Space End*/}
      {/* CONTENT Three Space */}
      <div className={ddd.content_three_container}>
        <div className={ddd.hor_line} style={{ top: '140px', width: '100%', left:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '315px', width: '40%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '515px', width: '100%', right:0 }}></div>
        <div className={ddd.ver_line} style={{ top: '100px', height: '180px', right:'200px' }}></div>
        <div className={ddd.ver_line} style={{ top: '515px', height: '480px', right:'200px' }}></div>
        <div className={ddd.hor_line} style={{ top: '1000px', width: '100%', right:0 }}></div>
        <div className={ddd.content_three_box1_image_container}>
          <Image src="/images/intro_3d/content/three/printing.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.content_title_container} style={{ top: '40px', right: '50px' }}>
          <div className={ddd.content_title_container_number}>03</div>
          <div className={ddd.content_title_container_box} style={{ height: '270px' }}>
            <p className={ddd.content_title}>列印</p>
            <p className={ddd.content_title_sub}>根據列印​的​材質​不同，​成型​原理、​精細度、​成本、​材料​和​後處理​也​不同，​這邊​簡單​以​FD​M​與光固化​舉例。​FDM​是​將線​材融化從​噴嘴​擠出​成型，​精細​度​較低、​後續​處理​較麻煩，​但​成本​較低。​</p>
          </div>
        </div>
        <div className={ddd.content_three_txt}>
          光固化​全​名​光敏樹脂固化，​是​使用​紫外​線​光源​照射液​態​樹脂，​使其​逐層固化​的​列印​方式。​精細​程度​高，​表面​平滑，​後續​處裡較​簡單，​但​成本​較高。​
        </div>
        <div className={ddd.paper_container} style={{ top: '400px', right: '-60px', width: '280px', height: '230px' , rotate: '-20deg' }}>
          <Image src="/images/paper/paper1.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '12deg' }}>{randomTexts[4]}</div>
        </div>
        <div className={ddd.paper_container} style={{ top: '860px', right: '10px', width: '280px', height: '230px' }}>
          <Image src="/images/paper/paper3.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '12deg' }}>{randomTexts[5]}</div>
        </div>
        <div className={ddd.paper_container} style={{ top: '600px', left: '-60px', width: '280px', height: '280px' , rotate: '-20deg' }}>
          <Image src="/images/paper/paper4.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '-20deg' }}>{randomTexts[6]}</div>
        </div>
      </div>
      {/* CONTENT Three Space End*/}
    </div>
  );
};