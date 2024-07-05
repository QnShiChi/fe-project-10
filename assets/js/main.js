const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlistMain = $(".hero .play-list");
const playlistTrackList = $(".track-list__menu .play-list");
const audio = $("#audio");
const cdThumb = $(".cd-thumb");
const songName = $(".song-info__name");
const singer = $(".song-info__singer");
const playBtn = $(".btn-toggle-play");
const dashBoard = $(".dash-board");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const repeatBtn = $(".btn-repeat");
const randomBtn = $(".btn-random");
const cd = $(".cd");

const subRepeatBtn = $(".track-list__row .btn-repeat");
const subRandomBtn = $(".track-list__row .btn-random");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  randomHistory: [],
  songs: [
    {
      name: "Mưa Tháng 6 Remix",
      singer: "Nam Con Remix",
      path: "./assets/songs/song-1.mp3",
      image: "./assets/img/song-img/song-img-1.jpg",
    },
    {
      name: "Em Xinh",
      singer: "MONO, Onionn",
      path: "./assets/songs/song-2.mp3",
      image: "./assets/img/song-img/song-img-2.jpg",
    },
    {
      name: "Pháo Hồng",
      singer: "Đạt Long Vinh",
      path: "./assets/songs/song-3.mp3",
      image: "./assets/img/song-img/song-img-3.jpg",
    },
    {
      name: "Nơi Này Có Anh",
      singer: "Sơn Tùng M-TP",
      path: "./assets/songs/song-4.mp3",
      image: "./assets/img/song-img/song-img-4.jpg",
    },
    {
      name: "Không Thể Say",
      singer: "HIEUTHUHAI",
      path: "./assets/songs/song-5.mp3",
      image: "./assets/img/song-img/song-img-5.jpg",
    },
    {
      name: "Như Anh Đã Thấy Em",
      singer: "PhucXP, Freak D",
      path: "./assets/songs/song-6.mp3",
      image: "./assets/img/song-img/song-img-6.jpg",
    },
    {
      name: "EM LÀ NHẤT MIỀN TÂY",
      singer: "VÕ LÊ MI & JIN TUẤN NAM",
      path: "./assets/songs/song-7.mp3",
      image: "./assets/img/song-img/song-img-7.jpg",
    },
    {
      name: "Tình Yêu Màu Nắng",
      singer: "Đoàn Thúy Trang, Bigddady",
      path: "./assets/songs/song-8.mp3",
      image: "./assets/img/song-img/song-img-8.jpg",
    },
    {
      name: "Thê Lương",
      singer: "Phúc Chinh",
      path: "./assets/songs/song-9.mp3",
      image: "./assets/img/song-img/song-img-9.jpg",
    },
    {
      name: "Thủ Đô Cypher",
      singer: "Beck'Stage X Biti's Hunter",
      path: "./assets/songs/song-10.mp3",
      image: "./assets/img/song-img/song-img-10.jpg",
    },
    {
      name: "CHÚNG TA CỦA TƯƠNG LAI",
      singer: "SƠN TÙNG M-TP",
      path: "./assets/songs/song-11.mp3",
      image: "./assets/img/song-img/song-img-11.jpg",
    },
    {
      name: "Hãy Trao Cho Anh",
      singer: "SƠN TÙNG M-TP",
      path: "./assets/songs/song-12.mp3",
      image: "./assets/img/song-img/song-img-12.jpg",
    },
    {
      name: "CHÚNG TA CỦA HIỆN TẠI",
      singer: "SƠN TÙNG M-TP",
      path: "./assets/songs/song-13.mp3",
      image: "./assets/img/song-img/song-img-13.jpg",
    },
    {
      name: "Thất Tình",
      singer: "Trịnh Đình Quang",
      path: "./assets/songs/song-14.mp3",
      image: "./assets/img/song-img/song-img-14.jpg",
    },
  ],

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="play-list__song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
            <div
              class="play-list__thumb-wrap"
              style="background-image: url()"
            >
              <img
                class="play-list__image"
                src="${song.image}"
                alt=""
              />
            </div>
            <div class="play-list__body">
              <h3 class="play-list__title">${song.name}</h3>
              <p class="play-list__author">${song.singer}</p>
            </div>
            <div class="play-list__option">
              <img
                class="play-list__icon"
                src="./assets/icon/option.svg"
                alt=""
              />
            </div>
          </div>
      `;
    });

    if (playlistMain) {
      playlistMain.innerHTML = htmls.join("");
    }
    if (playlistTrackList) {
      playlistTrackList.innerHTML = htmls.join("");
    }
  },

  loadCurrentSong: function () {
    cdThumb.src = this.currentSong.image;
    songName.textContent = this.currentSong.name;
    singer.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
  },

  handleEvent: function () {
    const _this = this;
    // CD thumb animate

    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    };

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 20000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Handle play song
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      dashBoard.classList.add("playing");
      cdThumbAnimate.play();
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      dashBoard.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    repeatBtn.onclick = function () {
      _this.onclickRepeat(this);
    };

    subRepeatBtn.onclick = function () {
      _this.onclickRepeat(this);
    };

    randomBtn.onclick = function () {
      _this.onclickRandom(this);
    };

    subRandomBtn.onclick = function () {
      _this.onclickRandom(this);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        playBtn.click();
      } else {
        nextBtn.click();
      }
    };

    // Handle Select Song
    playlistMain.onclick = function (e) {
      _this.selectSong(e);
    };

    playlistTrackList.onclick = function (e) {
      _this.selectSong(e);
    };
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  // Handle Random Song and push current song into array history when use Random feature
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.randomHistory.includes(newIndex));
    this.randomHistory.push(newIndex);
    if (this.randomHistory.length === this.songs.length) {
      this.randomHistory.shift(); // Loại bỏ bài hát đầu tiên khi đã phát hết tất cả các bài
    }
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".track-list__menu .play-list__song.active").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 300);
  },

  // Select Song
  selectSong: function (e) {
    const songNode = e.target.closest(".play-list__song:not(.active)");
    if (songNode || e.target.closest(".play-list__option")) {
      if (songNode) {
        this.currentIndex = Number(songNode.dataset.index);
        this.loadCurrentSong();
        this.render();
        audio.play();
        this.scrollToActiveSong();
      }
    }
  },

  // Click Repeat Btn
  onclickRepeat: function (element) {
    this.isRepeat = !this.isRepeat;
    element.classList.toggle("active", this.isRepeat);
  },

  // Click Random Btn
  onclickRandom: function (element) {
    this.isRandom = !this.isRandom;
    element.classList.toggle("active", this.isRandom);
  },

  start: function () {
    this.render();
    this.defineProperties();
    this.loadCurrentSong();
    this.handleEvent();
    this.selectSong(playlistTrackList);
  },
};

app.start();
