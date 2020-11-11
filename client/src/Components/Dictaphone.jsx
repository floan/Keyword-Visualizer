import React from 'react';
import { useHistory } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import css from '../styles/Dictaphone.css';
import handleVisualizeData from './handleDataFunction.js'; //Function that communicates with API


const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const history = useHistory(); 

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    <h1> Sorry, your browser does not support this application. Please try usnig Chrome. </h1>
    return null
  }

  return (
    <div>
      <button className='recordButton' onClick={ () => {SpeechRecognition.startListening({continuous : true})} }>Start Recording</button>
      <button className='recordButton' onClick={SpeechRecognition.stopListening}>Stop Recording</button>
      <button className='recordButton' onClick={resetTranscript}>Reset Transcript</button>
      <button className='recordButton' onClick={
        async () => {
          SpeechRecognition.stopListening(); //Stop recording

          if(transcript == ''){ //If transcript is empty 
            history.push('graph', {data: null}); //Provide the user with an option to enter a code
          }
          else{ // Display the data of the new transcript
            let response = await handleVisualizeData(transcript);
            history.push('/graph', {data: response.data, 
                                    id: response.id});
          }
        }
      }>Visualize keywords</button>
      <p className="transcriptBox">{transcript}</p>
    </div>
  )
}
export default Dictaphone