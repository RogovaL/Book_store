import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

import default_book_image from './categories/category_fiction.png';

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,
    default_book_image
}

import category_fiction from './categories/category_fiction.png';
// import category_non_fiction from './categories/category_non_fiction.png';
// import category_mystery from './categories/category_mystery.png';
// import category_biography from './categories/category_biography.png';
// import category_science from './categories/category_science.png';
// import category_fantasy from './categories/category_fantasy.png';

import category_non_fiction from './categories/category_fiction.png';
import category_mystery from './categories/category_fiction.png';
import category_biography from './categories/category_fiction.png';
import category_science from './categories/category_fiction.png';
import category_fantasy from './categories/category_fiction.png';


// Define the book categories
export const book_categories = [
    {
        category_name: "Fiction",
        category_image: category_fiction
    },
    {
        category_name: "Non-Fiction",
        category_image: category_non_fiction 
    },
    {
        category_name: "Mystery",
        category_image: category_mystery 
    },
    {
        category_name: "Biography",
        category_image: category_biography 
    },
    {
        category_name: "Science",
        category_image: category_science 
    },
    {
        category_name: "Fantasy",
        category_image: category_fantasy 
    }
];