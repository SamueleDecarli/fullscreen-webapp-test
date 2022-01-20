const outerContainer = document.getElementById("outer-container")
const fullScreenButton = document.getElementById("fullscreen-button");

const innerContainer = document.getElementById("inner-container");

const itemsBrowser = document.getElementById("items-browser");
const list = document.getElementById("items-list");

let isFullscreen = false;

async function enterFullScreen() {
  await innerContainer.requestFullscreen();
  isFullscreen = true;
  fullScreenButton.textContent = "Exit fullscreen";
}

async function exitFullscreen() {
  await document.exitFullscreen();
  isFullscreen = false;
  fullScreenButton.textContent = "Enter fullscreen";
}

fullScreenButton.addEventListener("click", async () => {
  if (isFullscreen) {
    await exitFullscreen()
  } else {
    await enterFullScreen();
  }
});

let viewerOpen = false;
let previousScroll = { x: 0, y: 0};
async function toggleViewer() {
  if (viewerOpen) {
    if (isFullscreen) {
      await exitFullscreen();
    }
    innerContainer.style.display = "none";
    itemsBrowser.style.removeProperty("display");
    window.scrollTo(previousScroll.x, previousScroll.y);
  } else {
    previousScroll.x = document.documentElement.scrollLeft || document.body.scrollLeft || document.querySelector("html").scrollLeft || window.scrollX;
    previousScroll.y = document.documentElement.scrollTop || document.body.scrollTop || document.querySelector("html").scrollTop || window.scrollY;

    itemsBrowser.style.display = "none";
    innerContainer.style.removeProperty("display");
    window.scrollTo(0, 0);
  }
  viewerOpen = !viewerOpen;
}

const exitViewer = document.getElementById("exit-viewer-button");
exitViewer.addEventListener("click", toggleViewer);

for (let i = 0; i < 500; ++i) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.addEventListener("click", toggleViewer);
  button.textContent = `Open item ${i}`;
  button.type = "button";
  li.appendChild(button);
  list.appendChild(li);
}


// function resizeDiv() {
//   innerContainer.style.width = `${window.innerWidth}px`;
//   innerContainer.style.height = `${window.innerHeight}px`;
//   outerContainer.style.width = `${window.innerWidth}px`;
//   outerContainer.style.height = `${window.innerHeight}px`;
// }

// window.addEventListener("resize", resizeDiv);
// resizeDiv();

// window.addEventListener("load",() => {
//   requestAnimationFrame(() =>  window.scrollTo(0, 1));
// });
