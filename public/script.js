const socket = io("/");

let myVideoStream = null;
const myVideo = document.createElement("video");
myVideo.muted = true;

const videoGrid = document.getElementById("video-grid");

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then(function (stream) {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

socket.emit("join-room", ROOM_ID);
socket.on("user-connected", () => {
  connectToNewUser();
});

const connectToNewUser = () => {
  console.log("new user");
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
