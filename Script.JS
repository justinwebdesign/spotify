const songs = [
  {
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    plays: 1235841,
    duration: "3:07",
    img: "download.jpg"
  },
  {
    title: "Wonderwall",
    artist: "Oasis",
    plays: 1009973,
    duration: "3:57",
    img: "download.jpg"
  },
  {
    title: "What Was That",
    artist: "Lorde",
    plays: 969608,
    duration: "3:29",
    img: "download.jpg"
  },
  {
    title: "NOKIA",
    artist: "Drake",
    plays: 1328960,
    duration: "4:01",
    img: "download.jpg",
    explicit: true
  },
  {
    title: "Mad Steampunk Scientist's Lab",
    artist: "NaturesEye",
    plays: 29,
    duration: "2:58",
    img: "download.jpg",

  },
  {
    title: "Die With A Smile",
    artist: "Lady Gaga, Bruno Mars",
    plays: 943735,
    duration: "4:12",
    img: "download.jpg"
  },
  {
    title: "Just In Case",
    artist: "Morgan Wallen",
    plays: 940357,
    duration: "2:46",
    img: "download.jpg"
  }
];

const table = document.getElementById("songTableBody");

songs.forEach((song, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="hover-play">
      <button class="play-hover-button" onclick="showTooltip(${index})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="#fff">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    </td>
    <td>
      <div class="song-info">
        <img src="${song.img}" alt="cover art" />
        <div>
          <div class="title">${song.title}${song.explicit ? ' <span class="explicit">E</span>' : ''}</div>
          <div class="artist">${song.artist}</div>
        </div>
      </div>
    </td>
    <td id="plays-${index}">${song.plays.toLocaleString()}</td>
    <td>${song.duration}</td>
  `;
  table.appendChild(row);
});

function showTooltip(index) {
  const oldTooltip = document.querySelector('.global-tooltip');
  if (oldTooltip) oldTooltip.remove();

  const tooltip = document.createElement('div');
  tooltip.className = 'global-tooltip';

  const title = songs[index].title.toLowerCase();

  if (title.includes("a bar song")) {
    playBarSong();
    return;
  }
  if (title.includes("wonderwall")) {
    playWonderwall();
    return;
  }
  if (title.includes("what was that")) {
    window.open("https://www.youtube.com/watch?v=1UpoZpMBM9Y", "_blank");
    return;
  }
  if (title.includes("pink pony club")) {
    window.open("https://www.youtube.com/watch?v=GR3Liudev18", "_blank");
    return;
  }
  if (title.includes("die with a smile")) {
    playCough();
    return;
  }

  const playsWeirdAudio = title.includes("mad steampunk scientist");
  const playsLutherAudio = title.includes("just in case");

  tooltip.textContent = playsWeirdAudio
    ? "By clicking this song, you just added another view to our algorithm, which will help us profit more by reporting the statistics to this beginner band."
    : playsLutherAudio
    ? "Now playing your favorite vibe 🔊"
    : index === 3
    ? "Song failed to load. Since Spotify only allows rightful owners to produce their songs, there is no alternative way to hear this song. Please try again later."
    : index === 1
    ? "By clicking this song, you just added another view to our algorithm, which will help us profit more by reporting the statistics to this beginner band trying to grow their platform."
    : `▶ Now playing: ${songs[index].title}`;

  document.body.appendChild(tooltip);

  if (playsWeirdAudio) {
    playWeird();
  } else if (playsLutherAudio) {
    playLuther();
  }

  setTimeout(() => {
    tooltip.remove();
  }, 10000);
}

function playWeird() {
  stopAllAudio(); // 🔇 Stop any other audio first

  const audio = document.getElementById("weird-audio");
  if (!audio) {
    console.error("Weird audio element not found");
    return;
  }

  audio.currentTime = 0;
  audio.play().then(() => {
    console.log("Weird audio is playing");
  }).catch(err => {
    console.error("Weird audio failed to play:", err.message);
  });
}

function playLuther() {
  stopAllAudio(); // 🔇 Stop any other audio first

  const audio = document.getElementById("luther-audio");
  if (!audio) {
    console.error("Luther audio element not found");
    return;
  }

  audio.currentTime = 0;
  audio.play().then(() => {
    console.log("Luther audio is playing");
  }).catch(err => {
    console.error("Luther audio failed to play:", err.message);
  });
}

function playBarSong() {
  stopAllAudio(); // optional if you're managing only one audio

  const audio = document.getElementById("barsong-audio");
  if (!audio) {
    console.error("barsong.mp3 not found");
    return;
  }

  audio.currentTime = 0;
  audio.play().then(() => {
    console.log("A Bar Song is playing");
  }).catch(err => {
    console.error("Audio failed to play:", err.message);
  });
}

function playWonderwall() {
  stopAllAudio(); // Stop any other audio first

  const audio = document.getElementById("wonderwall-audio");
  if (!audio) {
    console.error("wonderwall.mp3 not found");
    return;
  }

  audio.currentTime = 0;
  audio.play().then(() => {
    console.log("Wonderwall is playing");
  }).catch(err => {
    console.error("Audio failed to play:", err.message);
  });
}

function playCough() {
  stopAllAudio(); // Stop any other audio first

  const audio = document.getElementById("cough-audio");
  if (!audio) {
    console.error("cough.mp3 not found");
    return;
  }

  audio.currentTime = 0;
  audio.play().then(() => {
    console.log("Cough sound is playing");
  }).catch(err => {
    console.error("Audio failed to play:", err.message);
  });
}

function stopAllAudio() {
  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => {
    audio.pause();           // ⏸️ stop playback
    audio.currentTime = 0;   // ⏮️ rewind to start
  });
}

function showExitPopup() {
  const userConfirmed = confirm("Click here to exit this platform. Discover any kind of song/video on your own accord, without algorithms dictating your choices.");
  if (userConfirmed) {
    window.location.href = "https://fmhy.net/audiopiracyguide"; // Redirects to the specified URL
  }
}