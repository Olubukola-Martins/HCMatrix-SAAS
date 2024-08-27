import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface SpeechToTextProps {
  onTranscript: (transcript: string) => void;
  startListening: boolean;
}
const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscript, startListening }) => {
    const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (startListening) {
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true });
    } else if (isListening) {
      setIsListening(false);
      SpeechRecognition.stopListening();
      onTranscript(transcript);
    }
    
    if (!startListening && transcript) {
      resetTranscript();
    }
  }, [startListening, isListening, onTranscript, transcript, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null; 
  }

  return null;
};

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="mircophone-container">
//         Browser is not Support Speech Recognition.
//       </div>
//     );
//   }
//   const handleListing = () => {
//     setIsListening(true);
//     microphoneRef?.current?.classList.add("listening");
//     SpeechRecognition.startListening({
//       continuous: true,

//     });
//   };
//   const stopHandle = () => {
//     setIsListening(false);
//     microphoneRef?.current?.classList.remove("listening");
//     SpeechRecognition.stopListening();
//     onTranscript(transcript);
//   };

//   const handleReset = () => {
//     stopHandle();
//     resetTranscript();
//   }

//   // if (!isVisible) return null;

//   return (
//     <div className="microphone-wrapper">
//     <div className="mircophone-container">
//       <div
//         className="microphone-icon-container"
//         ref={microphoneRef}
//         onClick={handleListing}
//       >
//         <TbMicrophone/>
//       </div>
//       <div className="microphone-status">
//         {isListening ? "Listening........." : "Click to start Listening"}
//       </div>
//       {isListening && (
//         <button className="microphone-stop btn" onClick={stopHandle}>
//           Stop
//         </button>
//       )}
//     </div>
//     <p>Transcript: {transcript}</p>
//     {transcript && (
//       <div className="microphone-result-container">
//         <div className="microphone-result-text">{transcript}</div>
//         <button className="microphone-reset btn" onClick={handleReset}>
//           Reset
//         </button>
//       </div>
//     )}
//   </div>
//   );
// };

export default SpeechToText;
