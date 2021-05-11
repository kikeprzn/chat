import React from "react";
import "./styles.css";
const words = [
  "Google",
  "Facebook",
  "Airbnb",
  "Instagram",
  "Youtube",
  "Twitter",
  "Netlify",
  "Vercel",
  "Microsoft",
  "Mozilla",
  "Githun",
  "Gitlab",
  "Wordpress",
  "keybr",
  "wa",
  "Amazon",
  "Epic",
];
function WordsAnimation() {
  const ref = React.useRef();

  const handleAnimation = () => {
    const num = ref.current.getBoundingClientRect(0).width;
    // const final_num = Math.round((num + Number.EPSILON) * 100) / 100 / 2;
    const final_num = num / 2;
    ref.current.style.setProperty("--x", "-" + final_num + "px");

    // ref.current.animate(
    //   [
    //     // keyframes
    //     { transform: `translateX(-${final_num}px)` },
    //   ],
    //   {
    //     // timing options
    //     duration: 70000,
    //     iterations: Infinity,
    //   }
    // );
  };

  React.useEffect(() => {
    handleAnimation();
  });

  return (
    <>
      <div className="wa__container" id="animation_root">
        <div ref={ref} className="wa__words_container" id="words_container_id">
          {words.map((word, index) => (
            <span className="wa__word_span_style" key={index}>
              {word}
            </span>
          ))}
          {words.map((word, index) => (
            <span className="wa__word_span_style" key={index}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default WordsAnimation;
