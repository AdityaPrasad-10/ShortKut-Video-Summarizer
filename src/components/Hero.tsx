import { useState, useEffect } from 'react';

interface Props {
  link: string;
  setlink: (value: string) => void;
  submit: (e: any) => void;
  isLoad: boolean;
  erorr: string;
}

function Hero({ link, setlink, submit, isLoad, erorr }: Props) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const handleSubmit = (e: any) => {
    setStartTime(Date.now()); 
    submit(e);
  };


  useEffect(() => {
    if (!isLoad && startTime) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000; 
      setElapsedTime(timeTaken);
    }
  }, [isLoad, startTime]);

  return (
    <div>
      <div className="font-sans container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
       
        <div className="flex flex-col w-full xl:w-2/2 justify-center lg:items-center overflow-y-hidden">
          <p className="leading-normal text-base md:text-2xl text-white text-center md:text-left">
            A quick access tool to help you understand long form videos better
          </p>
          <h1 className="my-1 text-3xl md:text-6xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Paste Link -
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Summarize -
            </span>
            Understand
          </h1>

          <p className="leading-normal text-base md:text-base font-thin text-white mb-8 mt-1 tracking-widest text-center md:text-left">
            This service provides video summaries, not subtitles or transcripts.
          </p>

          <form
            onSubmit={(e: any) => handleSubmit(e)}
            className="bg-gray-900 opacity-75 xl:w-2/6 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <input
                className="shadow appearance-none border mt-5 rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                onChange={(e) => setlink(e.target.value)}
                type="text"
                placeholder="Enter Youtube Link"
                value={link}
              />
            </div>
            <div className="flex items-center place-content-center justify-between pt-2">
              <button
                className="bg-gradient-to-r mx-auto from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 w-full rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="submit"
              >
                {!isLoad ? (
                  'Summarize'
                ) : (
                  <>
                    <div className="loader place-content-center">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                    <p>Analyzing...</p>
                  </>
                )}
              </button>
            </div>
            <p className="text-red-500 text-center">{erorr}</p>
          </form>

         
          {!isLoad && elapsedTime > 0 && (
            <p className="text-white text-center">Time taken: {elapsedTime.toFixed(2)} seconds</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;

