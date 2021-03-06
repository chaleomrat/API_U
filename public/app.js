const addImagestoGallery = (res) => {
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.results.forEach((element) => {
    html += `
    <section class="photo">
    <header class="photo__header">
      <div class="photo__header-column">
       <a href="profile.html?username=${element.user.username}">
        <img class="photo__avatar" src="${element.user.profile_image.medium}"/>
        </a>
      </div>
      <div class="photo__header-column">
      <a href="profile.html?username=${element.user.username}">
        <span class="photo__username">${element.user.name}</span>
          </a>
      </div>
    </header>
    <div class="photo__file-container">
      <img class="photo__file" src="${element.user.profile_image.large}"/>
    </div>
    <div class="photo__info">
      <div class="photo__icons">
        <span class="photo__icon">
          <i class="fa fa-heart-o heart fa-lg"></i>
        </span>
        <span class="photo__icon">
          <i class="fa fa-comment-o fa-lg"></i>
        </span>
      </div>
      <span class="photo__likes">${element.likes} likes</span>
      <div class="photo__comments">
        <div class="photo__comment">
          <span class="photo__comment-author">${element.user.name}</span>${element.description}
        </div>
      </div>
    </div>
  </section>  
    `;
  });
  gallery.innerHTML = html;
};

const callAPI = async (keyword) => {
  try {
    console.log("keyword --> ", keyword);
    const response = await fetch("/api/searchPhotos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
//6. Add images to gallery
    addImagestoGallery(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};


const removeAllPhoto = () => {
  const galleryElement = document.querySelector(".gallery");
  galleryElement.innerHTML = "";
};

const searchPhoto = (event) => {
  const keyword = event.target.value;
  if (event.key === "Enter" && keyword) {
    removeAllPhoto();
    //5. Call API
    callAPI(keyword);
  }
};
const main = () => {
  const inputElement = document.querySelector(".search");
  inputElement.addEventListener("keydown", searchPhoto);
};

main();
var textWrapper = document.querySelector(".ml1 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml1 .letter",
    scale: [0.3, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i + 1),
  })
  .add({
    targets: ".ml1 .line",
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: "-=875",
    delay: (el, i, l) => 80 * (l - i),
  })
  .add({
    targets: ".ml1",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });