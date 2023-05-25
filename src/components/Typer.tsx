import React from "react"
import { useEffect, useState } from "react";
import { isArray } from "sanity";

type Props = {
  words?: string[];
  delay?: number;
  className: React.HTMLAttributes<HTMLDivElement>["className"]
};



const useWords = (wordsArr:string[]) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(wordsArr[0])
  const goToNextWord = (callback: (newWord:string) => void) => {
    setCurrentWordIndex(prevCurrIdx => {
      const newWordIndex = prevCurrIdx + 1 === wordsArr.length 
      ? 0
      : prevCurrIdx + 1

      const newWord = wordsArr[newWordIndex]
      setCurrentWord(newWord)
      callback(newWord)
      return newWordIndex
    })

  }
  return { currentWordIndex, currentWord, goToNextWord }
}


const useWriter = (str: string, delay: number, decorator = " |") => {
  const [word, setWord] = useState("");
  const writingDelay = delay * 0.3;
  const idlingDelay = delay * 0.4;
  const erasingDelay = delay * 0.3;

  const writingTime = writingDelay;
  const idlingTime = idlingDelay + writingDelay;
  const erasingTime = writingDelay + idlingDelay + erasingDelay;
  const delayPerLetter = erasingDelay / str?.length

  
  
  const startTyping = (str:string) => {
    const write = () => {
      let i = 0
      const intervalId = setInterval(() => {
        const strCopy = str
        setWord(strCopy.slice(0, i) + decorator)
        if(i === str.length) {
          clearInterval(intervalId)
          i = 0
        }
        i++
      }, delayPerLetter)
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const idle = () => {}
    const erase = () => {
      let i = str.length
      const intervalId = setInterval(() => {
        const strCopy = str
        setWord(strCopy.slice(0, i) + decorator)
        if(i === 0) {
          clearInterval(intervalId)
          i = str.length
        }
        i--
      }, delayPerLetter)
    }
  
    const writeTimoutId = setTimeout(() => {
      write()
     clearTimeout(writeTimoutId)

    }, writingTime)
     
    const idleTimoutId = setTimeout(() => {
      idle()
      clearTimeout(idleTimoutId)
    }, idlingTime)
    const eraseTimoutId = setTimeout(() => {
      erase()
      clearTimeout(eraseTimoutId)
    }, erasingTime)
  }

  return { typed: word, startTyping };
};
export default function Typer(props: Props) {
  const { 
    words: propsWords, 
    delay = 5000,
    className
  } = props;

  if(!propsWords) return null
  if(propsWords?.length === 0) return null
  if(propsWords?.some(e => typeof e !== "string")) return null
  if(!isArray(propsWords)) return null
  
  const { goToNextWord, currentWord } = useWords(propsWords);
  const { typed, startTyping } = useWriter(currentWord, delay);

  useEffect(() => {
    startTyping(propsWords[0])
    const intervalId = setInterval(() => goToNextWord(startTyping), delay);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={className}>{typed}</div>

    );
}
