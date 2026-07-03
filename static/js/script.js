// =====================================================
// CREDIT CARD APPROVAL SYSTEM
// script.js (PART 1)
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // PAGE LOADER (3 Seconds)
    // ==========================================

    const loader = document.getElementById("loader");

    if (loader) {

        document.body.style.overflow = "hidden";

        setTimeout(function () {

            loader.style.transition = "opacity 0.6s ease";

            loader.style.opacity = "0";

            setTimeout(function () {

                loader.style.display = "none";

                document.body.style.overflow = "auto";

            }, 600);

        }, 3000);

    }

    // ==========================================
    // PREDICTION LOADER
    // ==========================================

    const form = document.getElementById("predictForm");

    const predictLoader = document.getElementById("predictLoader");

    if (form && predictLoader) {

        form.addEventListener("submit", function (e) {

            // ---------- Validation ----------

            const age = Number(document.querySelector("[name='Age']").value);

            const income = Number(document.querySelector("[name='Annual_Income']").value);

            const score = Number(document.querySelector("[name='Credit_Score']").value);

            const emp = Number(document.querySelector("[name='Employment_Years']").value);

            const dependents = Number(document.querySelector("[name='Number_of_Dependents']").value);

            const months = Number(document.querySelector("[name='Months_at_Address']").value);

            const creditLines = Number(document.querySelector("[name='Total_Credit_Lines']").value);

            const utilization = Number(document.querySelector("[name='Credit_Utilization']").value);

            const dti = Number(document.querySelector("[name='Debt_to_Income_Ratio']").value);

            const defaults = Number(document.querySelector("[name='Prior_Defaults']").value);

            if (age < 18) {

                alert("Applicant age must be at least 18 years.");

                e.preventDefault();

                return;

            }

            if (score < 300 || score > 900) {

                alert("Credit Score should be between 300 and 900.");

                e.preventDefault();

                return;

            }

            if (income <= 0) {

                alert("Enter a valid Annual Income.");

                e.preventDefault();

                return;

            }

            if (emp < 0) {

                alert("Employment Years cannot be negative.");

                e.preventDefault();

                return;

            }

            if (dependents < 0) {

                alert("Dependents cannot be negative.");

                e.preventDefault();

                return;

            }

            if (months < 0) {

                alert("Months at Address cannot be negative.");

                e.preventDefault();

                return;

            }

            if (creditLines < 0) {

                alert("Credit Lines cannot be negative.");

                e.preventDefault();

                return;

            }

            if (utilization < 0 || utilization > 100) {

                alert("Credit Utilization must be between 0 and 100.");

                e.preventDefault();

                return;

            }

            if (dti < 0 || dti > 100) {

                alert("Debt-to-Income Ratio must be between 0 and 100.");

                e.preventDefault();

                return;

            }

            if (defaults < 0) {

                alert("Prior Defaults cannot be negative.");

                e.preventDefault();

                return;

            }

            // ---------- Show Loading ----------

            predictLoader.style.display = "flex";

        });

    }

    // ==========================================
    // INPUT ANIMATION
    // ==========================================

    const inputs = document.querySelectorAll("input, select");

    inputs.forEach(function (input) {

        input.addEventListener("focus", function () {

            input.style.transform = "scale(1.02)";

            input.style.transition = ".3s";

        });

        input.addEventListener("blur", function () {

            input.style.transform = "scale(1)";

        });

    });

});
// =====================================================
// SCRIPT.JS (PART 2)
// Charts + Result Animation
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // PIE CHART
    // ==========================================

    const approvedInput = document.getElementById("approvedValue");
    const rejectedInput = document.getElementById("rejectedValue");
    const pieCanvas = document.getElementById("resultChart");

    if (approvedInput && rejectedInput && pieCanvas) {

        const approved = Number(approvedInput.value);
        const rejected = Number(rejectedInput.value);

        new Chart(pieCanvas, {

            type: "pie",

            data: {

                labels: [

                    "Approved",

                    "Rejected"

                ],

                datasets: [{

                    data: [

                        approved,

                        rejected

                    ],

                    backgroundColor: [

                        "#22c55e",

                        "#ef4444"

                    ],

                    borderColor: [

                        "#ffffff",

                        "#ffffff"

                    ],

                    borderWidth: 3

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    // ==========================================
    // BAR CHART
    // ==========================================

    const barCanvas = document.getElementById("barChart");

    if (approvedInput && rejectedInput && barCanvas) {

        const approved = Number(approvedInput.value);
        const rejected = Number(rejectedInput.value);

        new Chart(barCanvas, {

            type: "bar",

            data: {

                labels: [

                    "Approved",

                    "Rejected"

                ],

                datasets: [{

                    label: "Probability %",

                    data: [

                        approved,

                        rejected

                    ],

                    backgroundColor: [

                        "#2563eb",

                        "#ef4444"

                    ],

                    borderRadius: 10

                }]

            },

            options: {

                responsive: true,

                scales: {

                    y: {

                        beginAtZero: true,

                        max: 100

                    }

                }

            }

        });

    }

    // ==========================================
    // PROGRESS BAR ANIMATION
    // ==========================================

    const progress = document.querySelector(".progress-fill");

    if (progress) {

        const finalWidth = progress.style.width;

        progress.style.width = "0%";

        setTimeout(function () {

            progress.style.transition = "width 2s ease";

            progress.style.width = finalWidth;

        }, 300);

    }

    // ==========================================
    // RESULT CARD ANIMATION
    // ==========================================

    const statusCard = document.querySelector(".status-card");

    if (statusCard) {

        statusCard.style.opacity = "0";

        statusCard.style.transform = "translateY(40px)";

        setTimeout(function () {

            statusCard.style.transition = "all .8s";

            statusCard.style.opacity = "1";

            statusCard.style.transform = "translateY(0px)";

        }, 300);

    }

    // ==========================================
    // STATUS GLOW
    // ==========================================

    const approved = document.querySelector(".approved");

    const rejected = document.querySelector(".rejected");

    if (approved) {

        approved.style.boxShadow = "0 0 25px rgba(34,197,94,.4)";

        approved.style.borderRadius = "15px";

        approved.style.padding = "20px";

    }

    if (rejected) {

        rejected.style.boxShadow = "0 0 25px rgba(239,68,68,.4)";

        rejected.style.borderRadius = "15px";

        rejected.style.padding = "20px";

    }

    // ==========================================
    // AUTO SCROLL TO RESULT
    // ==========================================

    if (statusCard) {

        statusCard.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

});
// =====================================================
// SCRIPT.JS (PART 3)
// Dark Mode + UI Effects
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // DARK MODE
    // ==========================================

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {

        themeBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            const icon = themeBtn.querySelector("i");

            if (document.body.classList.contains("dark")) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

            }

        });

    }

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    // ==========================================
    // RIPPLE EFFECT
    // ==========================================

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = button.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            button.appendChild(ripple);

            setTimeout(function () {

                ripple.remove();

            }, 600);

        });

    });

    // ==========================================
    // TYPING EFFECT
    // ==========================================

    const heading = document.querySelector(".hero-left h1");

    if (heading) {

        const text = heading.innerText;

        heading.innerHTML = "";

        let i = 0;

        function type() {

            if (i < text.length) {

                heading.innerHTML += text.charAt(i);

                i++;

                setTimeout(type, 50);

            }

        }

        type();

    }

    // ==========================================
    // FADE-IN EFFECT
    // ==========================================

    const cards = document.querySelectorAll(

        ".left-card, .right-card, .info-card, .status-card, .summary-card, .details-card, .chart-card, .tips-card, .reason-card"

    );

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: 0.15

    });

    cards.forEach(function (card) {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all .7s ease";

        observer.observe(card);

    });

    // ==========================================
    // INPUT PLACEHOLDER COLOR
    // ==========================================

    const inputs = document.querySelectorAll("input");

    inputs.forEach(function (input) {

        input.addEventListener("focus", function () {

            input.style.borderColor = "#2563eb";

        });

        input.addEventListener("blur", function () {

            input.style.borderColor = "#cbd5e1";

        });

    });

    // ==========================================
    // FORM RESET CONFIRMATION
    // ==========================================

    const resetBtn = document.querySelector(".reset-btn");

    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            setTimeout(function () {

                alert("Form has been reset.");

            }, 100);

        });

    }

    // ==========================================
    // WELCOME MESSAGE
    // ==========================================

    console.log("Credit Card Approval Prediction System Loaded Successfully.");

});