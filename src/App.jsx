import { useCallback, useRef, useState } from "react";
import bg from "./assets/bg.jpg";

function App() {
  const [length, setLength] = useState(5);
  const [isNumberAllowed,setIsNumberAllowed]=useState(false)
  const [isCharAllowed,setIsCharAllowed]=useState(false)
  const [password, setPassword] = useState("");
let passwordRef=useRef(null)
const generatePassword=useCallback(()=>{
  let pass=""
  let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  for (let i = 1; i <= length; i++) {
    if (isNumberAllowed) {
      letters+="1234567890"
    }
    if (isCharAllowed) {
      letters+="~!:<>,.'?/\|``@#$%^&*()]"
    }
    let char=Math.floor(Math.random()*letters.length)
    pass+=letters.charAt(char)
    setPassword(pass)
  }

},[length,isCharAllowed,isNumberAllowed,setPassword])
let copyPassword=()=>{
  if (password) {
document.getElementById("copybanner").classList.remove("hidden")
passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
setTimeout((()=>{
  document.getElementById("copybanner").classList.add("hidden")
  passwordRef.current.setSelectionRange(0,0)
  passwordRef.current.blur()
}),2000)
}
else{
  alert("First generate a password then copy it")
}
}
  return (
    <>
      <div className=" flex flex-col justify-center w-full h-screen  text-gray-950 overflow-hidden bg-neutral-800">
        <div id="copybanner" className="px-3 absolute top-[3%] md:top-[5%] left-[50%] -translate-x-1/2 -translate-y-1/2  text-white text-xs md:text-sm  bg-amber-500 shadow-[3px_3px_10px] shadow-amber-600 hidden rounded-xl">Password copied to clipboard</div>
      <div className="px-1 absolute top-[11%] md:top-[15%]  left-[50%] -translate-x-1/2 -translate-y-1/2  text-white text-2xl font-bold font-sans md:text-5xl w-full md:w-max text-center">
          Password Generator
        </div>
        <div className="p-5 rounded-2xl flex flex-col absolute top-[33%] md:top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 border-gray-800 bg-amber-500 shadow-[5px_5px_15px] shadow-amber-600 md:w-auto ">
          <div>
            <input
              type="text"
              className="rounded-xl px-1"
              value={password}
              ref={passwordRef}
              placeholder="for password click below"
              readOnly
            />
            <button className=" px-3  border-2 border-gray-700 rounded-xl text-white bg-green-600 hover:grayscale-[70%] transition-all ease-in duration-300 mx-[35%] my-2 md:m-1" onClick={copyPassword}>
              Copy
            </button>
          </div>
          <div>
            <input type="range" className=" w-[40%]" onChange={(e)=>{
                setLength(e.target.value)
              }} min={1} max={100} value={length} />
            <label> length({length})</label>
          </div>
          <label>
            <input type="checkbox" name="" id="" className="m-1" onChange={(e)=>{
                setIsCharAllowed(e.target.checked)
              }} />
            Special Characters
          </label>
          <label>
            <input type="checkbox" name="" id="" className="m-1" onChange={(e)=>{
                setIsNumberAllowed(e.target.checked)
              }} />
            Numbers
          </label>
        </div>
        <button className="px-3 rounded-2xl absolute top-[55%] md:top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50  text-white bg-green-700 hover:grayscale-[70%]" onClick={generatePassword}>
          Get Password
        </button>
        <div className="p-2 md:p-4 rounded-xl fixed top-[78%] left-[50%] -translate-x-1/2 -translate-y-1/2 border-gray-800 bg-stone-700 shadow-inner  shadow-gray-300 text-gray-300 w-[80%] md:w-max">
<h1 className="text-lg font-bold">Steps to generate a good password:</h1>
<ul>
  <li>1. Click generate to generate a password automatically</li>
  <li>2. Select a desirable length to get a strong password</li>
  <li>3. Toggle the Characters and Numbers checkbox to get a strong password</li>
</ul>
          </div>
      </div>
    </>
  );
}

export default App;
