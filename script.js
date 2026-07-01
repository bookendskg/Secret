// Video message loader.
// Reads settings from the #video section's data-* attributes in index.html and
// injects a local <video> player and/or a YouTube embed. Both are optional.
(function () {
  var section = document.getElementById("video");
  var container = document.getElementById("video-container");
  var fallback = document.getElementById("video-fallback");
  if (!section || !container) return;

  var showLocal = section.getAttribute("data-show-local") === "true";
  var localSrc = section.getAttribute("data-local-src") || "videos/message.mp4";
  var ytId = (section.getAttribute("data-youtube-id") || "").trim();

  var added = false;

  // 1. Local video file
  if (showLocal) {
    var video = document.createElement("video");
    video.setAttribute("controls", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
    var source = document.createElement("source");
    source.src = localSrc;
    source.type = "video/mp4";
    video.appendChild(source);
    container.appendChild(video);
    added = true;
  }

  // 2. YouTube embed
  if (ytId) {
    var iframe = document.createElement("iframe");
    iframe.className = "yt-embed";
    iframe.src = "https://www.youtube.com/embed/" + encodeURIComponent(ytId);
    iframe.title = "Video message";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("loading", "lazy");
    container.appendChild(iframe);
    added = true;
  }

  // Nothing configured -> hide the section (or show the helper hint).
  if (!added) {
    if (fallback) fallback.hidden = false;
    // Uncomment the next line to hide the whole section when no video is set:
    // section.hidden = true;
  }
})();
