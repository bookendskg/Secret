// Secret-menu intro: show the TOP SECRET stamp for 2s, then the message +
// unlock button. Clicking the button reveals the page.
(function () {
  var intro = document.getElementById("intro");
  if (!intro) return;
  var stamp = document.getElementById("intro-stamp");
  var message = document.getElementById("intro-message");
  var accessBtn = document.getElementById("access-btn");

  // After 2 seconds, swap the stamp for the message screen.
  setTimeout(function () {
    if (stamp) stamp.hidden = true;
    if (message) message.hidden = false;
  }, 2000);

  if (accessBtn) {
    accessBtn.addEventListener("click", function () {
      intro.classList.add("intro-hide");
      document.body.classList.remove("intro-lock");
      setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 500);
    });
  }
})();

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
  var loop = section.getAttribute("data-loop") === "true";
  var ytId = (section.getAttribute("data-youtube-id") || "").trim();

  var added = false;

  // 1. Local video file
  if (showLocal) {
    var wrap = document.createElement("div");
    wrap.className = "video-local";

    var video = document.createElement("video");
    video.setAttribute("controls", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
    if (loop) {
      // Autoplay requires the video to start muted; the button below unmutes.
      video.loop = true;
      video.autoplay = true;
      video.muted = true;
      video.setAttribute("loop", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("muted", "");
    }
    var source = document.createElement("source");
    source.src = localSrc;
    source.type = "video/mp4";
    video.appendChild(source);
    wrap.appendChild(video);

    // Mute / unmute button
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mute-btn";
    var syncBtn = function () {
      var m = video.muted || video.volume === 0;
      btn.textContent = m ? "🔇 Unmute" : "🔊 Mute";
      btn.setAttribute("aria-label", m ? "Unmute video" : "Mute video");
      btn.setAttribute("aria-pressed", String(m));
    };
    btn.addEventListener("click", function () {
      video.muted = !video.muted;
      if (!video.muted) {
        video.play().catch(function () {});
      }
      syncBtn();
    });
    video.addEventListener("volumechange", syncBtn);
    syncBtn();
    wrap.appendChild(btn);

    container.appendChild(wrap);
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
