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
    name: "All My Life",
    artist: "Lil Durk ft J.Cole",
    image: "https://i0.wp.com/hiphopkit.com/uploads/2023/05/Lil-Durk-All-My-Life-artwork.jpeg?ulb=false&ssl=1&resize=320,350",
    // path: "Enthusiast.mp3",
    path: "AllmyLife.mp3",
  },
  {
    name: "Pick Up",
    artist: "Tiwa Savage",
    image: "https://trendybeatz.com/images/Tiwa-Savage-Pick-Up-Artwork.jpg",
    // path: "Enthusiast.mp3",
    path: "Pick-Up.mp3",
  },
  {
    name: " Nothing",
    artist: "Moses Bliss",
    image: "https://justnaija.com/uploads/2023/06/Moses-Bliss-Nothing-artwork",
    path: "Nothing.mp3",
  },
  {
    name: "Reason You",
    artist: "Rema",
    image: "https://i1.sndcdn.com/artworks-W9BryrRWcopy-0-t500x500.jpg",
    path: "Reason-You.mp3",
  },
  {
    name: "Amapianon",
    artist: "Asake ft Olamide",
    image:
      "https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/Screenshot_2023-05-23_at_6.46.53_PM_or4kmn/asake-i-work-of-art-i-cover.jpg",
    path: "Amapiano.mp3",
  },
  {
    name: "Lift Me Up",
    artist: "Rihanna",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/43/Rihanna_-_Lift_Me_Up.png",
    path: "liftMeUp.mp3",
  },
  {
    name: "Charm",
    artist: "Rema",
    image: "https://i1.sndcdn.com/artworks-W9BryrRWcopy-0-t500x500.jpg",
    path: "Charm.mp3",
  },
  {
    name: "Somewhere Only We Know",
    artist: "Keane",
    image: "https://i1.sndcdn.com/artworks-000162294097-c1g2xw-t500x500.jpg",
    // path: "Enthusiast.mp3",
    path: "somewhereOnlyWeKnow.mp3",
  },
  {
    name: "GWAGWALADA",
    artist: "BNXN Kiss Daniel Seyi Vibez",
    image: "https://cdns-images.dzcdn.net/images/cover/7f89da381e2508e30a82f7dc2d18287f/500x500.jpg",
    // path: "Enthusiast.mp3",
    path: "GWAGWALADA.mp3",
  },
  {
    name: "Believe Me",
    artist: "Johnny Drille",
    image: "https://naijamz.com/images/Johnny-Drille-Believe-Me-artwork.jpg",
    // path: "Enthusiast.mp3",
    path: "BelieveMe.mp3",
  },
  {
    name: "Body and Soul",
    artist: "Joeboy",
    image: "https://trendybeatz.com/images/Joeboy-Body-and-Soul-Artwork.jpg",
    // path: "Enthusiast.mp3",
    path: "BodyandSoul.mp3",
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
  track_art.classList.add("playing");

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  track_art.classList.remove("playing");
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

const playListIcon = document.querySelector(".playListIcon");
playListIcon.addEventListener("click", () => {
  if (playListContainer.style.display === "block") {
    playListContainer.style.display = "none";
  } else {
    playListContainer.style.display = "block";
  }
});

const playPlaylistTrack = () => {
  curr_track.src = track.path;
};

// const playListWrapper = document.querySelector(".playListWrapper");
// playListContainer.addEventListener("click", playPlaylistTrack);
playListContainer.innerHTML = track_list
  .map((track) => {
    return `<div class="playListWrapper" style="cursor:pointer" >
      <div>
       <img src="${track.image}" alt="track image" />
    </div> 
    <div>
        <p>${track.name}</p>
        <p><i>${track.artist}</i></p>
    </div>
    </div>
  `;
  })
  .join(" ");

// Load the first track in the tracklist
loadTrack(track_index);
console.log(curr_track);
