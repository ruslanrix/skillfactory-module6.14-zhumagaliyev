const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missed = 0;
let firstHitTime;

function round() {
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  if (hits != maxHits) { $(divSelector).text(hits + 1); }
  if (hits === maxHits) { endGame(); }
}

function endGame() {
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let totalDiff = hits - missed;
  $("#total-time-played").text(totalPlayedSeconds);
  $("#missed-hits").text(missed);
  $("#diff-total").text(totalDiff);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(".target").text("");
    hits += 1;
    round();
  }
  else {
    $(this).addClass("miss");
    missed += 1;
  }
}

function firstClick(event) {
  round();
  firstHitTime = getTimestamp();
  $(".game-field").click(handleClick);
  $("#button-start").hide();
  $("#button-reload").show();
  $("#button-reload").click(function() { location.reload(); });
}

function init() {
  $("#button-reload").hide();
  $("#button-start").click(firstClick);
}

$(document).ready(init);
