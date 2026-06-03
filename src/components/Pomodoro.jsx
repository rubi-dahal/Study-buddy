import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import alarmSound from "/src/assets/alarm.mp3";
import Navbar from "./Navbar";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [isMode, setIsMode] = useState("pomodoro");

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(alarmSound);
  }, []);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleTimerEnd = () => {
    setIsRunning(false);

    if (isMode === "pomodoro") setTime(25 * 60);
    else if (isMode === "short") setTime(5 * 60);
    else setTime(15 * 60);

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.error("Failed to play alarm:", err);
        });
        setIsAlarmPlaying(true);
      } catch (error) {
        console.error("Error playing alarm:", error);
      }
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAlarmPlaying(false);
    }
  };

  const formatTime = () => {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const setModeHandler = (mode) => {
    setIsMode(mode);
    setIsRunning(false);

    if (mode === "pomodoro") setTime(25 * 60);
    if (mode === "short") setTime(5 * 60);
    if (mode === "long") setTime(15 * 60);
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {/* NAV */}
      <nav className="max-w-7xl mx-auto flex justify-center gap-4 pt-15 px-6 flex-wrap">
          <div
            onClick={() => setModeHandler("pomodoro")}
            className={`px-6 py-3 rounded-2xl border cursor-pointer transition duration-300 ${
              isMode === "pomodoro"
                ? "bg-purple-500 text-white border-purple-500"
                : "border-gray-700 text-gray-300 hover:bg-[#334155] hover:text-white"
            }`}
          >
            Pomodoro
          </div>
          <div
            onClick={() => setModeHandler("short")}
            className={`px-6 py-3 rounded-2xl border cursor-pointer transition duration-300 ${
              isMode === "short"
                ? "bg-purple-500 text-white border-purple-500"
                : "border-gray-700 text-gray-300 hover:bg-[#334155] hover:text-white"
            }`}
          >
            Short Break
          </div>
        
          <div
            onClick={() => setModeHandler("long")}
            className={`px-6 py-3 rounded-2xl border cursor-pointer transition duration-300 ${
              isMode === "long"
                ? "bg-purple-500 text-white border-purple-500"
                : "border-gray-700 text-gray-300 hover:bg-[#334155] hover:text-white"
            }`}
          >
            Long Break
          </div>

      </nav>

      {/* TIMER */}
      <div className="max-w-3xl mx-auto mt-16 px-6">
        <div className="p-10 md:p-14 text-center">

          <h1 className="text-7xl md:text-8xl font-bold tracking-wider mb-10">
            {formatTime()}
          </h1>

          {/* BUTTONS */}
          <div className="flex items-center justify-center gap-4 flex-wrap">

            <button
              onClick={() => setIsRunning((prev) => !prev)}
              className="px-8 py-3 rounded-2xl text-white bg-purple-500 hover:bg-purple-600 transition duration-300 font-semibold shadow-lg"
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={() => {
                if (isMode === "pomodoro") setTime(25 * 60);
                if (isMode === "short") setTime(5 * 60);
                if (isMode === "long") setTime(15 * 60);
                setIsRunning(false);
              }}
              className="px-8 py-3 rounded-2xl border border-gray-500 text-gray-300 hover:bg-[#334155] transition duration-300 font-semibold"
            >
              Reset
            </button>

            {isAlarmPlaying && (
              <button
                onClick={stopAlarm}
                className="px-8 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 transition duration-300 font-semibold"
              >
                Stop Alarm
              </button>
            )}

          </div>

          <h2 className="mt-10 text-2xl text-gray-300 font-medium">
            Study With Me!
          </h2>

        </div>
      </div>
    </div>
  );
};

export default Pomodoro;