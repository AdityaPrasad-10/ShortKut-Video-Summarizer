import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Summary from "./components/Summary";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Footer from "./components/Footer";
// AIzaSyCasuyEhQZZcGW4ntwrApWcCC0EmfaarUs

const App: React.FC = () => {
  const [link, setLink] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [isTrans, setIstrans] = useState<boolean>(false);
  const [isLoad, setLoad] = useState<boolean>(false);
  const [erorr, setErorr] = useState<string>("");
  const [childprosess, setChildprosess] = useState<string>(" ");

  useEffect(() => {
    manageChild("BJ{bTzC.56dk`bfm5tPvwHcVd2czglHsYsl:Rl1");
  }, []);

  async function run(transcripted: string) {
    // const genAI = new GoogleGenerativeAI(childprosess);
    const genAI = new GoogleGenerativeAI(childprosess);
  
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Summarize the content in 800 words or more in two sections:
                    1. Topics covered with timestamps (each timestamp should be in the format [HH:MM:SS] give timestamps in []).
                    2. Full summary of the content in paragraphs without timestamps.
                    ${transcripted} `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setTranscript(text);
    setIstrans(true);
    setLoad(false);
    setLink("");
    // console.log(text);
  }

  function extractYouTubeVideoId(link: string): string | null {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = link.match(youtubeRegex);

    const videoId = match && match[1];

    return videoId || null;
  }

  function extractTextFromXML(xmlString: any) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, "text/xml");
    let textNodes = xmlDoc.getElementsByTagName("text");
    let result = "";

    for (let i = 0; i < textNodes.length; i++) {
      result += textNodes[i].textContent?.trim() + "\n";
    }

    return result;
  }

  const getTranscript = async (id: string) => {
    const options = {
      method: "POST",
      url: "https://http-cors-proxy.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        Origin: "www.example.com",
        "X-Requested-With": "www.example.com",
        "X-RapidAPI-Key": "28747d7182mshee9f1794b624a29p174df5jsn6c80cf169e4a",
        "X-RapidAPI-Host": "http-cors-proxy.p.rapidapi.com",
      },
      data: {
        url: `https://youtubetranscript.com/?server_vid2=${id}`,
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response);
      // console.log(response.data);

      // console.log(childprosess);
      return extractTextFromXML(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function manageChild(encodedText: string) {

    let decodedText = "";
    for (let i = 0; i < encodedText.length; i++) {
      const charCode = encodedText.charCodeAt(i) - 1;
      decodedText += String.fromCharCode(charCode);
    }
    setChildprosess(decodedText);
    return decodedText;
  }

  const handilSubmit = async (e: any) => {
    e.preventDefault();
    if (link == "") return;
    // console.log(childprosess);
    setLoad(true);
    const videoId: string | null = extractYouTubeVideoId(link);
    if (videoId == null) {
      setErorr("you entered Wrong");
      setLoad(false);
    } else {
      setErorr("");

      // isYouTubeVideoAvailable(videoId)

      let transcripted: string | undefined = await getTranscript(videoId);
      if (transcripted != undefined) {
        // setTranscript(transcripted)
        run(transcripted);
      }
    }
  };

  return (
    <div
      className="leading-normal tracking-normal text-indigo-400 pb-5 bg-cover bg-fixed bg-[url('/header.png')] "
      style={{ minHeight: "100vh" }}
    >
      <NavBar />
      <Hero
        erorr={erorr}
        isLoad={isLoad}
        link={link}
        setlink={setLink}
        submit={handilSubmit}
      />
      <Summary isTrans={isTrans} transcript={transcript} />
      
      <Footer />
    </div>
  );
};

export default App;