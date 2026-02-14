'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

const updateFormStatus = function (message, type) {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.classList.remove("success", "error");
  if (type) {
    formStatus.classList.add(type);
  }
}

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      updateFormStatus("Please complete all required fields correctly.", "error");
      return;
    }

    const fullNameInput = form.querySelector("[name='fullname']");
    const emailInput = form.querySelector("[name='email']");
    const messageInput = form.querySelector("[name='message']");
    const companyInput = form.querySelector("[name='company']");

    const payload = {
      fullName: fullNameInput ? fullNameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      message: messageInput ? messageInput.value.trim() : "",
      company: companyInput ? companyInput.value.trim() : "",
      source: "portfolio-web",
    };

    try {
      formBtn.classList.add("is-loading");
      formBtn.setAttribute("disabled", "");
      updateFormStatus("Sending message...", "");

      const controller = new AbortController();
      let timeoutId = setTimeout(function () {
        controller.abort();
      }, 15000);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });
      clearTimeout(timeoutId);
      timeoutId = null;

      const raw = await response.text();
      const contentType = response.headers.get("content-type") || "";
      let result = null;

      if (contentType.includes("application/json")) {
        try {
          result = JSON.parse(raw);
        } catch (parseError) {
          throw new Error("Invalid API response format.");
        }
      } else {
        throw new Error("Server returned non-JSON response. Please refresh and try again.");
      }

      if (!response.ok || !result.success) {
        const details = Array.isArray(result.errors) ? result.errors.join(" ") : "";
        throw new Error(details || result.message || "Unable to send your message right now.");
      }

      form.reset();
      updateFormStatus("Message received successfully. Email delivery is in progress.", "success");
    } catch (error) {
      if (error.name === "AbortError") {
        updateFormStatus("Request timed out. Please try again.", "error");
      } else if (typeof error.message === "string" && error.message.includes("Unexpected token")) {
        updateFormStatus("Server returned an invalid response. Please refresh and try again.", "error");
      } else {
        updateFormStatus(error.message || "Failed to send message. Please try again.", "error");
      }
    } finally {
      formBtn.classList.remove("is-loading");
      if (!form.checkValidity()) {
        formBtn.setAttribute("disabled", "");
      } else {
        formBtn.removeAttribute("disabled");
      }
    }
  });
}

const trackableDownloads = document.querySelectorAll("[data-download-track='true']");

for (let i = 0; i < trackableDownloads.length; i++) {
  trackableDownloads[i].addEventListener("click", function () {
    const link = this;
    const fileName = link.getAttribute("href") ? link.getAttribute("href").split("/").pop() : "";

    const payload = {
      label: link.dataset.downloadLabel || "Portfolio Download",
      fileName,
      section: link.dataset.downloadSection || "general",
    };

    fetch("/api/downloads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(function () {
      // Download tracking is best-effort and should not block user actions.
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
