// Single source of truth for contact details. Every WhatsApp CTA carries
// its own pre-filled message so incoming chats show which part of the site
// they came from.
export const WA_NUMBER = "56957591164";
export const WA_DISPLAY = "+56 9 5759 1164";
export const EMAIL = "pablo.cornejo.v@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/pablo-cornejo-villarroel-43973a59/";

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
