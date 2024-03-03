const loadingSpinner = document.getElementById("loading_spinner");
const left_card_container = document.getElementById("left_card_container");
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

  // hide loading spinner.
  loadingSpinner.classList.add("hidden");
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
                    <button>
                      <i
                        class="fa-regular fa-envelope-open bg-[#10B981] p-2 rounded-full text-white"
                      ></i>
                    </button>
                  </div>
                </div>
            </div>`;
    left_card_container.appendChild(allPostCardDiv);
  });
};

getAllPostData();
