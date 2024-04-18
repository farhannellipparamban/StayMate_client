import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { format } from "timeago.js";

const VoiceMessage = ({ message, currentOwner }) => {
  const [audioMessage, setAudioMessage] = useState(null);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveFormRef = useRef(null);
  const waveForm = useRef(null);

  useEffect(() => {
    if (waveForm.current === null) {
      waveForm.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#333333",
        progressColor: "#00ff15",
        cursorColor: "#000000",
        barWidth: 2,
        height: 30,
        responsive: true,
      });
      waveForm.current.on("finish", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      waveForm.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioURL = `http://localhost:8000/files/${message.audioPath
      .split("\\")
      .pop()}`;
    const audio = new Audio(audioURL);
    setAudioMessage(audio);
    waveForm.current.load(audioURL);
    waveForm.current.on("ready", () => {
      setTotalDuration(waveForm.current.getDuration());
    });
  }, [message.message]);

  useEffect(() => {
    if (audioMessage) {
      const updatePlabackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlabackTime);
      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlabackTime);
      };
    }
  }, [audioMessage]);

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveForm.current.stop();
      waveForm.current.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveForm.current.stop();
    audioMessage.pause();
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div
      className={`flex items-center gap-5 text-gray-900 px-4 pr-2 py-4 text-sm rounded-md ${
        message.senderId === currentOwner
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
          alt=""
          className="w-8 sm:w-12 h-8 sm:h-12 rounded-full"
        />
      </div>
      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FontAwesomeIcon
            icon={faPlay}
            onClick={handlePlayAudio}
            className="text-black hover:text-black"
          />
        ) : (
          <FontAwesomeIcon
            icon={faStop}
            onClick={handlePauseAudio}
            className="text-red-600 hover:text-red-800"
          />
        )}
      </div>
      <div className="relative w-60">
        <div className="w-full h-12" ref={waveFormRef}>
          <div className="text-bubble-meta text-xs pt-1 flex justify-between absolute bottom-[-22px] w-full">
            <span className="text-black">
              {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessage;
