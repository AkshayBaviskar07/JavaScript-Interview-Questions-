import './App.css'
import {useEffect, useRef, useState} from 'react'

const OTP_DIGIT_COUNT = 5;

const App = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const ref = useRef([]);

  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if(isNaN(value)) return;

    const newArr = [...inputArr];
    const newValue = value.trim();
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && ref.current[index + 1].focus();
  }

  function handleOnKeyDown(e, index) {
    if (!e.target.value && e.key === "Backspace") {
      ref.current[index - 1].focus();
    }
  }

  return (
      <div>
        <h1>Validate Otp</h1>
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
  )
}
export default App
