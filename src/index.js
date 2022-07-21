const sourceUrl = document.getElementById("sourceUrl")
const targetUrl = document.getElementById("targetUrl")

sourceUrl.addEventListener("keyup", () => {
  const re = /https:\/\/(?<serverNumber>\w{3})\-calendarws\.icloud\.com\/ca\/collections\/(?<calendarId>.*)\?.*dsid=(?<userId>\d{9})&.*/

  targetUrl.value = sourceUrl.value.replace(re, "https://$<serverNumber>-caldav.icloud.com/$<userId>/calendars/$<calendarId>/")
})

sourceUrl.addEventListener("focus", () => {
  sourceUrl.select()
})

targetUrl.addEventListener("focus", () => {
  targetUrl.select()
})

const copyButton = document.getElementById("copyButton")

copyButton.addEventListener('click', () => {
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
