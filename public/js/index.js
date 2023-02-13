var nav = document.getElementById("nav");

function navFunction() {
    if (nav.className === "nav-top") {
      nav.className += " responsive";
    } else {
      nav.className = "nav-top";
    }
}

// Add style to the clicked button on the navigation bar
document.addEventListener("DOMContentLoaded", function () {
    // When a user clicks on one of the nav buttons
    $("div.nav-top > div > a").click(function () {
        // remove the class from current active navigation button
        $("div.nav-top > div > a").removeClass("active");
        // and add it to the currently selected one
        $(this).addClass("active");
    });
});

// Checks if an element is in the viewport of the browser
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    // Rerturns true if the element is visible
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Navigation automatically update the buttons
document.addEventListener("DOMContentLoaded", function () {
    // Finds elements with the class "section"
    const sections = document.getElementsByClassName("section")
    // When the user is scrolling it checks if the any of the sections are inside the viewport
    document.addEventListener("scroll", function () {
        for (let item of sections) {
            const id = item.id;
            const navEle = $("div.nav-top > div > a");
            // if the elements are in the viewport inside the navigation change the active class on the appropriate button
            if (isInViewport(item)) {
                navEle.removeClass("active");
                $("div.nav-top > div > a." + id).addClass("active");

            }
        }
    })
});

// Skill bar animation
document.addEventListener("scroll", function () {
    // for each element with the "upper-color" class
    $(".upper-color").each(function () {
        // Checks if the user can see the bar and it does not have the "visible" class
        if (isInViewport($(this)[0]) && !$(this).hasClass("visible")){
            $(this).addClass("visible");
            // Changes the width depending on the value written in the html
            $(this).animate({width:$(this)[0].innerText}, 2500);
            // Get the current bar's total width percentage
            const endWidth = parseInt($(this)[0].innerText.replace("%", ""));
            // start the text animation from 0
            let startWidth = 0
            // how long should the text animation run for
            const interval = 2500 / (endWidth - startWidth);
            // Set the interval for the animation of the text
            const myInterval = setInterval(() => {
                // Change the font size so it becomes visible on the activation of the animation
                $(this).css("font-size", "15px");
                // incriment the width
                startWidth++;
                // Change the text with the appropriate percentage
                $(this).text(startWidth + "%");
                // stop the animation when the current width reaches the end width
                if (startWidth == endWidth) {
                    clearInterval(myInterval);
                }
            }, interval);
        }
    })
})



// Scroll progress bar
document.addEventListener("DOMContentLoaded", function () {
    // Select the progress bar
    const progressBar = document.querySelector(".progressBar");

    // Event listener for scrolling
    window.addEventListener("scroll", function () {
        let h = document.documentElement;
        // checks how far the user scrolled from the top. Or is added for compatability
        let scrollTop = h.scrollTop || document.body.scrollTop;
        // get the document height
        let scrollHeight = h.scrollHeight || document.body.scrollHeight;
        // Divide from the value of where the user scrolled by the maximum height and times it by 100 to get percentage
        let percent = scrollTop / (scrollHeight - h.clientHeight) * 100;
        // Change the width of the progress bar with the calculated percentage
        progressBar.style.width = percent + "%"
    })
})
