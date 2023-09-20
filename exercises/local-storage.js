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


const setBackground = (id) => {
    const item = document.getElementById(id);
    const favs = localStorage.getItem('favs');
    if(favs === null){
        item.style.backgroundColor = 'white'
        item.dataset.fav = 'false';
    }else if (favs !== null){
        const favsArr = favs.split(',');
        if(favsArr.indexOf(id) !== -1){
            item.style.backgroundColor = 'red';
            item.dataset.fav = 'true';
        }else{
            item.style.backgroundColor = 'white';
            item.dataset.fav = 'false';
        }
    }
}

const addFav = (id) => {
    const favs = localStorage.getItem('favs');
    switch(favs){
        case null:
            localStorage.setItem('favs', id);
            break;
        default:
            let favsArr = favs.split(',');
            favsArr.push(id);
            localStorage.setItem('favs', favsArr.join(','));
            break;
    }
}

const delFav = (id) => {
    const favs = localStorage.getItem('favs');
    let favsArr = favs.split(',');
    favsArr.splice(favsArr.indexOf(id),1);
    const len = favsArr.length;
    switch(len){
        case 0:
            localStorage.removeItem('favs');
            break;
        default:
            localStorage.setItem('favs', favsArr.join(','));
            break;
    }
}

const changeBackground = (e) => {
    const item = e.target;
    const isFav = item.dataset.fav === 'true' ? true : false;
    switch(isFav){
        case false:
            addFav(item.id);
            item.style.backgroundColor = 'red';
            item.dataset.fav = 'true';
            break;
        case true:
            delFav(item.id);
            item.dataset.fav = 'false';
            item.style.backgroundColor = 'white';
            break;
    }
}

squares.forEach((item) => {
    setBackground(item.id);
    item.addEventListener('click', changeBackground);
})