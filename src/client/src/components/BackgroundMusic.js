import React from 'react';
import Sound from 'react-sound';

export class BackgroundMusic extends React.Component {
  render() {
    return (
      <Sound
        url={this.props.music}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
        loop={true}
        volume={this.props.volume}
      />
    );
  }
}
