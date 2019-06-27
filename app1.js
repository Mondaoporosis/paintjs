// Canvas settings
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const DEFAULT_LINE_WIDTH = 2.5;
const DEFAULT_LINE_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 450;
const CANVAS_COLOR = "white";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// canvas.color = "white";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = DEFAULT_LINE_COLOR;
ctx.lineWidth = DEFAULT_LINE_WIDTH;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  !filling ? (painting = true) : (painting = false);
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  !filling ? (painting = true) : (painting = false);
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// Select colors
const colors = document.getElementById("jsColors");

function getColor(event) {
  const clickedColor = event.target.style.backgroundColor;
  return clickedColor;
}

function onColorClick(event) {
  const color = getColor(event);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

if (colors) {
  colors.addEventListener("click", onColorClick);
}

// Adjust line width
const range = document.getElementById("jsRange");

function adjustLineWidth(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

if (range) {
  range.addEventListener("click", adjustLineWidth);
}

// Paint / Fill
const mode = document.getElementById("jsMode");
let filling = false;

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

// Save button
const saveBtn = document.getElementById("jsSave");

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "painting";
  link.click();
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
