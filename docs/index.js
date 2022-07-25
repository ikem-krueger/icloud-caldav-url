function generateUrl() {
  const re = /https:\/\/(?<serverNumber>\w{3})\-calendarws\.icloud\.com\/ca\/collections\/(?<calendarId>.*)\?.*dsid=(?<userId>\d{9})&.*/

  targetUrl.value = sourceUrl.value.replace(re, "https://$<serverNumber>-caldav.icloud.com/$<userId>/calendars/$<calendarId>/")

  targetUrl.select();
}

const sourceUrl = document.getElementById("sourceUrl")

sourceUrl.addEventListener("keyup", () => {
  generateUrl()
})

sourceUrl.addEventListener("drop", () => {
  generateUrl()
})

sourceUrl.addEventListener("focus", () => {
  sourceUrl.select()
})

const targetUrl = document.getElementById("targetUrl")

targetUrl.addEventListener("focus", () => {
  targetUrl.select()
})

const pasteButton = document.getElementById("pasteButton")

if (navigator.clipboard.readText) // Firefox doesn't support reading from the clipboard
  pasteButton.hidden = false

pasteButton.addEventListener("click", () => {
  navigator.clipboard
    .readText()
    .then(
      text => {
        console.log("text pasted: " + text);

        sourceUrl.value = text;

        generateUrl()
      },
      error => console.log("error pasting text")
    );
});

const copyButton = document.getElementById("copyButton")

copyButton.addEventListener("click", () => {
  const text = targetUrl.value

  if (!text) return

  targetUrl.select()

  navigator.clipboard
    .writeText(text)
    .then(
      success => console.log("text copied: " + text),
      error => console.log("error copying text")
    );
});
