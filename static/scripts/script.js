function toggleMenu() {
    const menu = document.getElementById('mobileMenu');

    // Check if the menu element exists before trying to manipulate its style
    if (!menu) {
        console.error("Error: Element with ID 'mobileMenu' not found!");
        return { menu: null, showMenu: () => {}, hideMenu: () => {} }; // Return dummy functions
    }

    const showMenu = () => {
        menu.style.display = 'flex';
        // When menu is shown, add a listener to the document to hide it on clicks outside
        document.addEventListener('click', handleOutsideClick);
    };

    const hideMenu = () => {
        menu.style.display = 'none';
        // When menu is hidden, remove the listener to prevent unnecessary checks
        document.removeEventListener('click', handleOutsideClick);
    };

    // This function will be attached to the document for "click outside" logic
    function handleOutsideClick(event) {
        const hamburger = document.querySelector(".hamburger"); // Get hamburger reference inside the function
        // Check if the click target is NOT the menu itself, AND NOT the hamburger button
        // And ensure the menu is currently visible before hiding
        if (
            !menu.contains(event.target) &&
            !hamburger.contains(event.target) &&
            menu.style.display === 'flex'
        ) {
            hideMenu();
        }
    }

    return { menu, showMenu, hideMenu };
}

// Self-executing function to initialize the menu behavior
(function initMenuBehavior() {
    const hamburger = document.querySelector(".hamburger");
    const menuController = toggleMenu(); // Get the menu element and its controllers

    // Ensure hamburger and menu element exist before adding listeners
    if (!hamburger || !menuController.menu) {
        console.error("Initialization failed: Hamburger or mobileMenu element not found.");
        return; // Exit if elements are missing
    }

    // Listener for the hamburger click to toggle the menu
    hamburger.addEventListener('click', (event) => {
        // Prevent this click from bubbling up and immediately triggering handleOutsideClick
        event.stopPropagation();
        if (menuController.menu.style.display === 'flex') {
            menuController.hideMenu();
        } else {
            menuController.showMenu();
        }
    });

    // Listener for elements with class 'clickHideMenu' to hide the menu
    // These listeners are attached once at the start.
    const bodyClickToHide = document.querySelectorAll('.clickHideMenu');
    bodyClickToHide.forEach(clickElement => {
        clickElement.addEventListener('click', (event) => {
            // Prevent immediate re-showing if this element is inside the menu
            event.stopPropagation();
            if (menuController.menu.style.display === 'flex') {
                menuController.hideMenu();
            }
        });
    });
})();

import {startTypingSequence} from "./typingText.js";
document.addEventListener("DOMContentLoaded", startTypingSequence);
