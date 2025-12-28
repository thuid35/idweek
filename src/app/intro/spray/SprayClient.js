'use client';

import React, { useState, useEffect, useRef } from 'react';
import ddd from './spray.module.css';
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
          <Image src="/images/intro_spray/cover/twocans.png" alt="Spray Cover" fill style={{ objectFit: 'cover' }} className={ddd.sway_animation}/>
        </div>
        {/* COVER - TITLE Space */}
        <div className={ddd.cover_title_container}>
          <div className={ddd.cover_title}>
            <h1 className={ddd.cover_title_text}>關於</h1>
            <h1 className={ddd.cover_title_text}>噴漆</h1>
          </div>
          <div className={ddd.cover_subtitle}>
            <h2 className={ddd.cover_subtitle_text}>製作模型時上色的步驟，除了「噴」我們還會...</h2>
          </div>
        </div>
        {/* COVER - TITLE Space End*/}
        <div className={ddd.cover__late_image_container} style={{ top: '480px', left: '0px', width: '126px', height: '178px' }}>
          <Image src="/images/intro_spray/cover/can1.png" alt="Spray Cover" fill style={{ objectFit: 'cover' }}/>
        </div>
      </div>
      {/* COVER Space End*/}
      {/* CONTENT Intro Space */}
      <div className={`${ddd.content_intro_container} ${isIntroVisible ? ddd.visible : ''}`} ref={introRef}>
        <div className={ddd.content_intro_box1}>
          <div className={ddd.content_intro_box1_box1}>
            <p className={ddd.content_intro_box1_box1_title}>在亮眼之前，<br/>得先經過漫長的磨練</p>
          </div>
        </div>
        <div className={ddd.content_intro_box2}>
          <div className={ddd.content_intro_box2_box1}>
            <p className={ddd.content_intro_box2_box1_title}>當模型的形體成形後，還需要一段漫長的「打磨」旅程。砂磨、補土與噴漆組成了三個最不起眼、卻最費工的步驟。<br/><br/>正是這些反覆的細節累積，讓模型真正變得完整。</p>
          </div>
        </div>
        <div className={ddd.cover__late_image_container} style={{ top: '-60px', right: '90px', width: '100px', height: '200px' }}>
          <Image src="/images/intro_spray/cover/can2.png" alt="Spray Cover" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.cover__late_image_container} style={{ top: '280px', left: '-10px', width: '100px', height: '200px' }}>
          <Image src="/images/intro_spray/cover/can3.png" alt="Spray Cover" fill style={{ objectFit: 'cover' }}/>
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

        
        <div className={ddd.hor_line} style={{ top: '715px', width: '90%', right:0 }}></div>
        <div className={ddd.ver_line} style={{ top: '715px', height: '180px', right:'353px' }}></div>
        <div className={ddd.ver_line} style={{ top: '200px', height: '266px', right:'200px' }}></div>
        
        <div className={ddd.content_one_box1_image_container}>
          <Image src="/images/intro_spray/content/c1.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.content_title_container} style={{ top: '40px', right: '50px' }}>
          <div className={ddd.content_title_container_number}>01</div>
          <div className={ddd.content_title_container_box} style={{ height: '220px' }}>
            <p className={ddd.content_title}>打磨</p>
            <p className={ddd.content_title_sub}>為​了​使​模型​的​表面​更​光滑、​質感​更​好，​會​使用​砂紙將列​印好​的​磨型​打磨，​不同​的​材質​列印打磨​所​花費時間​與力氣​也​不同。</p>
          </div>
        </div>
        <div className={ddd.content_three_txt} style={{ top: '220px', right: '50px' }}>
          如果​是​用​FDM、​PLA​等​材質，​建議​從​150號​砂紙​打磨​至​600~800號砂紙；​若模型​使用​光固化​列印，​可以​從400號砂紙開始磨​至​800號砂紙。
        </div>
        <div className={ddd.paper_container} style={{ top: '400px', left: '-60px' ,rotate: '-20deg'}}>
          <Image src="/images/paper/paper1.png" alt="Paper" fill style={{ objectFit: 'cover' }}/>
          <div className={ddd.paper_container_text} style={{ rotate: '8deg' }}>{randomTexts[0]}</div>
        </div>
        <div className={ddd.paper_container} style={{ top: '720px', right: '10px', width: '280px', height: '230px', zIndex: 2}}>
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
          <Image src="/images/intro_spray/content/c2.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.content_title_container} style={{ top: '40px', left: '50px' }}>
          <div className={ddd.content_title_container_number}>02</div>
          <div className={ddd.content_title_container_box} style={{ height: '240px' }}>
            <p className={ddd.content_title}>補土</p>
            <p className={ddd.content_title_sub}>補起​表面​上​的​小洞​使​質感​更​好，​常用​的​有​汽車​補土與蝴蝶​補土。​汽車補​土用​於微小​的​瑕疵，​不​用​加入​硬化劑，​但​會溶解​噴漆，​所以​一定​要​在​噴漆​前​使用​! ​蝴蝶補土​需要​硬化劑，​但​可以​補範​圍​較大​的​瑕疵。​</p>
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
          <Image src="/images/intro_spray/content/c3.png" alt="Mod" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={ddd.content_title_container} style={{ top: '40px', right: '50px' }}>
          <div className={ddd.content_title_container_number}>03</div>
          <div className={ddd.content_title_container_box} style={{ height: '270px' }}>
            <p className={ddd.content_title}>噴漆</p>
            <p className={ddd.content_title_sub}>一定​ !​ 絕對 ! ​要​少量​多​次​噴 ​! 否則​你​積漆流​的​眼淚​會變成​你​流​的​眼淚​！​</p>
          </div>
        </div>
        <div className={ddd.content_three_txt}>
          當​噴漆​上​模型​一眼​就​能​看​出模型​在​先前​有​沒​有​被​細緻​處理(​打磨​與​補土​的​步驟​)​ 別抱著僥倖心態​想​用​噴漆​補​起​小​凹洞，​積漆​後​要​從​打磨​開始重新​處裡…
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