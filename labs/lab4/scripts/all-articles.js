// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions

/**
 * Initializes the search functionality by setting the parent element 
 * where tags will be displayed and reading any tags from the URL.
 * For each tag found in the URL, it calls addSearchTerm to create
 * and display the tag, and filter articles accordingly.
 */
function initializeSearch(newParentElement) {
  const params = new URLSearchParams(window.location.search);
  if (newParentElement === null) {
    console.error(
      "Cannot insert tags, parent element is null",
      params.getAll("tag")
    );
    return;
  }

  parentElement = newParentElement;
  for (const tag of params.getAll("tag")) {
    addSearchTerm(tag);
  }
}

/**
 * Filters and hides or displays articles based on the active tags in searchTags.
 * If no tags are active, it shows all articles. Otherwise, it compares each article's tags
 * with the active search terms and hides any articles that do not match.
 */
function hideArticles() {
  if (searchTags.length === 0) {
    for (const article of document.querySelectorAll("article")) {
      article.classList.remove("hidden");
    }
    return;
  }

  const articlesWithTags = [];
  for (const tag of searchTags) {
    articlesWithTags.push(...findArticlesWithTag(tag));
  }

  /**
   * use querySelectorAll to select all articles
   * iterate over them in a for loop
   * check if articlesWithTags array does not include the current article being iterated over,
   * then add "hidden" to that article's classList
   * else, remove "hidden" from that article's classList
   */
  for (const article of document.querySelectorAll("article")) {
    if (!articlesWithTags.includes(article)) {
      article.classList.add("hidden");
    } else {
      article.classList.remove("hidden");
    }
  }
}

/**
 * Creates a clickable tag button for a given search term (text). When clicked,
 * the button will remove the corresponding tag from both the DOM and the searchTags array.
 * This function also calls hideArticles to update the articles displayed after removal.
 */
function createTag(text) {
  /**
   * create a new element called button
   * add the class "tag" to it
   * set the button's textContent property to text (the passed in argument)
   */
  const button = document.createElement("button");
  button.classList.add("tag");
  button.textContent = text;

  function remove() {
    button.remove();
    const index = searchTags.indexOf(text);
    if (index !== -1) {
      searchTags.splice(index, 1);
    }

    hideArticles();
  }

  /**
   * add a click event listener to the button, and set the listener to the remove function.
   * return the button element 
   */
  button.addEventListener("click", remove);
  return button;
}

/**
 * Finds and returns a list of articles that contain the specified search tag.
 * It compares the sanitized tag with the tags in each article, ensuring a match 
 * only if the text content of a tag is exactly the same as the search term.
 */
function findArticlesWithTag(phrase) {
  const articles = [];
  const sanitizedPhrase = phrase.toLowerCase().trim();
  for (const tl of tagLists) {
    const tags = Array.from(tl.querySelectorAll("li"));
    for (const tag of tags) {
      if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
        articles.push(tl.parentElement);
        break;
      }
    }
  }

  return articles;
}

/**
 * Adds a new search term by creating a tag button and appending it to the parent element.
 * It also adds the search term to the searchTags array and calls hideArticles to filter
 * the articles that match the newly added search term.
 */
function addSearchTerm(text) {
  parentElement.appendChild(createTag(text));
  searchTags.push(text);
  hideArticles();
}

// Handlers

/**
 * Handles the user input in the search field. When the "Enter" key is pressed,
 * it retrieves the current input value, calls addSearchTerm to add the tag, and clears the input.
 */
function onSearch(event) {
  const input = event.currentTarget;
  /**
   * If event.key equals "Enter":
   * call addSearchTerm and pass the input element's value
   * set input value to an empty string
   */
  if (event.key === "Enter") {
    addSearchTerm(input.value);
    input.value = "";
  }
}

// Main function

/**
 * Main function that initializes the search functionality when the page loads.
 * It sets up the event listener for the search input and calls initializeSearch
 * to handle any tags in the URL.
 */
function main() {
  initializeSearch(document.querySelector("#searched-tags"));

  document
    .querySelector("input[type=search]")
    .addEventListener("keypress", onSearch);
}

// Execute main function
main();

/**
 * Order of execution for each event:
 * Pressing Enter: onSearch → addSearchTerm → createTag → hideArticles
 * Clicking to Remove a Tag: remove → hideArticles
 * Loading the Page: main → initializeSearch → addSearchTerm → createTag → hideArticles
 */