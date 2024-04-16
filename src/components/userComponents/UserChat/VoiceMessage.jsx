import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { format } from "timeago.js";

const VoiceMessage = ({ message, currentUser }) => {
  console.log("wefqpej");
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
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
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
    const audioURL = `/${message.audioPath}`;
    console.log(audioURL);
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
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex items-centergap-5 text-gray-700 px-4 pr-2 py-4 text-sm rounded-md ${
        message.senderId === currentUser ? "bg-incoming-background" : "bg-outgoing-background"
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
          <FontAwesomeIcon icon={faPlay} onClick={handlePlayAudio} />
        ) : (
          <FontAwesomeIcon icon={faStop} onClick={handlePauseAudio} />
        )}
      </div>
      <div className="relative">
        <div className="w-60" ref={waveFormRef}>
        {/* <div className="w-60" ref={waveFormRef} >
          {recordedAudio && isPlaying && (
            <span className="text-black">
              {formatTime(currentPlaybackTime)}
            </span>
          )}
          {recordedAudio && !isPlaying && (
            <span className="text-black">{formatTime(totalDuration)}</span>
          )}
          <audio ref={audioRef} hidden /> */}
          <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
            <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
            <div className="flex gap-1">
              {/* <span>{format(message.createdAt)}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessage;