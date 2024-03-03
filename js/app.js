const loadingSpinner = document.getElementById("loading_spinner");
const left_card_container = document.getElementById("left_card_container");
const latest_post_cart_container = document.getElementById(
  "latest_post_cart_container"
);
const searchField = document.getElementById("searchField");
// GetAllPostData.
const getAllPostData = () => {
  // showLoading-spinner.
  loadingSpinner.classList.remove("hidden");
  setTimeout(async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const postData = data.posts;
    // Send postData to showAllPost function.
    showAllPost(postData);
  }, 2000);
};

// Show All Post data.
const showAllPost = (postData) => {
  // Clear previousData.
  left_card_container.innerHTML = "";

  postData.map((item) => {
    const {
      category,
      image,
      isActive,
      title,
      author,
      description,
      comment_count,
      view_count,
      posted_time,
    } = item;

    console.log(title);

    // Check isActive.
    let color = "";
    if (isActive) {
      color = "bg-green-500";
    } else {
      color = "bg-red-500";
    }

    // Create allPost card.
    const allPostCardDiv = document.createElement("div");
    allPostCardDiv.className = `left_card_item flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-5 p-4 lg:p-8 bg-cardBg rounded-3xl mb-4 shadow-lg`;

    // Card div innerHTML.
    allPostCardDiv.innerHTML = `
            <div class="profile_info relative w-16">
                <div class="w-16 h-16 rounded-xl bg-white">
                  <img
                    class="w-full h-full rounded-xl"
                    src="${image}"
                    alt=""
                  />
                </div>
                <div id="indicator"
                  class="indicator ${color} absolute top-[-5px] right-[-5px]"
                ></div>
              </div>
              <div class="info flex-1">
                <div
                  class="main_info flex gap-3 font_inter font-medium text-sm mb-2"
                >
                  <p>#${category}</p>
                  <p>Author: <span>${author.name}</span></p>
                </div>
                <h2
                  class="title text-base md:text-lg font-bold text-[#12132D] mb-2"
                >
                  ${title}
                </h2>
                <p class="desc font_inter border-b-2 border-dashed mb-4 pb-4">
                  ${description}
                </p>
                <div class="view_info flex justify-between">
                  <div class="flex gap-4 text-[#6C6C7D]">
                    <p>
                      <i class="fa-regular fa-message"></i>
                      <span>${comment_count}</span>
                    </p>

                    <p>
                      <i class="fa-regular fa-eye"></i>
                      <span>${view_count}</span>
                    </p>

                    <p>
                      <i class="fa-regular fa-clock"></i>
                      <span>${posted_time} min</span>
                    </p>
                  </div>
                  <div>
                    <button onclick="clickedCardItem('${title}, ${view_count}')">
                      <i
                        class="fa-regular fa-envelope-open bg-[#10B981] p-2 rounded-full text-white"
                      ></i>
                    </button>
                  </div>
                </div>
            </div>`;
    left_card_container.appendChild(allPostCardDiv);
  });
  // hide loading spinner.
  loadingSpinner.classList.add("hidden");
};

// GetAll Latest PostData.
const getAllLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  showLatestPost(data);
};

// Show LatestPost.
const showLatestPost = async (data) => {
  latest_post_cart_container.innerHTML = "";
  data.map((item) => {
    const { cover_image, profile_image, title, description, author } = item;

    let postDate = "";
    // Check Posted Date.
    author?.posted_date
      ? (postDate = author.posted_date)
      : (postDate = "No publish date");

    // Check designation.
    let designation = "";
    author?.designation
      ? (designation = author.designation)
      : (designation = "Unknown");

    // create a card div.
    const cardDiv = document.createElement("div");
    cardDiv.className = `post_cart border-2 border-[#F3F3F4] p-5 rounded-2xl shadow-lg`;

    // CardDiv InnerHTML.
    cardDiv.innerHTML = `
        <img
        class="rounded-2xl mb-6"
        src="${cover_image}"
        alt="Latest post img"/>

        <div class="info space-y-2">
          <h3 class="text-[#717181]">
            <i class="fa-regular fa-calendar"></i>
            <span>${postDate}</span>
          </h3>
          <h2 class="title text-lg font-extrabold">
            ${title}
          </h2>
          <p class="desc text-[#717181]">
            ${description}
          </p>
        </div>
        <div class="author_info flex gap-3 items-center mt-3">
          <div class="w-12 h-12 rounded-full border border-[#717181] p-[1px]">
            <img class="rounded-full" src="${profile_image}" alt="Profile img" />
          </div>
          <div>
            <h2 class="font-bold">${author.name}</h2>
            <p class="text-[#717181] text-sm">${designation}</p>
          </div>
        </div>`;
    latest_post_cart_container.appendChild(cardDiv);
  });
};

// Get PostData by category.
const getCategoryData = async (category) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
  );

  const data = await res.json();
  const getCategory = data.posts;
  showAllPost(getCategory);
};

// Clicked search BTN.
const searchBtnClicked = () => {
  // Get inputText.
  const inputText = searchField.value;
  // Validation.
  if (!inputText) {
    alert("Please input your search!");
  }
  getCategoryData(inputText);
};

// Clicked card Item.
const clickedCardItem = (title, view_count) => {
  console.log(title, view_count);
};

getAllPostData();
getAllLatestPost();
