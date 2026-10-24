/**
 * CodeNova Website — Central Configuration & Utilities
 * =====================================================
 * EDIT THIS SECTION to configure your website.
 * All configurable values are in the CONFIG object below.
 */

const CONFIG = {
  // -------------------------------------------------------
  // Site identity
  // -------------------------------------------------------
  SITE_NAME: "CodeNova",

  // -------------------------------------------------------
  // Contact email
  // Set to your real email address before publishing.
  // Leave empty ("") to hide the email button gracefully.
  // Example: "hello@example.com"
  // -------------------------------------------------------
  CONTACT_EMAIL: "",

  // -------------------------------------------------------
  // App download / Play Store URL
  // Set to your Google Play Store URL when the app is live.
  // Leave empty ("") to hide the download button gracefully.
  // Example: "https://play.google.com/store/apps/details?id=com.yourcompany.codenova"
  // -------------------------------------------------------
  APP_DOWNLOAD_URL: "",

  // -------------------------------------------------------
  // Internal page paths (relative — do NOT use leading /)
  // These work correctly on GitHub Pages project sub-URLs
  // e.g. https://USERNAME.github.io/CodeNova-Web/
  // -------------------------------------------------------
  PRIVACY_POLICY_PATH: "privacy-policy.html",
  TERMS_PATH:          "terms.html",
  ABOUT_PATH:          "about.html",
  CONTACT_PATH:        "contact.html",
  HOME_PATH:           "index.html",
};

/* =========================================================
   Navigation helpers
   ========================================================= */

/**
 * Marks the current page's nav link with aria-current="page".
 * Works with relative paths on GitHub Pages sub-directories.
 */
function markCurrentNavLink() {
  const path = window.location.pathname;
  const filename = path.split("/").filter(Boolean).pop() || "index.html";

  document.querySelectorAll(".nav-links a, .site-footer a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const hrefFile = href.split("/").filter(Boolean).pop() || "index.html";

    // Treat root path as index.html
    const isCurrent =
      hrefFile === filename ||
      (filename === "" && hrefFile === "index.html") ||
      (filename === "index.html" && hrefFile === "index.html");

    if (isCurrent && link.closest(".nav-links")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

/* =========================================================
   Mobile navigation toggle
   ========================================================= */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu   = document.getElementById("nav-links");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen.toString());
  });

  // Close menu when a link is tapped
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================================================
   Contact page — email button
   ========================================================= */
function initContactEmail() {
  const btn         = document.getElementById("contact-email-btn");
  const noEmailMsg  = document.getElementById("contact-no-email");
  const emailDisplay = document.getElementById("contact-email-display");

  if (!btn && !noEmailMsg) return; // not on contact page

  if (CONFIG.CONTACT_EMAIL) {
    // Show the button with a real mailto link
    if (btn) {
      btn.setAttribute("href", "mailto:" + CONFIG.CONTACT_EMAIL);
      btn.style.display = "inline-flex";
    }
    if (noEmailMsg)   noEmailMsg.style.display = "none";
    if (emailDisplay) emailDisplay.textContent  = CONFIG.CONTACT_EMAIL;
  } else {
    // No email configured — show the notice, hide the button
    if (btn)          btn.style.display   = "none";
    if (noEmailMsg)   noEmailMsg.style.display = "block";
    if (emailDisplay) emailDisplay.textContent  = "[not configured]";
  }
}

/* =========================================================
   Download button — hide gracefully if URL not set
   ========================================================= */
function initDownloadButton() {
  const btn = document.getElementById("download-btn");
  if (!btn) return;

  if (CONFIG.APP_DOWNLOAD_URL) {
    btn.setAttribute("href", CONFIG.APP_DOWNLOAD_URL);
    btn.style.display = "inline-flex";
  } else {
    btn.style.display = "none";
  }
}

/* =========================================================
   Footer — update copyright year dynamically
   ========================================================= */
function updateCopyrightYear() {
  const el = document.getElementById("copyright-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* =========================================================
   Init — run after DOM is ready
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  try { markCurrentNavLink();   } catch (e) { /* non-fatal */ }
  try { initMobileNav();        } catch (e) { /* non-fatal */ }
  try { initContactEmail();     } catch (e) { /* non-fatal */ }
  try { initDownloadButton();   } catch (e) { /* non-fatal */ }
  try { updateCopyrightYear();  } catch (e) { /* non-fatal */ }
});
