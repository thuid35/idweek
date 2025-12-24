'use client';

import React, { useState, useEffect, useRef } from 'react';
import ddd from './3dprinting.module.css';
import Image from 'next/image';

export default function ThreeDPrintingPage() {
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isOneVisible, setIsOneVisible] = useState(false);
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

  return (
    <div className={ddd.container}>
      {/* COVER Space */}
      <div className={ddd.cover_container}>
        <div className={ddd.cover_image_container}>
          <Image src="/images/intro_3d/cover/3dprinter.png" alt="3D Printing Cover" fill objectFit='cover' className={ddd.sway_animation}/>
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
          <Image src="/images/intro_3d/cover/3dline.png" alt="3D Printing Cover" fill objectFit='cover'/>
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
      </div>
      {/* CONTENT Intro Space End*/}
      {/* CONTENT One Space */}
      <div className={ddd.content_one_container}>
        <div className={ddd.hor_line} style={{ top: '140px', width: '100%', left:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '315px', width: '40%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '465px', width: '40%', right:0 }}></div>
        <div className={ddd.hor_line} style={{ top: '515px', width: '40%', right:0 }}></div>
        <div className={ddd.content_one_box1_image_container}>
          <Image src="/images/intro_3d/content/one/fusion.png" alt="Mod" fill objectFit='cover'/>
        </div>
        <div className={ddd.content_one_box1_title_container}>
          <div className={ddd.content_one_box1_title_container_number}>01</div>
          <div className={ddd.content_one_box1_title_container_box}>
            <p className={ddd.content_one_box1_title}>建模</p>
            <p className={ddd.content_one_box1_title_sub}>使用建模軟體(如 : blender、fusion、rhino等)建出模型，轉存STL檔案即可送印。</p>
          </div>
        </div>
      </div>
      {/* CONTENT One Space End*/}
    </div>
  );
}
