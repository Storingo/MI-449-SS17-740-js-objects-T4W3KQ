// ----
// DATA
// ----

// Get jokes from locqal storage and set it to jokes

var stringifiedJokes = window.localStorage.getItem('jokes') || '{}'
var jokes = JSON.parse(stringifiedJokes)

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var setup = document.getElementById('setup')
var punchline = document.getElementById('punchline')
var updateDisplayedJoke = function () {
  var requestedJoke = jokes[requestedJokeInput.value]
  if (requestedJoke) {
    var jokeSetup = jokes[requestedJokeInput.value]['setup']
    var jokePunch = jokes[requestedJokeInput.value]['punchline']
    setup.textContent = jokeSetup
    punchline.textContent = jokePunch
  } else {
    setup.textContent = 'No matching joke found.'
    punchline.textContent = ''
  }
}

// Adds joke to list of jokes
var remember = document.getElementById('remember')
var about = document.getElementById('about')
var newSetup = document.getElementById('newSetup')
var newPunchline = document.getElementById('newPunchline')

var addJoke = function () {
  jokes[about.value] = {}
  jokes[about.value]['setup'] = newSetup.value
  jokes[about.value]['punchline'] = newPunchline.value
}

// Deletes joke from list
var forget = document.getElementById('forget')
var forgetAbout = document.getElementById('forgetAbout')

var deleteJoke = function () {
  delete jokes[forgetAbout.value]
}

// Saves Jokes list to local storage
var updateLocalStorage = function () {
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}
// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
remember.addEventListener('click', addJoke)
remember.addEventListener('click', updateJokesMenu)
remember.addEventListener('click', updateLocalStorage)
forget.addEventListener('click', deleteJoke)
forget.addEventListener('click', updateJokesMenu)
forget.addEventListener('click', updateLocalStorage)
