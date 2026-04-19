import './App.css'
import {useEffect, useRef, useState} from 'react'
import {toast, Toaster} from "react-hot-toast";

const OTP_DIGIT_COUNT = 5;

const App = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const [generateOtp, setGenerateOtp] = useState("");
  const [message, setMessage] = useState(false);
  const ref = useRef([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer( (prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);


  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

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
    if(inputArr.length > 0){
      setInputArr(new Array(OTP_DIGIT_COUNT).fill(""));
    }
    let genOtp = Math.floor(Math.random() * 90000 + 10000).toString() ;
    console.log(`OTP: ${genOtp}`);
    setGenerateOtp(genOtp);
    setTimer(30);
  };

  const verifyOtp = () => {
    const enteredOtp = inputArr.join("");
    let isInComplete = inputArr.some((box) => box === "");

    if (isInComplete || enteredOtp !== generateOtp) {
      toast.error("Invalid OTP");
      setInputArr(new Array(OTP_DIGIT_COUNT).fill(""));
      ref.current[0]?.focus();
    } else {
      toast.success("OTP verified");
    }
  }


  return (
      <div className={"container"}>
        <header className={"header-container"}>
          <h1 className={"title"}>Validate Otp</h1>
        </header>

        <main className={"main-container"}>
          <div className={"otp-box-container"}>
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
          </div>

        </main>

        <section className="btn-section">

          <div className="btn-wrapper">
            <button
                className="btn"
                onClick={handleGenerateOtp}
                disabled={timer > 0}
            >
              Generate OTP
            </button>

            {/* Always reserve this space — show text only when timer is active */}
            <p className="sm-text">
              {timer > 0 ? `Resend in ${timer}s` : ""}
            </p>
          </div>

          <div className="btn-wrapper">
            <button
                className="btn"
                onClick={verifyOtp}
            >
              Submit
            </button>
            <p className="sm-text"></p> {/* empty — just to match height */}
          </div>

        </section>

        <Toaster position={"bottom-center"}/>

      </div>
  )
}
export default App
