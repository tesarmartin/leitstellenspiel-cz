// ==UserScript==
// @name         Leitstellenspiel.de - Český řeklad
// @namespace    http://tampermonkey.net/
// @version      0.01
// @description  Beta verze českého překladu do hry leitstellenspiel.de
// @author       Martin Tesař
// @updateURL    https://github.com/tesarmartin/leitstellenspiel-cz/blob/master/Leitstellenspiel.js
// @downloadURL  https://github.com/tesarmartin/leitstellenspiel-cz/blob/master/Leitstellenspiel.js
// @grant        none
// ==/UserScript==


(function() {

var replacements, regex, key, textnodes, node, s;

 

replacements = {

    //věty
    "Ein Fahrzeug hat einen Sprechwunsch!" : "Vozidlo má požadavek!",
    "Einsatzbereit auf Wache" : "Připraveno na základně!",
    "Beim Einsatzort" : "Na místě události",
    "Auf Anfahrt" : "Na cestě",
    "Es sind keine Funksprüche eingegangen." : "Žádné radiové zprávy",
    "Fahrzeuge auf Anofahrt" : "Jednotky na cestě",
    
    

    //mise

    "Mülleimerbrand": "Požár odpadkového koše",
    "Containerbrand" : "Požár kontejneru",
    "Brennender PKW" : "Požár automobilu",
    "Motorrad-Brand" : "Požár motocyklu",
    "Brennendes Gras" : "Požár trávy",
    "Zimmerbrand" : "Požár místnosti",
    "Gartenlaubenbrand" : "Požár zahradního altánu",
    "Brennendes Laub" : "Požár listí",
    "Sperrmüllbrand" : "Požár odpadu",
    "Strohballen Brand" : "Požár balíků slámy",
    "Traktor Brand" : "Požár traktoru",
    "Brennende Telefonzelle" : "Požár telefonní budky",
    "Baum auf Straße" : "Strom na ulici",
    "Brennender LKW" : "Požár nákladního vozu",
    "Kleiner Feldbrand" : "Menší požár pole",
    "Kleiner Waldbrand" : "Malý lesní požár",
    "Wohnwagenbrand" : "Požár karavanu",
    "Brand in Briefkasten" : "Požár poštovní schránky",
    "Brennendes Gebüsch" : "Požár křoví",
    "Brennender Anhänger" : "Požár přívěsu",
    "Kellerbrand" : "Požár v suterénu",
    "Schornsteinbrand" : "Požár komínu",
    "Dachstuhlbrand" : "Požár střechy",
    "Fettbrand in Pommesbude" : "Hořící olej (tuk) v rychlém občerstvení",
    "Brennendes Bus-Häuschen" : "Požár autobusové zastávky",
    "Verkehrsunfall" : "Dopravní nehoda",
    "Brand im Supermarkt" : "Požár v supermarketu",
    "Auffahrunfall" : "Srážka - dopravní nehoda",
    "Garagenbrand" : "Požár garáže",
    "Maschinenbrand" : "Požár stroje",
    "Große Ölspur" : "Velká olejová skvrna",
    "Auslaufende Betriebsstoffe" : "Únik provozních kapalin",
    "Kaminbrand" : "Požár krbu",
    "Mähdrescher Brand" : "Požár kombajnu",
    "Feuer im Krankenhaus" : "Požár v nemocnici",
    "Brennender Güterwaggon" : "Požár nákladního vagónu",
    "Tankstellenbrand" : "Požár čerpací stanice",
    "Alkoholintoxikation" : "Otrava alkoholem",
    "Nasenbluten unstillbar" : "Krvácení z nosu",
    "Herzinfarkt" : "Infarkt",
    "akuter Asthma-Anfall" : "Akutní astmatický záchvat",
    "Krampfanfall" : "Záchvat",
    "Fieber" : "Horečka",
    "Gestürzte Person" : "Bezvládný člověk",
    "Brand in Werkstatt" : "Požár v dílně",
    "Brand auf Weihnachtsmarkt" : "Požár na vánočních trhu",
    "Verkehrsunfall durch Glatteis" : "Dopravní nehoda na náledí",
    "Brennender Tannenbaum" : "Požár vánočního stromu",
    "Gestürzter Fußgänger" : "Pád chodce",
    "Gestürzter Radfahrer" : "Pád cyklisty",
    "Ladendiebstahl" : "Krádež",
    "Parkendes Auto gerammt" : "Náraz do zaparkovaného auta",
    "Metalldiebstahl" : "Krádež kovu",
    "Taschendiebstahl" : "Kapesní krádež",
    "Notebook aus Schule entwendet" : "Krádež laptopu ve škole",
    "Personalienaufnahme von Schwarzfahrer" : "Černý pasažér",
    "Bewusstloser Kranführer" : "Jeřábník v bezvědomí",
    "Schlägerei" : "Hádka (rvačka)",
    "Randalierende Person" : "Výtržnictví",
    "Küchenbrand" : "Požár v kuchyni",
    "Person hinter Tür" : "Bezvládná osoba za dveřmi",
    "Kleintier in Not" : "Malé zvíře v nouzi",
    "Verletzte Person auf Baugerüst" : "Zraněná osoba na lešení",
    "Rauchentwicklung in Museum" : "Kouř v muzeu",
    "Einbruch in Keller" : "Vloupání do sklepa",
    "Einbruch in Wohnung" : "Vloupání do bytu",
    "Gefahrgut-LKW verunglückt" : "Nehoda kamionu s nebezpečným nákladem",
    "Brennende Lok" : "Požár lokomotivy",
    "Sachbeschädigung" : "Škody na majetku",
    "Sporthallenbrand" : "Požár sportovní haly",
    "Kleinflugzeug abgestürzt" : "Havárie malého letadla",
    "Brennender Bollerwagen" : "Požár cisterny",
    "LKW Auffahrunfall" : "Nehoda kamionu",
    "Ruhestörung" : "Rušení nočního klidu",
    "Keller unter Wasser" : "Vytopený sklep",
    "Schlaganfall" : "Mrtvice",
    "Brennender Bus" : "Požár autobusu",
    "Kleine Ölspur" : "Malý únik oleje",
    "Negedehnte Ölspur" : "Protáhlá olejová skvrna",
    "Feuer in Schnellrestaurant" : "Požár v restauraci rychlého občerstvení",
    "Aufgerissener Öltank" : "Protržená olejová nádrž",
    "Anogefahrene Person" : "Kolize s osobou",
    "Feuer in Einfamilienhaus" : "Požár rodinného domu",
    "Massenschlägerei" : "Hromadná rvačka",
    "Schwangere in Notsituation" : "Těhotná žena v nouzi",
    "Beginnende Geburt" : "Začínající porod",
    "Vaginale Blutung" : "Krvání z pochvy",
    "Brennende Vogelscheuche" : "Hořící strašák",
    "Brennendes Kürbisfeld" : "Požár pole s dýněmi",
    "Kürbissuppe übergekocht" : "Otrava dýňovou polévkou",
    "Hexe hängt in Baum" : "Čarodějnice visící na stromě",
    "Zombiebiss" : "Kousnutí od zombie",
    "Kürbisse geklaut" : "Krádež dýně",
    "Frankenstein gesichtet" : "Spatřen Frankenstein",
    "Süßigkeitendiebstahl" : "Krádež cukroví",
    "LKW umgestürzt" : "Převrácený kamion",
    "Motorradunfall" : "Nehoda motocyklu",
    "Brennender Adventskranz" : "Požár adventního věnce",
    "Rangelei auf Weihnachtsmarkt" : "Rvačka na vánočním trhu",
    "Mittlerer Feldbrand" : "Středně velký požár pole",
    "Großer Feldbrand" : "Velký požár pole",
    "Großer Waldbrand" : "Velký lesní požár",
    "Großfeuer im Wald" : "Velký požár v lese",
    "Flächenbrand" : "Rozlehlý požár",
    "Feuer auf Balkon" : "Požár na balkoně",
    "Brennende Papiercontainer" : "Požár kontejneru na papír",
    "Brennende Hecke" : "Požár živého plotu",
    "Trunkenheitsfahrt" : "Opilý řidič",
    "Brennendes Reetdachhaus" : "Požár doškové chalupy",
    "Ampelausfall" : "Porucha semaforu",
    "Pannenfahrzeug" : "Odtažení vozidla",
    "Hausfriedensbruch" : "Porušování domovní svobody",
    "Raub" : "Loupež",
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //POI
    "See" : "Vodní plocha",
    "POI-Check" : "Kontrola POI",
    
    
    

    
 //ostatní

    "Details" : "Detaily",
    "Credits" : "Kredity",
    "Coins" : "Mince",
    "Fahrzeuge ausgeblendet" : "Vozidla skryty",
    "Einsätze" : "Události",
    "Aus" : "Ne",
    "An" : "Ano",
    "Sprechwunsch" : "Požadavek",
    "Funksprüche" : "Rádiové zprávy",
    "Nachricht" : "Zpráva",
    "Feuerwehrleute" : "Hasiči",
    "Rettungsdienstler" : "Zdravotníci",
    "Polizisten" : "Policisté",
    "Wache" : "Stanice",
    "Fahrzeug" : "Jednotka",
    "Anokunft" : "Příjezd",
    "Besatzung" : "Posádka",
    "Besitzer" : "Vlastník",
    "Entfernung" : "Vzdálenost",
    "LF" : "CAS",
    "FW Anodere" : "Hasiči - ostatní",
    "Rettung" : "ZZS",
    "Polizei" : "Policie",

    
    
    
    
    
    
};

regex = {};

for (key in replacements) {

regex[key] = new RegExp(key, 'g');

}

 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

 

for (var i = 0; i < textnodes.snapshotLength; i++) {

node = textnodes.snapshotItem(i);

s = node.data;

for (key in replacements) {

s = s.replace(regex[key], replacements[key]);

}

node.data = s;

}

 

})();
