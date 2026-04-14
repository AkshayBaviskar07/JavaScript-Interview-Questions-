import './App.css'
import {useEffect, useRef, useState} from 'react'

const OTP_DIGIT_COUNT = 5;

const App = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const [generateOtp, setGenerateOtp] = useState(0);
  const ref = useRef([]);

  useEffect(() => {
    ref.current[0]?.focus();
  }, [generateOtp]);

  const handleOnChange = (value, index) => {
    if(isNaN(value)) return;

    const newArr = [...inputArr];
    const newValue = value.trim();
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && ref.current[index + 1]?.focus();
  }

  function handleOnKeyDown(e, index) {
    if (!e.target.value && e.key === "Backspace" && index > 0) {
      ref.current[index - 1].focus();
    }
  }

  // function to generate random number string of 5 digits
  const handleGenerateOtp = () => {
    let genOtp = Math.floor(Math.random() * 90000 + 10000).toString() ;
    console.log(`OTP: ${genOtp}`);
    setGenerateOtp(genOtp);
    return generateOtp;
  };

  const verifyOtp = () => {
    const enteredOtp = inputArr.join("");
    if (enteredOtp === generateOtp) {
      console.log("OTP Verified ✅");
    } else {
      console.log("Invalid OTP ❌");
    }
  };

  return (
      <div className={"container"}>
        <header>
          <h1>Validate Otp</h1>
        </header>
        <main>
        {
            inputArr.map((input, index) => {
            return <input key={index}
                          className={'otp-input'}
                          value={inputArr[index]}
                          ref = {(input) => {ref.current[index] = input}}
                          onChange={(e) => handleOnChange(e.target.value, index)}
                          onKeyDown={(e) => handleOnKeyDown(e, index)}
            />
          })
        }

        </main>
        <main>
          <button className="btn" onClick={handleGenerateOtp}>
            Generate Otp
          </button>
          <button className="btn" onClick={verifyOtp}>Submit</button>
        </main>
      </div>
  )
}
export default App
