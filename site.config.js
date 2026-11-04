/*
  Yokai House — site content.
  Everything shown on the site lives here. Values marked TODO are
  placeholders: replace them with the real details from the shop's Instagram.
*/
window.SITE = {
  name: "Yokai House",
  tagline: "Tattoo studio — San Diego, CA",
  instagram: "yokaihouse", // TODO: confirm the exact Instagram handle (no @)
  email: "",               // TODO: booking email, or leave empty to book by Instagram DM only
  address: "",             // TODO: e.g. "1234 Street Name, San Diego, CA 921xx"
  hours: "By appointment",
  intro:
    "Custom tattoos by appointment. Send us your idea, placement and size — we'll take it from there.", // TODO: swap for the shop's own bio

  // Artists. handle = their personal Instagram (no @). Leave the list empty to hide the section.
  artists: [
    // { name: "Name", handle: "artisthandle", styles: "Japanese, blackwork" },
  ],

  // Portfolio. Save photos from the Instagram into assets/work/ and list them here.
  // If this is empty, the gallery shows numbered empty frames that link to Instagram.
  work: [
    // { src: "assets/work/01.jpg", alt: "Black and grey koi sleeve", artist: "Name" },
  ],

  faq: [
    ["Walk-ins?", "Appointment first. Open flash days are announced on Instagram."],
    ["Deposit?", "A deposit holds your date and goes toward the final price."],
    ["Age?", "18+ with valid photo ID. No exceptions."],
    ["Cover-ups?", "Yes — send a clear photo of the existing tattoo with your request."],
  ],
};
