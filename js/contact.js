/* Contact form: validates the fields and confirms the message.
   There is no server behind this project, so nothing is emailed —
   the message is kept in localStorage ("contactMessages").
   To receive real messages, point the form at a service such as
   Formspree / EmailJS or your own backend. */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    message: (v) =>
      v.trim().length >= 10 ? "" : "Please write at least 10 characters.",
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;

    const error = rule(input.value);
    const field = input.closest(".field");
    field.classList.toggle("invalid", Boolean(error));
    field.querySelector(".err").textContent = error;
    input.setAttribute("aria-invalid", Boolean(error));
    return !error;
  }

  form.querySelectorAll("input, textarea").forEach(function (input) {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const results = inputs.map(validateField);
    if (results.includes(false)) {
      inputs[results.indexOf(false)].focus();
      status.className = "form-status error";
      status.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    const f = form.elements; // (form.name would return the form's own name attribute)
    const sender = f["name"].value.trim();

    try {
      const saved = JSON.parse(localStorage.getItem("contactMessages")) || [];
      saved.push({
        name: sender,
        email: f["email"].value.trim(),
        order: f["order"].value.trim(),
        message: f["message"].value.trim(),
        sentAt: new Date().toISOString(),
      });
      localStorage.setItem("contactMessages", JSON.stringify(saved));
    } catch (err) {
      /* storage unavailable — still confirm to the visitor */
    }

    status.className = "form-status success";
    status.textContent =
      "Thank you, " + sender + "! Your message has been received — we'll reply within one or two days.";
    form.reset();
    showToast("Message sent!");
  });
});
