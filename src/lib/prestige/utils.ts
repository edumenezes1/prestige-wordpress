/**
 * Jumps to the contact section instantly.
 */
export function jumpToContact() {
  const target = document.getElementById("contact");
  if (target) {
    const headerHeight = 76;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "auto" });
    window.history.pushState(null, "", "#contact");
  }
}
