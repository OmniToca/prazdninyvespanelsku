export const photos = {
  hero: "/media/1-scaled.jpg",
  terraceSofa: "/media/02-scaled.jpg",
  terraceSea: "/media/1-scaled.jpg",
  living: "/media/10-scaled.jpg",
  bedroomTropical: "/media/11-scaled.jpg",
  bedroomTropicalDetail: "/media/3-scaled.jpg",
  bedroomRed: "/media/14-scaled.jpg",
  bathroom: "/media/12-scaled.jpg",
  bathroom2: "/media/15-scaled.jpg",
  kitchen: "/media/16-scaled.jpg",
  santaPolaSign: "/media/01.jpg",
  port: "/media/4.jpg",
  tabarca: "/media/7.jpg",
  lighthouse: "/media/25.jpg",
  market: "/media/22.jpg",
  welcomeGift: "/media/Micek.jpg",
  owner: "/media/Micek.jpg",
} as const;

export const apartmentGallery = [
  { src: photos.living, altKey: "apartment.gallery.living" },
  { src: photos.kitchen, altKey: "apartment.gallery.kitchen" },
  { src: photos.terraceSea, altKey: "apartment.gallery.terrace" },
  { src: photos.terraceSofa, altKey: "apartment.gallery.terraceSofa" },
  { src: photos.bedroomTropical, altKey: "apartment.gallery.bedroom1" },
  { src: photos.bedroomRed, altKey: "apartment.gallery.bedroom2" },
  { src: photos.bathroom, altKey: "apartment.gallery.bath1" },
  { src: photos.bathroom2, altKey: "apartment.gallery.bath2" },
] as const;

export const homeMosaic = [
  photos.living,
  photos.kitchen,
  photos.bedroomTropical,
  photos.terraceSofa,
] as const;
