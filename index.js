import "/koans.js"
import {runTests, getAllTests, formatTestResultsAsText} from "@benchristel/taste"

document.getElementById("testOutput").innerText =
  formatTestResultsAsText(await runTests(getAllTests()))
