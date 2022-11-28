import './App.css';
import React, { useEffect, useState } from 'react';
import InfoButton from './components/InfoButton';
import Modal from './components/Modal';
import AudioPlayer from './components/AudioPlayer';
import SkipButton from './components/SkipButton';
import GuessForm from './components/GuessForm';
import PlaylistSearch from './components/PlaylistSearch';
import PlaylistSelection from './components/PlaylistSelection';

function App() {

  let [trackList, setTrackList] = useState([]);
  let [showModal, setShowModal] = useState(true);
  let [trackIndex, setTrackIndex] = useState(0);
  let [currentTrack, setCurrentTrack] = useState(0);  
  let [userAnswer, setUserAnswer] = useState("");
  let [plOptions, setPlOptions] = useState([]);
  let [plIndex, setPlIndex] = useState(null);
  const serverUrl = ''//'https://song-genius-api.onrender.com';

  const nextTrack = () => {
    const newIndex = (trackIndex + 1)%trackList.length;
    setTrackIndex(newIndex);
    setCurrentTrack(trackList[newIndex].track);
    setUserAnswer("");
  }

  const updateTrackList = tl => {
    if (tl) {  
      setTrackList(tl);
      setCurrentTrack(tl[0].track);
      setTrackIndex(0);
    }
  }

  useEffect(()=>{
    if (plIndex != null) updateTrackList(plOptions[plIndex].tracks);
  },[plIndex, plOptions]);

  // Auto-play when track changes
  useEffect(()=>{if (!showModal) document.getElementById('audioPlayer').play()},[currentTrack, showModal]);

  return (
    <div className="App">
      <InfoButton setShowModal={setShowModal}/>
      <h1 id="siteLogo">Song Genius</h1>
      <PlaylistSearch setPlOptions={setPlOptions} serverUrl={serverUrl}/>
      <PlaylistSelection plOptions={plOptions} setPlIndex={setPlIndex} plIndex={plIndex}/>
      <AudioPlayer currentTrack={currentTrack}/>
      <GuessForm currentTrack={currentTrack} nextTrack={nextTrack} userAnswer={userAnswer} setUserAnswer={setUserAnswer}/>
      <SkipButton nextTrack={nextTrack}/>
      {showModal && <Modal setShowModal={setShowModal}/>}
    </div>
  );
}

export default App;
