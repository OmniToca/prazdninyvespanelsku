import type { Locale } from "@/i18n/routing";
import { photos } from "./media";

export const placeCategories = ["beach", "table", "shop", "museum", "trip"] as const;
export type PlaceCategory = (typeof placeCategories)[number];

type Copy = Record<Locale, string>;

function copy(cs: string, en: string, es: string, de: string, fr: string): Copy {
  return { cs, en, es, de, fr };
}

export type Place = {
  slug: string;
  category: PlaceCategory;
  name: string;
  mapsUrl: string;
  image: string;
  line: Copy;
  note: Copy;
};

export const places: Place[] = [
  {
    slug: "platja-de-llevant",
    category: "beach",
    name: "Platja de Llevant",
    mapsUrl: "https://maps.app.goo.gl/eiuhoGaPX5ZVszhv6",
    image: photos.santaPolaSign,
    line: copy(
      "Nejbližší pláž — tři minuty od domu, pozvolný vstup.",
      "The nearest beach — three minutes from the apartment, a gentle entry.",
      "La playa más cercana: tres minutos de casa, entrada suave.",
      "Der nächste Strand — drei Minuten vom Haus, sanfter Zugang.",
      "La plage la plus proche — trois minutes de la maison, entrée douce.",
    ),
    note: copy(
      "Tohle je pláž, ke které jdete skoro bosky. Široký písek, pozvolný vstup a v létě živější promenáda. Rodiny sem nosí ručníky i kávu z domu — hřiště je kousek. Voda je ke koupání zhruba od května do října. Večer stačí dojít na nábřeží a dívat se, jak se světla chytají v přístavu.",
      "This is the beach you walk to almost barefoot. Wide sand, a gentle entry, and a livelier promenade in summer. Families bring towels and coffee from the apartment — a playground is nearby. The sea is good for swimming from about May to October. In the evening, walk the waterfront and watch the lights catch in the harbour.",
      "Esta es la playa a la que se llega casi descalzo. Arena ancha, entrada suave y un paseo más vivo en verano. Las familias traen toalla y café de casa; hay un parque cerca. El mar sirve para bañarse de mayo a octubre, más o menos. Por la noche basta con llegar al muelle y ver las luces en el puerto.",
      "Das ist der Strand, zu dem Sie fast barfuß gehen. Breiter Sand, sanfter Zugang, im Sommer eine lebhaftere Promenade. Familien nehmen Handtuch und Kaffee vom Apartment mit — ein Spielplatz ist nah. Zum Baden eignet sich das Meer etwa von Mai bis Oktober. Abends reicht der Weg zum Kai, wo sich die Lichter im Hafen fangen.",
      "C’est la plage où l’on va presque pieds nus. Sable large, entrée douce, promenade plus animée l’été. Les familles y portent serviette et café de l’appartement — un square est tout près. La mer se prête à la baignade d’environ mai à octobre. Le soir, il suffit de gagner le quai et de voir les lumières dans le port.",
    ),
  },
  {
    slug: "playa-varadero",
    category: "beach",
    name: "Playa Varadero",
    mapsUrl: "https://maps.app.goo.gl/gBjqQg81egjsy6fC8",
    image: photos.port,
    line: copy(
      "Širší písek, víc místa, dobrá na delší chůzi.",
      "Wider sand, more space, good for a longer walk.",
      "Arena más ancha, más sitio, buena para un paseo largo.",
      "Breiterer Sand, mehr Platz, gut für einen längeren Gang.",
      "Sable plus large, plus d’espace, bien pour une plus longue marche.",
    ),
    note: copy(
      "Varadero je o kousek dál na východ: pořád pěšky, ale už s pocitem, že jste vyšli. Písek je široký, vstup do vody mírný, kolem kavárny a sprchy. Lidé sem chodí, když chtějí víc klidu než na Llevantu, nebo když fouká a hledají jiný kout zátoky.",
      "Varadero is a little further east: still on foot, but you feel you have gone out. The sand is wide, the water entry is gentle, with cafés and showers nearby. People come when they want more quiet than Llevant, or when the wind makes them look for another corner of the bay.",
      "Varadero queda un poco más al este: sigue a pie, pero ya se nota que has salido. Arena ancha, entrada suave, cafeterías y duchas cerca. La gente viene cuando quiere más calma que en Llevant, o cuando el viento pide otro rincón de la bahía.",
      "Varadero liegt etwas weiter östlich: noch zu Fuß, aber man spürt, dass man ausgegangen ist. Breiter Sand, sanfter Einstieg, Cafés und Duschen in der Nähe. Man kommt her, wenn man mehr Ruhe als am Llevant will — oder wenn der Wind eine andere Ecke der Bucht sucht.",
      "Varadero est un peu plus à l’est : toujours à pied, mais on sent qu’on est sorti. Sable large, entrée douce, cafés et douches tout près. On y va pour plus de calme qu’à Llevant, ou quand le vent pousse vers un autre coin de la baie.",
    ),
  },
  {
    slug: "gran-playa",
    category: "beach",
    name: "Gran Playa",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gran%20Playa%20Santa%20Pola",
    image: photos.port,
    line: copy(
      "Dlouhá pláž u promenády — západ slunce a teras.",
      "The long beach by the promenade — sunsets and terraces.",
      "La playa larga del paseo: atardeceres y terrazas.",
      "Der lange Strand an der Promenade — Sonnenuntergänge und Terrassen.",
      "La longue plage de la promenade — couchers de soleil et terrasses.",
    ),
    note: copy(
      "Gran Playa je ta, podél které se večer chodí. Dlouhý pás písku, restaurace čelem k moři, světlo, které se na Costa Blance drží dlouho. Sem spíš na procházku a sklenku než na celý den s deštníkem — i když ručník se vejde.",
      "Gran Playa is the one you walk along in the evening. A long strip of sand, restaurants facing the sea, light that lingers on the Costa Blanca. Come for a stroll and a glass more than a whole day under an umbrella — though a towel still fits.",
      "Gran Playa es la del paseo al atardecer. Una franja larga de arena, restaurantes de cara al mar, una luz que se queda en la Costa Blanca. Mejor para caminar y una copa que para un día entero de sombrilla, aunque la toalla cabe.",
      "Gran Playa ist der Strand für den Abendspaziergang. Ein langes Sandband, Restaurants zum Meer, Licht, das an der Costa Blanca lange bleibt. Eher Spaziergang und ein Glas als ein ganzer Tag unterm Schirm — ein Handtuch hat trotzdem Platz.",
      "Gran Playa, c’est celle du soir. Une longue bande de sable, des restaurants face à la mer, une lumière qui s’attarde sur la Costa Blanca. Plutôt pour marcher et un verre que pour une journée entière sous parasol — la serviette tient quand même.",
    ),
  },
  {
    slug: "catasimo",
    category: "table",
    name: "CataSimo",
    mapsUrl: "https://maps.app.goo.gl/uviiW4dj1NRAnYuV8",
    image: photos.port,
    line: copy(
      "Čerstvé moře, chobotnice, rýže. Rezervujte.",
      "Fresh seafood, octopus, rice. Book a table.",
      "Marisco fresco, pulpo, arroces. Reserve.",
      "Frische Meeresfrüchte, Oktopus, Reis. Reservieren.",
      "Fruits de mer, poulpe, riz. Réservez.",
    ),
    note: copy(
      "CataSimo je kousek od domu, v ulici Virgen del Carmen. Hosté i místní ho chválí za čerstvé plody moře: chobotnici, kastrol s mariscos, rýži. Není to náhodná turistická terasa — lidi sem chodí schválně a v sezóně bez rezervace často neusednou. Ceny jsou na Santa Polu spíš nahoře, ale recenze se drží vysoko. Na oběd mají menu, večer se vyplatí objednat to, kvůli čemu jste přišli.",
      "CataSimo is a short walk from the apartment, on Virgen del Carmen. Guests and locals praise the fresh seafood: octopus, a mariscos casserole, rice. It is not a chance tourist terrace — people come on purpose, and in season you often need a booking. Prices sit a little high for Santa Pola, but the reviews stay high with them. There is a lunch menu; in the evening order what you came for.",
      "CataSimo queda cerca de casa, en Virgen del Carmen. Huéspedes y locales elogian el marisco fresco: pulpo, cazuela, arroces. No es una terraza turística al azar: la gente va a propósito y en temporada casi siempre hay que reservar. Los precios están algo altos para Santa Pola, pero las reseñas se mantienen. Hay menú al mediodía; por la noche pida aquello por lo que ha venido.",
      "CataSimo ist nah am Haus, in der Virgen del Carmen. Gäste und Einheimische loben frische Meeresfrüchte: Oktopus, Kasserolle, Reis. Keine Zufallsterrasse — man kommt extra, in der Saison oft nur mit Reservierung. Die Preise liegen für Santa Pola eher oben, die Bewertungen auch. Mittags gibt es ein Menü; abends das bestellen, wofür Sie gekommen sind.",
      "CataSimo est tout près, rue Virgen del Carmen. Hôtes et habitants louent les fruits de mer : poulpe, cassolette, riz. Ce n’est pas une terrasse touristique au hasard — on y va exprès, et en saison il faut souvent réserver. Les prix sont un peu hauts pour Santa Pola, les avis aussi. Il y a un menu le midi ; le soir, commandez ce pour quoi vous êtes venus.",
    ),
  },
  {
    slug: "tremenda",
    category: "table",
    name: "Tremenda",
    mapsUrl: "https://maps.app.goo.gl/o7mS2Kzx1Ffv7WXa8",
    image: photos.port,
    line: copy(
      "Hovězí burgery, křupavé hranolky, bezlepková houska.",
      "Beef burgers, crisp fries, gluten-free buns.",
      "Hamburguesas, patatas crujientes, pan sin gluten.",
      "Burger, knusprige Pommes, glutenfreie Brötchen.",
      "Burgers, frites croustillantes, pain sans gluten.",
    ),
    note: copy(
      "Tremenda By Ruiz Brothers je hamburgerárna, ne paella. Garcia Braceli 23, pořád v docházce. Recenze se shodují na mase, hranolkách a obsluze; kdo potřebuje bezlepkovou housku, často ji chválí. Je to večer, kdy nechcete další rýži z přístavu — a kdy mají děti jiný hlad než dospělí. Lokál je menší, v sezóně se čeká.",
      "Tremenda By Ruiz Brothers is a burger kitchen, not a paella house. Garcia Braceli 23, still walkable. Reviews agree on the meat, the fries and the staff; people who need a gluten-free bun often praise it. This is the evening you do not want more rice from the harbour — and when children are hungry in a different way. The room is small; in season you wait.",
      "Tremenda By Ruiz Brothers es hamburguesería, no paella. Garcia Braceli 23, todavía a pie. Las reseñas coinciden en la carne, las patatas y el servicio; quien pide pan sin gluten suele elogiarlo. Es la noche en que no quieres más arroz del puerto, y cuando los niños tienen otro hambre. El local es pequeño; en temporada se espera.",
      "Tremenda By Ruiz Brothers ist eine Burgerküche, keine Paella. Garcia Braceli 23, noch zu Fuß. Bewertungen loben Fleisch, Pommes und Service; wer glutenfreie Brötchen braucht, erwähnt sie oft gut. Das ist der Abend ohne weiteren Reis vom Hafen — und wenn Kinder anders hungrig sind. Der Raum ist klein; in der Saison wartet man.",
      "Tremenda By Ruiz Brothers est une burgers, pas une paella. Garcia Braceli 23, encore à pied. Les avis s’accordent sur la viande, les frites et le service ; le pain sans gluten revient souvent en bien. C’est le soir où l’on ne veut plus de riz du port — et où les enfants ont une autre faim. La salle est petite ; en saison on attend.",
    ),
  },
  {
    slug: "la-moruna",
    category: "table",
    name: "La Moruna",
    mapsUrl: "https://maps.app.goo.gl/uQQgCZsFfcUbZ3q26",
    image: photos.port,
    line: copy(
      "Arroz, ryby z burzy, terasa k západu.",
      "Rice, fish from the market, a terrace for sunset.",
      "Arroz, pescado de lonja, terraza al atardecer.",
      "Reis, Fisch von der Börse, Terrasse zum Sonnenuntergang.",
      "Riz, poisson de la criée, terrasse au coucher du soleil.",
    ),
    note: copy(
      "La Moruna sedí na konci sportovního přístavu, čelem ke Gran Playa. Rodina tu vaří santapolersky: rýže s gatetem, fideuá, ryba z denní burzy. Hosté chválí terasu, obsluhu a výhled — občas i denní menu. Není to tichá jídelna; je to místo, kde se den natahuje sklenkou. Kdo chce západ slunce u stolu, sem.",
      "La Moruna sits at the end of the marina, facing Gran Playa. The family cooks in the Santa Pola way: rice with gatet, fideuà, fish from the day’s market. Guests praise the terrace, the service and the view — and sometimes the weekday menu. It is not a quiet dining room; it is where the day stretches with a glass. If you want sunset at the table, come here.",
      "La Moruna está al final del puerto deportivo, frente a Gran Playa. Cocina de Santa Pola: arroz con gatet, fideuá, pescado de lonja. Los huéspedes elogian terraza, servicio y vistas, a veces el menú entre semana. No es un comedor silencioso: el día se alarga con una copa. Si quiere el atardecer en la mesa, aquí.",
      "La Moruna sitzt am Ende des Sportshafens, gegenüber Gran Playa. Familie kocht santapolensisch: Reis mit Gatet, Fideuà, Fisch von der Tagesbörse. Gäste loben Terrasse, Service und Blick — manchmal das Mittagsmenü. Kein stilles Speisezimmer; hier zieht sich der Tag mit einem Glas. Wer Sonnenuntergang am Tisch will, kommt her.",
      "La Moruna est au bout du port de plaisance, face à Gran Playa. Cuisine de Santa Pola : riz au gatet, fideuà, poisson de la criée. On loue la terrasse, le service et la vue — parfois le menu en semaine. Ce n’est pas une salle silencieuse : le jour s’allonge avec un verre. Pour le coucher de soleil à table, c’est ici.",
    ),
  },
  {
    slug: "mercadona",
    category: "shop",
    name: "Mercadona",
    mapsUrl: "https://maps.app.goo.gl/orhhK9uCUk5SpWNj9",
    image: photos.market,
    line: copy(
      "Nejbližší supermarket — z balkonu skoro na dohled.",
      "The nearest supermarket — almost in view from the balcony.",
      "El súper más cercano: casi a la vista del balcón.",
      "Der nächste Supermarkt — fast vom Balkon zu sehen.",
      "Le supermarché le plus proche — presque visible du balcon.",
    ),
    note: copy(
      "Tohle je ten nákup, kvůli kterému nemusíte startovat auto. Mléko, ovoce, voda, kapsle do myčky, víno na terasu. Ráno bývá klidnější, v sezóně odpoledne fronta u pokladen. Když potřebujete jen svačinu, stačí Carrefour Express blíž k nábřeží.",
      "This is the shop you do not start the car for. Milk, fruit, water, dishwasher capsules, wine for the terrace. Mornings are quieter; in season the tills queue in the afternoon. If you only need a snack, Carrefour Express is closer to the waterfront.",
      "Esta es la compra para la que no hace falta el coche. Leche, fruta, agua, pastillas del lavavajillas, vino para la terraza. Por la mañana hay más calma; en temporada por la tarde hay cola. Si solo quiere un tentempié, el Carrefour Express queda más cerca del paseo.",
      "Das ist der Einkauf ohne Auto. Milch, Obst, Wasser, Spülmaschinentabs, Wein für die Terrasse. Morgens ist es ruhiger; in der Saison staut es nachmittags an der Kasse. Nur ein Snack? Carrefour Express liegt näher am Kai.",
      "C’est la course sans voiture. Lait, fruit, eau, pastilles lave-vaisselle, vin pour la terrasse. Le matin est plus calme ; en saison la caisse s’allonge l’après-midi. Pour un encas, Carrefour Express est plus près du quai.",
    ),
  },
  {
    slug: "carrefour",
    category: "shop",
    name: "Carrefour Express",
    mapsUrl: "https://maps.app.goo.gl/jeXUSMjy9daa72md9",
    image: photos.market,
    line: copy(
      "Malý obchod u nábřeží na rychlý nákup.",
      "A small shop by the waterfront for a quick basket.",
      "Tienda pequeña junto al paseo para una compra rápida.",
      "Kleiner Laden am Kai für den schnellen Einkauf.",
      "Petite boutique près du quai pour un panier rapide.",
    ),
    note: copy(
      "Express je na doplnění, ne na týdenní nákup. Voda, ovoce, sýr, zmrzlina cestou z pláže. Sortiment je užší a cena o kousek výš než v Mercadoně — výhoda je, že jste u moře a nemusíte nic plánovat.",
      "Express is for topping up, not the weekly shop. Water, fruit, cheese, ice cream on the way back from the beach. The range is smaller and a little dearer than Mercadona — the gain is being by the sea with nothing to plan.",
      "El Express es para reponer, no para la compra de la semana. Agua, fruta, queso, helado al volver de la playa. Hay menos surtido y el precio sube un poco respecto a Mercadona: a cambio está junto al mar y no hay que planear nada.",
      "Express ist Nachfüllen, kein Wocheneinkauf. Wasser, Obst, Käse, Eis vom Strand zurück. Das Sortiment ist kleiner und etwas teurer als Mercadona — der Gewinn ist das Meer und kein Plan.",
      "L’Express sert à compléter, pas à faire la semaine. Eau, fruit, fromage, glace au retour de la plage. L’offre est plus étroite et un peu plus chère que Mercadona — le gain, c’est d’être au bord de mer sans rien prévoir.",
    ),
  },
  {
    slug: "mercadillo",
    category: "shop",
    name: "Mercadillo",
    mapsUrl: "https://maps.app.goo.gl/aFSMMCL1ePKQDsgP9",
    image: photos.market,
    line: copy(
      "Týdenní trh: ovoce, olivy, oblečení.",
      "The weekly market: fruit, olives, clothes.",
      "Mercadillo semanal: fruta, aceitunas, ropa.",
      "Wochenmarkt: Obst, Oliven, Kleidung.",
      "Marché de la semaine : fruits, olives, vêtements.",
    ),
    note: copy(
      "Dvakrát týdně se město změní na stánky. Ovoce, zelenina, olivy, oblečení, drobnosti, které se vejdou do tašky na terasu. Choďte ráno, než slunce sedne na plachtovinu. Platí se hotově i kartou, podle stánku. Ryby čerstvější koupíte v přístavu po návratu lodí.",
      "Twice a week the town turns into stalls. Fruit, vegetables, olives, clothes, small things that fit a bag for the terrace. Go in the morning, before the sun sits on the canvas. Cash or card, depending on the stall. Fresher fish is at the harbour when the boats come in.",
      "Dos veces por semana el pueblo se llena de puestos. Fruta, verdura, aceitunas, ropa, cosas que caben en una bolsa para la terraza. Vaya por la mañana, antes de que el sol se siente en los toldos. Efectivo o tarjeta, según el puesto. El pescado más fresco está en el puerto al volver las barcas.",
      "Zweimal die Woche wird die Stadt zu Ständen. Obst, Gemüse, Oliven, Kleidung, Kleines für die Terrasse. Morgens gehen, bevor die Sonne auf der Plane sitzt. Bar oder Karte, je nach Stand. Frischeren Fisch gibt es im Hafen, wenn die Boote zurück sind.",
      "Deux fois par semaine la ville devient étals. Fruits, légumes, olives, vêtements, petites choses pour la terrasse. Allez le matin, avant que le soleil ne pèse sur les toiles. Espèces ou carte, selon le stand. Le poisson plus frais est au port au retour des bateaux.",
    ),
  },
  {
    slug: "museo-del-mar",
    category: "museum",
    name: "Museo del Mar",
    mapsUrl: "https://maps.app.goo.gl/igz6dkktcLt2D6ny7",
    image: photos.lighthouse,
    line: copy(
      "Pevnost z roku 1558 a námořní muzeum v ní.",
      "A 1558 fortress and the maritime museum inside it.",
      "Fortaleza de 1558 y museo marítimo dentro.",
      "Festung von 1558 und das Seefahrtsmuseum darin.",
      "Forteresse de 1558 et musée maritime à l’intérieur.",
    ),
    note: copy(
      "Museo del Mar sedí v renesanční pevnosti nad městem. Není to velké muzeum na celý den — je to hodina v chládku, děla, sítě, příběh rybářského města. Z hradeb je výhled na přístav a Tabarcu. Spojte to s akváriem o kousek dál: děti vydrží obojí, když mezi tím dostanou zmrzlinu.",
      "The Museo del Mar sits in the Renaissance fortress above town. It is not a whole-day museum — an hour in the cool, guns, nets, the story of a fishing town. From the walls you see the harbour and Tabarca. Pair it with the aquarium a little further on: children last both if ice cream sits in between.",
      "El Museo del Mar está en la fortaleza renacentista sobre el pueblo. No es un museo de día entero: una hora a la sombra, cañones, redes, la historia de un pueblo de pescadores. Desde las murallas se ve el puerto y Tabarca. Júntelo con el acuario: los niños aguantan ambos si hay helado en medio.",
      "Das Museo del Mar sitzt in der Renaissancefestung über der Stadt. Kein Ganztagsmuseum — eine Stunde im Kühlen, Kanonen, Netze, die Geschichte eines Fischerorts. Von den Mauern sieht man Hafen und Tabarca. Mit dem Aquarium verbinden: Kinder schaffen beides, wenn dazwischen Eis liegt.",
      "Le Museo del Mar est dans la forteresse Renaissance au-dessus de la ville. Pas un musée pour toute la journée — une heure au frais, canons, filets, l’histoire d’un village de pêcheurs. Des murs on voit le port et Tabarca. Couplez avec l’aquarium : les enfants tiennent les deux s’il y a une glace entre les deux.",
    ),
  },
  {
    slug: "acuario",
    category: "museum",
    name: "Acuario",
    mapsUrl: "https://maps.app.goo.gl/R2CLns24P2hstTgz5",
    image: photos.port,
    line: copy(
      "Malé středomořské akvárium. Často zdarma.",
      "A small Mediterranean aquarium. Often free.",
      "Acuario mediterráneo pequeño. A menudo gratis.",
      "Kleines Mittelmeer-Aquarium. Oft kostenlos.",
      "Petit aquarium méditerranéen. Souvent gratuit.",
    ),
    note: copy(
      "Obecní akvárium je skromné a právě proto ho hosté mají rádi: žádný oceánografický palác, jen druhy ze zálivu, které děti poznají z talíře. Vstup bývá zdarma nebo za drobné. Stačí krátká zastávka cestou do pevnosti nebo zpátky k pláži. V horku je to vítaný stín.",
      "The municipal aquarium is modest, which is why guests like it: no oceanographic palace, just species from the bay that children recognise from the plate. Entry is often free or a token. A short stop on the way to the fortress or back to the beach. In the heat it is welcome shade.",
      "El acuario municipal es modesto, y por eso gusta: no es un palacio oceanográfico, solo especies de la bahía que los niños conocen del plato. La entrada suele ser gratis o simbólica. Una parada corta hacia la fortaleza o de vuelta a la playa. Con calor es sombra bienvenida.",
      "Das Gemeindeaquarium ist bescheiden — deshalb mögen es Gäste: kein Ozeanpalast, nur Arten aus der Bucht, die Kinder vom Teller kennen. Eintritt oft frei oder ein Token. Kurzer Halt zur Festung oder zurück zum Strand. Bei Hitze willkommener Schatten.",
      "L’aquarium municipal est modeste, et c’est pour ça qu’on l’aime : pas de palais océanographique, seulement des espèces de la baie que les enfants voient dans l’assiette. L’entrée est souvent gratuite ou symbolique. Une halte vers la forteresse ou vers la plage. Par forte chaleur, c’est de l’ombre.",
    ),
  },
  {
    slug: "museo-de-la-sal",
    category: "museum",
    name: "Museo de la Sal",
    mapsUrl: "https://maps.app.goo.gl/tvnHqhM1QLYBsJ5AA",
    image: photos.lighthouse,
    line: copy(
      "Sůl, laguny a plameňáci za městem.",
      "Salt, lagoons and flamingos just outside town.",
      "Sal, lagunas y flamencos a las afueras.",
      "Salz, Lagunen und Flamingos vor der Stadt.",
      "Sel, lagunes et flamants aux portes de la ville.",
    ),
    note: copy(
      "Muzeum soli je zároveň vstup do přírodního parku Salinas. Uvnitř pochopíte, proč je krajina bílá a růžová; venku hledáte plameňáky. Není to zábavní park — vezměte klobouk, vodu a dalekohled, pokud ho máte. Auto pomůže, ale od apartmánu to není daleko na kole nebo i pěšky, když není poledne.",
      "The salt museum is also the door into the Salinas nature park. Inside you see why the land is white and pink; outside you look for flamingos. This is not an amusement park — take a hat, water and binoculars if you have them. A car helps, but it is not far from the apartment by bike, or on foot if it is not midday.",
      "El museo de la sal es también la puerta al parque de las Salinas. Dentro se entiende el blanco y el rosa del paisaje; fuera se buscan flamencos. No es un parque de atracciones: sombrero, agua y prismáticos si los tiene. El coche ayuda, pero desde el apartamento no queda lejos en bici, o a pie si no es mediodía.",
      "Das Salzmuseum ist auch die Tür in den Naturpark Salinas. Drinnen versteht man das Weiß und Rosa der Landschaft; draußen sucht man Flamingos. Kein Freizeitpark — Hut, Wasser, Fernglas. Ein Auto hilft, aber vom Apartment ist es mit dem Rad nicht weit, zu Fuß wenn nicht Mittag ist.",
      "Le musée du sel est aussi la porte du parc des Salinas. Dedans on comprend le blanc et le rose du paysage ; dehors on cherche les flamants. Ce n’est pas un parc d’attractions — chapeau, eau, jumelles. La voiture aide, mais ce n’est pas loin à vélo, ou à pied hors midi.",
    ),
  },
  {
    slug: "tabarca",
    category: "trip",
    name: "Isla de Tabarca",
    mapsUrl: "https://maps.app.goo.gl/YKQ6YRpg2Vu6f7ej6",
    image: photos.tabarca,
    line: copy(
      "Nejmenší obydlený ostrov. Loď z přístavu, 25 minut.",
      "The smallest inhabited island. Boat from the harbour, 25 minutes.",
      "La isla habitada más pequeña. Barco desde el puerto, 25 minutos.",
      "Die kleinste bewohnte Insel. Boot vom Hafen, 25 Minuten.",
      "La plus petite île habitée. Bateau depuis le port, 25 minutes.",
    ),
    note: copy(
      "Z přístavu vyplouvají lodě na Tabarcu skoro každý den v sezóně. Plavba trvá asi 25 minut. Ostrov je malý: pláže, hradby, úzké ulice, oběd u vody. Vezměte lístky ráno, vodu a klobouk — stínu je míň, než čekáte. Zpáteční loď si hlídejte; poslední odpolední spoje se plní. Z terasy apartmánu ostrov vidíte, než k němu vyplujete.",
      "Boats leave the harbour for Tabarca most days in season. The crossing is about 25 minutes. The island is small: beaches, walls, narrow streets, lunch by the water. Buy tickets in the morning, take water and a hat — there is less shade than you expect. Watch the return boat; the last afternoon sailings fill. From the apartment terrace you see the island before you sail to it.",
      "Los barcos salen del puerto a Tabarca casi cada día en temporada. Unos 25 minutos. La isla es pequeña: playas, murallas, callejuelas, comida junto al agua. Compre los billetes por la mañana, lleve agua y sombrero: hay menos sombra de la que se espera. Vigile el barco de vuelta; los últimos de la tarde se llenan. Desde la terraza del apartamento se ve la isla antes de ir.",
      "Boote legen in der Saison fast täglich nach Tabarca ab. Etwa 25 Minuten. Die Insel ist klein: Strände, Mauern, Gassen, Mittagessen am Wasser. Tickets morgens, Wasser und Hut — weniger Schatten als gedacht. Die Rückfahrt im Blick halten; die letzten Nachmittagsboote füllen sich. Von der Apartmentterrasse sieht man die Insel, bevor man hinsegelt.",
      "Les bateaux partent du port vers Tabarca presque tous les jours en saison. Environ 25 minutes. L’île est petite : plages, remparts, ruelles, déjeuner au bord de l’eau. Prenez les billets le matin, de l’eau et un chapeau — moins d’ombre qu’on croit. Surveillez le retour ; les derniers bateaux de l’après-midi se remplissent. Depuis la terrasse on voit l’île avant d’y aller.",
    ),
  },
  {
    slug: "alicante",
    category: "trip",
    name: "Alicante",
    mapsUrl: "https://maps.app.goo.gl/Bi9QqpSysnemAEHM7",
    image: photos.lighthouse,
    line: copy(
      "Dvacet minut autem. Hrad, promenáda, město.",
      "Twenty minutes by car. Castle, promenade, a city.",
      "Veinte minutos en coche. Castillo, explanada, ciudad.",
      "Zwanzig Minuten mit dem Auto. Burg, Promenade, Stadt.",
      "Vingt minutes en voiture. Château, promenade, ville.",
    ),
    note: copy(
      "Alicante je nejbližší opravdové město: hrad Santa Bárbara, Explanada de España, přístav, obchody, když Santa Pola nestačí. Autem zhruba 20 minut, taxík z letiště sem stejně jede. Není nutné tam spát — stačí odpoledne a večeře, zpátky k našemu balkonů. Parkování ve městě plánujte, nebo nechte auto a jeďte autobusem.",
      "Alicante is the nearest real city: Santa Bárbara castle, the Explanada, the harbour, shops when Santa Pola is not enough. About 20 minutes by car; the airport taxi already knows the road. You do not need to sleep there — an afternoon and dinner, then back to our balcony. Plan parking, or leave the car and take the bus.",
      "Alicante es la ciudad de verdad más cercana: el castillo de Santa Bárbara, la Explanada, el puerto, tiendas cuando Santa Pola no basta. Unos 20 minutos en coche; el taxi del aeropuerto ya conoce el camino. No hace falta dormir allí: una tarde y cena, y vuelta al balcón. Planifique el aparcamiento o deje el coche y tome el bus.",
      "Alicante ist die nächste richtige Stadt: Burg Santa Bárbara, Explanada, Hafen, Läden, wenn Santa Pola nicht reicht. Etwa 20 Minuten mit dem Auto; das Flughafentaxi kennt den Weg. Man muss nicht dort schlafen — Nachmittag und Abendessen, zurück auf unseren Balkon. Parken planen oder das Auto stehen lassen und den Bus nehmen.",
      "Alicante est la vraie ville la plus proche : château de Santa Bárbara, Explanada, port, boutiques quand Santa Pola ne suffit pas. Environ 20 minutes en voiture ; le taxi de l’aéroport connaît la route. Pas besoin d’y dormir — un après-midi et un dîner, puis le balcon. Prévoyez le stationnement, ou laissez la voiture et prenez le bus.",
    ),
  },
  {
    slug: "el-palmeral",
    category: "trip",
    name: "El Palmeral",
    mapsUrl: "https://maps.app.goo.gl/gQ5LdnCsvRWkNiUQ8",
    image: photos.tabarca,
    line: copy(
      "Palmový háj UNESCO v Elche. 25 minut autem.",
      "The UNESCO palm grove in Elche. 25 minutes by car.",
      "El palmeral UNESCO de Elche. 25 minutos en coche.",
      "Der UNESCO-Palmenhain in Elche. 25 Minuten mit dem Auto.",
      "La palmeraie UNESCO d’Elche. 25 minutes en voiture.",
    ),
    note: copy(
      "Elche je vnitrozemí, stín a jiný vzduch. Palmový háj je na seznamu UNESCO — cesty mezi kmeny, voda v kanálech, ticho, které po týdnu u moře chutná. Děti vydrží víc, než čekáte, protože je to les, ne muzeum za sklem. Vezměte vodu. Cesta autem trvá asi 25 minut; parkujte u vstupu do háje, ne v centru, pokud nemáte jiný důvod.",
      "Elche is inland, shade and different air. The palm grove is UNESCO — paths between trunks, water in the channels, a quiet that tastes good after a week at the sea. Children last longer than you expect, because it is a wood, not a museum behind glass. Take water. The drive is about 25 minutes; park at the grove entrance unless you have another reason for the centre.",
      "Elche es interior, sombra y otro aire. El palmeral es UNESCO: caminos entre troncos, agua en las acequias, un silencio que sabe bien tras una semana de mar. Los niños aguantan más de lo que se espera, porque es un bosque, no un museo. Lleve agua. El coche tarda unos 25 minutos; aparque en la entrada del palmeral salvo que el centro le pida otra cosa.",
      "Elche ist Inland, Schatten, andere Luft. Der Palmenhain ist UNESCO — Wege zwischen Stämmen, Wasser in den Kanälen, eine Stille, die nach einer Woche Meer gut schmeckt. Kinder halten länger durch, weil es Wald ist, kein Museum hinter Glas. Wasser mitnehmen. Die Fahrt dauert etwa 25 Minuten; am Eingang parken, nicht in der Innenstadt, außer Sie haben einen anderen Grund.",
      "Elche, c’est l’intérieur, l’ombre, un autre air. La palmeraie est UNESCO — chemins entre les troncs, eau dans les canaux, un silence qui va bien après une semaine de mer. Les enfants tiennent plus qu’on croit, parce que c’est un bois, pas un musée derrière une vitre. Prenez de l’eau. Environ 25 minutes en voiture ; garez-vous à l’entrée de la palmeraie, pas en centre-ville, sauf autre raison.",
    ),
  },
];

export function getPlace(slug: string) {
  return places.find((place) => place.slug === slug);
}

export function placesIn(category: PlaceCategory) {
  return places.filter((place) => place.category === category);
}

export function placePath(slug: string) {
  return `/santa-pola/${slug}`;
}
