import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "New Playlist",
            playlistTracks: []
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        if(this.state.playlistTracks.find(savedTrack =>
            savedTrack.id === track.id)) {
                return;
        }
        let playlist = this.state.playlistTracks;
        playlist.push(track);
        this.setState({
            playlistTracks: playlist
        });

    }

    removeTrack(track) {
        let playlist = this.state.playlistTracks.filter(keepTrack =>
            keepTrack.id !== track.id);
        this.setState({
            playlistTracks: playlist
        });
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                playlistTracks: [],
                playlistName: 'New Playlist'
            });
        });
    }

    search(searchTerm) {
        console.log(`Searching for ${searchTerm}`);
        Spotify.search(searchTerm).then(track => {
            this.setState({searchResults: track});
        });

    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack} />
                        <Playlist
                            playlistName={this.state.playlistName}
                            onNameChange={this.updatePlaylistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
            );
    }
};

export default App;
