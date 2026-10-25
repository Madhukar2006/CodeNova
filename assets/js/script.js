```javascript
/* =========================================
   POCKET COMPILER
   Website JavaScript
   File: assets/js/script.js
========================================= */

"use strict";

/* 1. Helper Functions */

const select = (selector, parent = document) =>
    parent.querySelector(selector);

const selectAll = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


/* 2. Mobile Navigation */

function initMobileNavigation() {
    const menuToggle = select(".menu-toggle");
    const navMenu = select(".nav-menu");

    if (!menuToggle || !navMenu) return;

    function closeMenu() {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("menu-open");
    }

    function openMenu() {
        navMenu.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("menu-open");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close the menu after selecting a navigation link.
    selectAll("a", navMenu).forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    // Support the Escape key.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Reset navigation when returning to desktop layout.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });
}


/* 3. Active Navigation Link */

function initActiveNavigation() {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    selectAll(".nav-link, .footer-links a, .footer-legal-links a")
        .forEach((link) => {
            const href = link.getAttribute("href");

            if (!href) return;

            try {
                const linkUrl = new URL(href, window.location.href);

                const linkPage =
                    linkUrl.pathname.split("/").pop() || "index.html";

                if (
                    linkUrl.origin === window.location.origin &&
                    linkPage === currentPage
                ) {
                    if (link.classList.contains("nav-link")) {
                        link.setAttribute("aria-current", "page");
                    }
                }
            } catch (error) {
                console.warn(
                    "Could not process navigation link:",
                    href
                );
            }
        });
}


/* 4. Dynamic Copyright Year */

function initCopyrightYear() {
    selectAll("[data-current-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}


/* 5. FAQ Accordion */

function initFaqAccordion() {
    const questions = selectAll(".faq-question");

    questions.forEach((question) => {
        const answerId = question.getAttribute("aria-controls");

        const answer = answerId
            ? document.getElementById(answerId)
            : question.nextElementSibling;

        if (!answer) return;

        // Set the initial state.
        const initiallyExpanded =
            question.getAttribute("aria-expanded") === "true";

        question.setAttribute(
            "aria-expanded",
            String(initiallyExpanded)
        );

        answer.hidden = !initiallyExpanded;

        question.addEventListener("click", () => {
            const isExpanded =
                question.getAttribute("aria-expanded") === "true";

            // Close other questions in the same accordion.
            const accordion = question.closest(".faq-list");

            if (accordion) {
                selectAll(".faq-question", accordion).forEach(
                    (otherQuestion) => {
                        if (otherQuestion === question) return;

                        const otherAnswerId =
                            otherQuestion.getAttribute("aria-controls");

                        const otherAnswer = otherAnswerId
                            ? document.getElementById(otherAnswerId)
                            : otherQuestion.nextElementSibling;

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        if (otherAnswer) {
                            otherAnswer.hidden = true;
                        }
                    }
                );
            }

            question.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            answer.hidden = isExpanded;
        });
    });
}


/* 6. Contact Form Validation */

function initContactForm() {
    const form = select("#contact-form");

    if (!form) return;

    const status = select("#form-status", form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (status) {
            status.textContent = "";
            status.className = "";
        }

        // Use built-in browser validation.
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const nameInput = select('[name="name"]', form);
        const emailInput = select('[name="email"]', form);
        const messageInput = select('[name="message"]', form);

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const message = messageInput?.value.trim() || "";

        if (!name || !email || !message) {
            showFormStatus(
                status,
                "Please complete all required fields.",
                "error"
            );

            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus(
                status,
                "Please enter a valid email address.",
                "error"
            );

            emailInput?.focus();
            return;
        }

        /*
         * IMPORTANT:
         * Frontend validation does not send messages.
         *
         * Connect this form to a real, configured backend
         * or form service before publishing it.
         *
         * Until then, offer a mailto fallback only when a
         * real support email has been configured.
         */

        const supportEmail =
            form.dataset.supportEmail?.trim() || "";

        if (
            supportEmail &&
            isValidEmail(supportEmail) &&
            !supportEmail.includes("example.com")
        ) {
            const subject = encodeURIComponent(
                `Pocket Compiler Support: ${name}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );

            const mailtoUrl =
                `mailto:${supportEmail}` +
                `?subject=${subject}&body=${body}`;

            window.location.href = mailtoUrl;

            showFormStatus(
                status,
                "Your email application should open. Please review and send your message there.",
                "success"
            );

            return;
        }

        showFormStatus(
            status,
            "The form is not connected yet. Please configure a real support email or connect a form service before publishing.",
            "error"
        );
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormStatus(status, message, type) {
    if (!status) {
        window.alert(message);
        return;
    }

    status.textContent = message;
    status.className =
        type === "success" ? "form-success" : "form-error";

    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
}


/* 7. Back to Top */

function initBackToTop() {
    const button = select("[data-back-to-top]");

    if (!button) return;

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* 8. External Links Safety */

function initExternalLinks() {
    selectAll('a[target="_blank"]').forEach((link) => {
        const relValues = new Set(
            (link.getAttribute("rel") || "")
                .split(/\s+/)
                .filter(Boolean)
        );

        relValues.add("noopener");
        relValues.add("noreferrer");

        link.setAttribute("rel", [...relValues].join(" "));
    });
}


/* 9. Code Tabs */

function initCodeTabs() {
    const tabGroups = selectAll("[data-code-tabs]");

    tabGroups.forEach((group) => {
        const tabs = selectAll(".code-tab", group);
        const panels = selectAll("[data-code-panel]", group);

        if (!tabs.length || !panels.length) return;

        function activateTab(tab) {
            const target = tab.dataset.codeTarget;

            tabs.forEach((item) => {
                const active = item === tab;

                item.classList.toggle("active", active);
                item.setAttribute(
                    "aria-selected",
                    String(active)
                );

                item.setAttribute(
                    "tabindex",
                    active ? "0" : "-1"
                );
            });

            panels.forEach((panel) => {
                panel.hidden =
                    panel.dataset.codePanel !== target;
            });
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                activateTab(tab);
            });

            tab.addEventListener("keydown", (event) => {
                let nextIndex = index;

                if (event.key === "ArrowRight") {
                    nextIndex = (index + 1) % tabs.length;
                } else if (event.key === "ArrowLeft") {
                    nextIndex =
                        (index - 1 + tabs.length) % tabs.length;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = tabs.length - 1;
                } else {
                    return;
                }

                event.preventDefault();

                tabs[nextIndex].focus();
                activateTab(tabs[nextIndex]);
            });
        });

        const initialTab =
            tabs.find((tab) => tab.classList.contains("active")) ||
            tabs[0];

        activateTab(initialTab);
    });
}


/* 10. Initialize Website */

function initWebsite() {
    initMobileNavigation();
    initActiveNavigation();
    initCopyrightYear();
    initFaqAccordion();
    initContactForm();
    initBackToTop();
    initExternalLinks();
    initCodeTabs();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initWebsite,
        { once: true }
    );
} else {
    initWebsite();
}
```
