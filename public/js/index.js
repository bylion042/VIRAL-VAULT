// HAMBURGER
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".hold3");
    const foldIcon = hamburger.querySelector("i:nth-child(1)");
    const unfoldIcon = document.querySelector(".hold3 .hamburger i");
  
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("open");
  
      // Toggle the visibility of the icons (show fold/unfold)
      if (menu.classList.contains("open")) {
        foldIcon.style.display = "none";
        unfoldIcon.style.display = "block"; // Show unfold icon when menu is open
      } else {
        foldIcon.style.display = "block";
        unfoldIcon.style.display = "none"; // Show fold icon when menu is closed
      }
    });
  
    // Close the menu when the unfold icon is clicked
    unfoldIcon.addEventListener("click", () => {
      menu.classList.remove("open");
      foldIcon.style.display = "block";
      unfoldIcon.style.display = "none";
    });
  });
  
  
  
  
  
  // SWEET ALART THAT WELCOMES THE USER 
  // document.addEventListener("DOMContentLoaded", function () {
  //   Swal.fire({
  //     title: "Gift Card Wave",
  //     html: "Before selling your gift cards, make sure to check the current rates to get the best value in return. Use our calculator to find out how much your card is worth.",
  //     icon: "info",
  //     showCancelButton: false,  // Remove the cancel button
  //     showConfirmButton: true,
  //     confirmButtonText: "Check Rate",
  //     confirmButtonColor: "#3085d6",
  //     width: "400px",
  //     didOpen: () => {
  //       document.querySelector(".swal2-title").style.fontSize = "16px";
  //       document.querySelector(".swal2-title").style.lineHeight = "1.4";
  //       document.querySelector(".swal2-html-container").style.fontSize = "14px";
  //       document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
  //       document.querySelector(".swal2-confirm").style.fontSize = "13px";
  //       document.querySelector(".swal2-confirm").style.padding = "8px 16px";
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.href = "/calculator";
  //     }
  //   });
  // });
  

  
  
  
  
  
  //  POPS UP ONCE YOU ARE IN THE WEB 
  window.onload = function () {
    const messages = [
      "Welcome to Viral Vault!",
  "Invest smart, monetize your influence.",
  "Earn daily returns and grow your online presence.",
  "Your vault for digital income and opportunities.",
  "Turn your social activity into real cash.",
  "With Viral Vault, your content pays you back.",
  "A smarter way to invest and monetize online.",
  "Start small, grow big—invest and earn daily.",
  "Cash in on your social time with Viral Vault.",
  "The future of investing meets creator monetization.",
  "Don’t scroll for free—get paid to engage.",
  "Build your digital wealth, one click at a time.",
  "Secure, rewarding, and user-focused.",
  "Your gateway to online income and financial freedom.",
  "Join Viral Vault and turn influence into income!"
    ];
  
    let messageIndex = 0;
  
    function showNextMessage() {
      Toastify({
        text: messages[messageIndex],
        duration: 5000,
        gravity: "bottom",
        position: "left",
        backgroundColor: "#c5a057",
      }).showToast();
  
      messageIndex++;
  
      if (messageIndex >= messages.length) {
        clearInterval(messageInterval);
      }
    }
    const messageInterval = setInterval(showNextMessage, 7000);
  };
  
  
  
  
  
  
  // SCROLL TO TOP BUTTON
  document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
    // Show the button when scrolling down, hide when at the top
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {  // When the user scrolls down 200px
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
  
    // Scroll to the top of the page when the button is clicked
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling
      });
    });
  });





  // ALL ABOUT F ASKED Q 
  document.addEventListener("DOMContentLoaded", function () {
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach(item => {
          item.addEventListener("click", function () {
              this.classList.toggle("active");
          });
      });
  });

