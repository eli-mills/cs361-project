import './App.css';
import { useState } from 'react';
import InfoButton from './components/InfoButton';
import Modal from './components/Modal';
import AudioPlayer from './components/AudioPlayer';

function App() {

  let [showModal, setShowModal] = useState(true);
  return (
    <div className="App">
      <button onClick={()=>setShowModal(true)}>
      <InfoButton />
      </button>
      <AudioPlayer />
      {showModal && <Modal setShowModal={setShowModal}/>}
    </div>
  );
}

export default App;
