import React from "react";
import Sound from "react-sound";
import bgMusic from "../assets/bg_music.mp3";

export class BackgroundMusic extends React.Component {
  render() {
    return (
      <Sound
        url={bgMusic}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
        volume={5}
      />
    );
  }
}
