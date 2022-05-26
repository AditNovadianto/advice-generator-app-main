import { useEffect, useState } from "react";
import patternDividerDesktop from "./images/pattern-divider-desktop.svg";
import patternDividerMobile from "./images/pattern-divider-mobile.svg";
import iconDice from "./images/icon-dice.svg";

const App = () => {
  const [advice, setAdvice] = useState();
  const [get, setGet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState();

  const getAdvice = async () => {
    if (loading === true) {
      setLoading(true);

      const response = await fetch("https://api.adviceslip.com/advice");

      const data = await response.json();

      setAdvice(data);

      setLoading(false);
    }

    if (loading === false) {
      setAnimate(true);

      const response = await fetch("https://api.adviceslip.com/advice");

      const data = await response.json();

      setAdvice(data);

      setAnimate(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, [get]);

  const changeAdvice = () => {
    setGet(!get);
  };

  console.log(advice);

  return (
    <div className="flex items-center md:px-0 px-10 min-h-screen justify-center bg-Dark-Blue">
      {loading && (
        <div className="lds-roller transition-all">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {!loading && (
        <main>
          <div className="md:w-[60%] xl:w-[500px] lg:w-[40%] w-full m-auto flex flex-col items-center justify-center p-10 rounded-xl h-max bg-Dark-Grayish-Blue">
            <div className="w-full py-3">
              <h1 className="font-Manrope text-sm pb-3 text-center text-Neon-Green uppercase tracking-[2px] font-normal">
                Advice #{advice?.slip.id}
              </h1>
              <p className="font-Manrope text-center text-3xl mt-5 text-Light-Cyan">
                “{advice?.slip.advice}”
              </p>
            </div>

            <img
              className="mt-5 mb-10"
              src={patternDividerDesktop}
              alt="pattern-divider-desktop"
            />

            <button
              onClick={changeAdvice}
              className={`p-5 -mb-[70px] shdw transition-all duration-500 bg-Neon-Green rounded-full`}
            >
              <img
                className={`${
                  animate ? "rotate-[270deg]" : "rotate-0"
                } transition-all duration-500`}
                src={iconDice}
                alt="icon-dice"
              />
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
