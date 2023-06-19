document.title = "SAVVY MUSIC PLAYER";

const track_art = document.querySelector(".track-art");
const track_name = document.querySelector(".track-name");
const track_artist = document.querySelector(".track-artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next");
const prev_btn = document.querySelector(".prev");

const seek_slider = document.querySelector(".seek_slider");
const curr_time = document.querySelector(".current-time");
const total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    name: " Nothing",
    artist: "Moses Bliss",
    image: "Image URL",
    path: "Nothing.mp3",
  },
  {
    name: "Lift Me Up",
    artist: "Rihanna",
    image: "Image URL",
    path: "liftMeUp.mp3",
  },
  {
    name: "Charm",
    artist: "Rema",
    image: "Image URL",
    path: "Charm.mp3",
  },
  {
    name: "Somewher Only We Know",
    artist: "Keane",
    image: "Image URL",
    // path: "Enthusiast.mp3",
    path: "somewhereOnlyWeKnow.mp3",
  },
];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  let seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
let volume_slider = document.querySelector(".volume_slider");

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
// load user selected track
const inputElement = document.getElementById("musicFile");

inputElement.addEventListener("change", playUserSelectedMusic, false);

function playUserSelectedMusic() {
  for (let i = 0; i < this.files.length; i++) {
    const element = this.files[i];

    if (element.type !== "audio/mpeg") {
      alert("please select a valid audio file");
      return;
    }

    const audioUrl = window.URL.createObjectURL(element);
    playpauseTrack();
    curr_track.src = audioUrl;
    track_list.unshift({
      name: element.name,
      artist: "Your Selected Artist",
      image: "Image URL",
      path: audioUrl,
    });
    loadTrack(track_index);
  }
  // console.log(track_list);
}

const playListContainer = document.querySelector(".playlistContainer");
playListContainer.style.display = "none";

const playListIcon = document.querySelector(".fa-list-music");
playListIcon.addEventListener("click", () => {
  if (playListContainer.style.display === "block") {
    playListContainer.style.display = "none";
  } else {
    playListContainer.style.display = "block";
  }
});

// playListContainer.innerHTML += track_list.map((track) => {
//   const div = document.createElement("div");
//   const img = document.createElement("img");
//   // const paragra
//   div.append((img.src = track.image));
//   // div.append()
//   // `<div> <img src="${track.image} alt="music-image" />  <p> ${track.name} </p> <p>${track.artist} </p>  </div>`;
// });

// Load the first track in the tracklist
loadTrack(track_index);
console.log(curr_track);
