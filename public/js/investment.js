
//   <!-- FUNCTION TO ADD ACTIVE TO DAYS CORRECTLY  -->
    document.addEventListener("DOMContentLoaded", function () {
      const daysContainer = document.getElementById("days");
      const daySpans = daysContainer.getElementsByTagName("span");
      const today = new Date().getDay(); // 0 (Sun) to 6 (Sat)

      // Remove any existing 'active' class
      for (let i = 0; i < daySpans.length; i++) {
        daySpans[i].classList.remove("active");
      }

      // Add 'active' to the current day
      daySpans[today].classList.add("active");
    });



    
//   <!-- FUNCTION TO TOGGLE INVESTMENT  -->
    const investBtn = document.getElementById("investBtn");
    const sampleBtn = document.getElementById("sampleBtn");
    const investSection = document.querySelector(".invest-plan");
    const sampleSection = document.querySelector(".categories");

    investBtn.addEventListener("click", () => {
      investBtn.classList.add("active");
      sampleBtn.classList.remove("active");

      investSection.style.display = "block";
      sampleSection.style.display = "none";
    });

    sampleBtn.addEventListener("click", () => {
      sampleBtn.classList.add("active");
      investBtn.classList.remove("active");

      investSection.style.display = "none";
      sampleSection.style.display = "block";
    });





//   <!-- FUCHINTION FOR CHART CANVA  -->
    const chartData = {
      labels: ["S", "M", "T", "W", "T"],
      datasets: [{
        data: [3, 5, 4, 6, 5],
        borderColor: "#00ff88",
        backgroundColor: "transparent",
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        borderWidth: 2
      }]
    };

    const chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { display: false }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      elements: {
        line: {
          borderJoinStyle: "round"
        }
      }
    };

    // Initialize multiple charts
    new Chart(document.getElementById("chat1").getContext("2d"), {
      type: "line",
      data: chartData,
      options: chartOptions
    });

    new Chart(document.getElementById("chat2").getContext("2d"), {
      type: "line",
      data: chartData,
      options: chartOptions
    });

    new Chart(document.getElementById("chat3").getContext("2d"), {
      type: "line",
      data: chartData,
      options: chartOptions
    });

    new Chart(document.getElementById("chat4").getContext("2d"), {
      type: "line",
      data: chartData,
      options: chartOptions
    });

    new Chart(document.getElementById("chat5").getContext("2d"), {
      type: "line",
      data: chartData,
      options: chartOptions
    });