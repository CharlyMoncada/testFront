import React, { useState, useEffect } from "react";
import { Icon } from "antd";
import Tone from "tone";

function Player({ freq, hitPlay }) {
  const [synth, setSynth] = useState({});
  useEffect(() => {
    const newSynth = new Tone.Synth().toMaster();
    setSynth(newSynth);
  }, []);
  const play = () => {
    if(!freq) return;
    synth.triggerAttackRelease(freq);
  };
  const stop = () => {
    if(!freq) return;
    synth.triggerRelease();
  };

  return (
    <>
      <div onClick={() => {
        hitPlay && hitPlay()
        play()}}>
        <Icon style={{ fontSize: 50, color: "lightgreen" }} type="play-circle" />
      </div>
      <div onClick={() => stop()}>
        <Icon style={{ fontSize: 50, color: "lightCoral" }} type="pause-circle" />
      </div>
    </>
  );
}

export default Player;
