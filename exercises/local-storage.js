/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

const squares = document.querySelectorAll('.card');

const addToFav = (id) => {
    const addTo = id;
    let currentFavs = localStorage.getItem('favorites');
    if (currentFavs === null) {
        const addToString = `${addTo}`;
        localStorage.setItem('favorites', addToString);
    } else {
        currentFavs += `,${addTo}`;
        localStorage.setItem('favorites', currentFavs);
    }
}

const deleteFromFav = (id) => {
    let favs = localStorage.getItem('favorites').split(',');
    favs.splice(favs.indexOf(id), 1).join(',');
    if(favs.length === 1){
        localStorage.removeItem('favorites');
    }
    localStorage.setItem('favorites', favs);
}

const changeBackGround = (e) => {
    const square = e.target;
    const isFav = e.target.dataset.fav === 'true' ? true : false;

    switch (isFav) {
        case false:
            addToFav(square.id);
            square.dataset.fav = 'true';
            square.style.backgroundColor = 'red';
            break;
        case true:
            deleteFromFav(square.id);
            square.dataset.fav = 'false';
            square.style.backgroundColor = 'white';
            break;
    }

}


squares.forEach((square) => {
    let isFav = square.dataset.fav;
    const id = square.id;
    if (localStorage.getItem('favorites') === null) {
        square.addEventListener('click', changeBackGround);
    } else {
        const favArr = localStorage.getItem('favorites').split(',');
        if (favArr.indexOf(id) !== -1) {
            square.style.backgroundColor = 'red';
            isFav = 'true';
        }else{
            square.style.backgroundColor = 'white';
            isFav = 'false';
        }
        square.addEventListener('click', changeBackGround)
    }
});