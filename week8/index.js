// this code runs synchronously
function showData() {
    // lots of code
    console.log("showData function finished")
}

async function getRandomFact() {
    console.log(data.text, "\n")
}

// this code runs asynchronously
async function getTodaysFact() {
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today")
    // console.log(response)
    const data = await response.json()
    console.log(data.text, "\n")
}

getRandomFact()
getTodaysFact()
