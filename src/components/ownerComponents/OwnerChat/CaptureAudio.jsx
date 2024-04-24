import {
  faMicrophone,
  faPauseCircle,
  faPlay,
  faStop,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { addAudioMessage } from "../../../api/messageApi";
import Conversation from "./Conversation";
import { toast } from "react-toastify";

const CaptureAudio = ({
  hide,
  chat,
  currentOwner,
  socket,
  onSendAudio,
  message,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveForm, setWaveForm] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(null);

  const socketRef = useRef(socket);
  const audioRef = useRef(null);
  const mediaRecorderRed = useRef(null);
  const waveFormRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveForm(wavesurfer);

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveForm) {
      handleStartRecording();
    }
  }, [waveForm]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    setRecordedAudio(null);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRed.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);

          waveForm.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRed.current && isRecording) {
      mediaRecorderRed.current.stop();
      setIsRecording(false);
      waveForm.stop();

      const audioChunks = [];
      mediaRecorderRed.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      mediaRecorderRed.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };

  useEffect(() => {
    if (recordedAudio) {
      const updatePlabackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlabackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlabackTime);
      };
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveForm.stop();
      waveForm.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveForm.stop();
    recordedAudio.pause();
    setIsPlaying(false);
  };

  const handleSendRecording = async () => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(renderedAudio);
      reader.onloadend = async () => {
        const base64Audio = reader.result;
  
        const response = await addAudioMessage({
          chatId: chat._id,
          senderId: currentOwner,
          audio: base64Audio,
        });
  
        if (response.status === 201) {
          console.log("Audio message sent successfully");
  
          onSendAudio(response.data.message);
  
          socketRef.current.emit("send_message", {
            to: currentOwner,
            from: chat._id,
            message: response.data.message,
          });
          toast.success(response.data.message);
        }
      };
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error(error.response?.data?.message);

    }
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
    <div className="flex text-2xl w-full justify-end items-center">
      <div className="pt-1">
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-panel-header-icon"
          onChange={() => hide()}
        />
      </div>
      <div className="mx-4 py-2 px-4 text-white text-xl flex gap-3 justify-center items-center bg-search-input-container-background rounded-full shadow-lg">
        {isRecording ? (
          <div className="text-red-500 animate-pulse w-20 text-center">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FontAwesomeIcon
                    icon={faPlay}
                    onClick={handlePlayRecording}
                    className="text-red-500 cursor-pointer"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faStop}
                    onClick={handlePauseRecording}
                    className="text-red-500 cursor-pointer"
                  />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" ref={waveFormRef} hidden={isRecording}>
          {recordedAudio && isPlaying && (
            <span className="text-black">
              {formatTime(currentPlaybackTime)}
            </span>
          )}
          {recordedAudio && !isPlaying && (
            <span className="text-black">{formatTime(totalDuration)}</span>
          )}
          <audio ref={audioRef} hidden />
        </div>

        <div className="mr-4">
          {!isRecording ? (
            <FontAwesomeIcon
              icon={faMicrophone}
              className="text-red-500 cursor-pointer"
              onClick={handleStartRecording}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPauseCircle}
              className="text-red-500 cursor-pointer"
              onClick={handleStopRecording}
            />
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={handleSendRecording}
            className="text-blue-500 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
          {renderedAudio && (
            <Conversation message={message} currentOwner={currentOwner} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptureAudio;
