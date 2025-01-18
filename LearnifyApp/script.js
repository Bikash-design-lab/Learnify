let courses = []
let currentPage = 1;
let limit = 10;

function fetchData() {
    fetch("https://learnifyapp-6423a-default-rtdb.firebaseio.com/courses.json")
        .then((res) => res.json())
        .then((data) => {
            courses = Object.entries(data);
            displayData(courses);
            pagination()
        })
}
fetchData()
function displayData(data) {
    console.log(data)
    let start = (currentPage - 1) * limit;
    let end = start + limit;
    console.log(start, end)
    let paginatedData = data.slice(start, end);
    document.querySelector(".Container").innerHTML = ""
    paginatedData.forEach((ele) => {
        // console.log(ele)
        let id = ele[0]
        let { instructor, level, price, rating, reviews, status, title, totalHours, totalLectures } = ele[1];
        document.querySelector(".Container").innerHTML +=
            `   <div class="card" key = ${id}>
                <div class="card-header">
                    ${title}
                </div>
                <div class="card-body">
                    <p><strong><i class="fas fa-chalkboard-teacher"></i>Instructor: </strong>${instructor}</p>
                    <p><strong><i class="fas fa-book"></i>Total Lectures: </strong>${totalLectures}</p>
                    <p><strong><i class="fas fa-graduation-cap"></i>Level: </strong>${level}</p>
                    <p class="price"><strong>Price: </strong>₹${price}</p>
                    <p><strong><i class="fas fa-clock"></i>Total Hours: </strong>${totalHours} hours</p>
                    <div class="badge">${status}</div>
                </div>
                <div class="card-footer">
                    <div class="rating">
                        <span class="star">★</span>
                        <span>${rating}</span>
                    </div>
                    <span><i class="fas fa-comment-dots"></i>${reviews.toLocaleString()} reviews</span>
                </div>
                <button class="addCartButton">Add to cart</button>
            </div>
        `
    })
}
document.querySelector(".filterByLevel").addEventListener("change", handleFilterByLevel);
function handleFilterByLevel() {
    let courseLevel = document.querySelector(".filterByLevel").value;
    console.log(courseLevel)
    let filteredCourses;
    if (courseLevel === "All") {
        filteredCourses = courses;
    }
    else {
        filteredCourses = courses.filter(function (elem) {
            return courseLevel === elem[1].level
        })
    }
    // console.log(filteredCourses)
    displayData(filteredCourses)
}
function searchByTitle() {
    let searchInput = document.querySelector(".searchCoursesByTitle").value.toLowerCase()
    // console.log(searchInput)
    let searchedCourses = courses.filter(function (elem) {
        return elem[1].title.toLowerCase().includes(searchInput)
    })
    displayData(searchedCourses)
}
function pagination() {
    let itemEachPage = Math.ceil(courses.length / limit);
    const paginationUl = document.querySelector("ul");

    // Clear existing pagination items
    paginationUl.innerHTML = "";

    for (let i = 1; i <= itemEachPage; i++) {
        let pageItems = document.createElement("li");
        pageItems.innerText = i;

        // Add a click event listener
        pageItems.addEventListener("click", function () {
            currentPage = i;
            console.log(currentPage);

            // Remove 'active' class from all items
            const allItems = paginationUl.querySelectorAll("li");
            allItems.forEach(item => item.classList.remove("active"));

            // Add 'active' class to the clicked item
            pageItems.classList.add("active");

            // Display the data for the current page
            displayData(courses);
        });

        // Optionally, set the first page as active initially
        if (i === 1) {
            pageItems.classList.add("active");
        }

        paginationUl.appendChild(pageItems);
    }
}
