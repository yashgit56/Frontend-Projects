import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?";

    let generatedPassword = "";
    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length + 1);
      generatedPassword += str.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    return () => {
      passwordGenerator();
    };
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password).then(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    });
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-gray-700 text-center p-4">
      <h1 className="text-center mb-2"> Password Generator </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          style={{ backgroundColor: "gray" }}
        ></input>
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          {loading ? "copied" : "copy"}
        </button>
      </div>
      <div className="flex text-sm gap-x-4">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            name="length"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length"> Length: {length} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => prev + 1);
            }}
          />
          <label htmlFor="numberInput"> Numbers </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => prev + 1);
            }}
          />
          <label htmlFor="charInput"> Characters </label>
        </div>
      </div>
    </div>
  );
}

export default App;
