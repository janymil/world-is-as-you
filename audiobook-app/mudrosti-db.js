// Database of wisdom quotes related to consciousness, reality creation, and self-awareness
const MUDROSTI = [
    {
        text: "Svet nie je taký, aký je. Svet je taký, aký si ty.",
        author: "Základná myšlienka",
        category: "realita"
    },
    {
        text: "Tvoje vnútro tvorí tvoje vonkajšie. Nie naopak.",
        author: "Zákon zrkadla",
        category: "zrkadlo"
    },
    {
        text: "Každá emócia je sprievodca, nie nepriateľ. Počúvaj ju.",
        author: "Kapitola Emócie",
        category: "emocie"
    },
    {
        text: "Minulosti niet. Budúcnosti niet. Existuje len teraz.",
        author: "Kapitola Čas",
        category: "cas"
    },
    {
        text: "Okolnosti nezmenili teba. Ty si zmenil okolnosti.",
        author: "Kapitola Okolnosti",
        category: "okolnosti"
    },
    {
        text: "Tvoje presvedčenia vytvárajú tvoju realitu. Skúmaj ich.",
        author: "Kapitola Presvedčenia",
        category: "presvedcenia"
    },
    {
        text: "Nie si obeť. Si tvorca. Vždy si bol.",
        author: "Základný princíp",
        category: "tvorba"
    },
    {
        text: "Keď zmením seba, svet sa zmení so mnou.",
        author: "Zákon transformácie",
        category: "zmena"
    },
    {
        text: "Odpor k prítomnosti vytvára utrpenie.",
        author: "Prítomný moment",
        category: "pritomnost"
    },
    {
        text: "Všetko, čo potrebuješ, je už v tebe. Vždy tam bolo.",
        author: "Vnútorná bilancia",
        category: "vnutro"
    },
    {
        text: "Tvoj život je hologramom tvojho vedomia.",
        author: "Vedomie",
        category: "vedomie"
    },
    {
        text: "Strach nie je pravdivý. Je len projekciou mysle.",
        author: "O strachu",
        category: "strach"
    },
    {
        text: "Pozorovaním mysle sa od nej oslobodíš.",
        author: "Vnútorný pozorovateľ",
        category: "mysel"
    },
    {
        text: "Realita nie je pevná. Je tekutá ako tvoje vedomie.",
        author: "Podstata reality",
        category: "realita"
    },
    {
        text: "Keď prestanem súdiť, svet sa stane zázrakom.",
        author: "Bez súdenia",
        category: "pokoj"
    },
    {
        text: "Tvoja energia vytvára tvoje zážitky, nie naopak.",
        author: "Energetický zákon",
        category: "energia"
    },
    {
        text: "Si vedomím, ktoré má skúsenosť, nie skúsenosťou samotnou.",
        author: "Identita",
        category: "vedomie"
    },
    {
        text: "Láska nie je emócia. Láska je tvoj prirodzený stav.",
        author: "Pravá láska",
        category: "laska"
    },
    {
        text: "Negatívny moment môže byť príležitosťou na premenu.",
        author: "Kapitola Negatívny moment",
        category: "negativita"
    },
    {
        text: "Nenásleduj druhých. Nájdi svoju vlastnú cestu.",
        author: "Účel",
        category: "cesta"
    },
    {
        text: "Tvoj vnútorný svet je jediný svet, ktorý existuje.",
        author: "Vnútorná realita",
        category: "vnutro"
    },
    {
        text: "Prebuď sa zo sna nevedomosti. Si už prebudený.",
        author: "Prebudenie",
        category: "prebudenie"
    },
    {
        text: "Čím menej bojuješ, tým viac prúdi život.",
        author: "Prúd života",
        category: "tok"
    },
    {
        text: "Vinu a hanbu si vytvoril ty. Môžeš ich aj rozpustiť.",
        author: "Oslobodenie",
        category: "oslobodenie"
    },
    {
        text: "Nie myšlienky sú problém, ale stotožnenie sa s nimi.",
        author: "O mysli",
        category: "mysel"
    },
    {
        text: "Tichosť hovorí hlasnejšie než slová.",
        author: "Tichosť",
        category: "ticho"
    },
    {
        text: "Odpustiť znamená vidieť, že sa nič nestalo.",
        author: "Odpustenie",
        category: "odpustenie"
    },
    {
        text: "Tvoj dych je mostom medzi telom a duchom.",
        author: "Dych života",
        category: "dych"
    },
    {
        text: "Trpieš len vtedy, keď sa pohrávaš s minulosťou alebo budúcnosťou.",
        author: "Tu a teraz",
        category: "pritomnost"
    },
    {
        text: "Si umelec a život je tvoje plátno.",
        author: "Kapitola Život je plátno",
        category: "tvorba"
    },
    {
        text: "Nič vonku ťa nemôže naplniť. Všetko je vo vnútri.",
        author: "Vnútorné naplnenie",
        category: "vnutro"
    },
    {
        text: "Keď prijmeš to, čo je, otvorí sa nová možnosť.",
        author: "Akceptácia",
        category: "prijatie"
    },
    {
        text: "Stav prekvitania nie je cieľ. Je prirodzeným stavom bytia.",
        author: "Kapitola Prekvitanie",
        category: "prekvitanie"
    },
    {
        text: "Okolnosti sú neutrálne. Ty im dávaš význam.",
        author: "Význam",
        category: "okolnosti"
    },
    {
        text: "Tvoj život nie je problém na vyriešenie, ale zázrak na prežitie.",
        author: "Život ako zázrak",
        category: "zazrak"
    },
    {
        text: "Keď prestanem hľadať, nájdem.",
        author: "Paradox",
        category: "hladanie"
    },
    {
        text: "Úzkosť vzniká z túžby kontrolovať neovládateľné.",
        author: "O úzkosti",
        category: "kontrola"
    },
    {
        text: "Si svetlom, ktoré osvetľuje všetky skúsenosti.",
        author: "Svetlo vedomia",
        category: "vedomie"
    },
    {
        text: "Radosť nie je následok dobrých okolností. Je nezávislá.",
        author: "Vnútorná radosť",
        category: "radost"
    },
    {
        text: "Čím viac sa snažíš byť niekto, tým viac sa míňaš so sebou.",
        author: "Autenticita",
        category: "identita"
    },
    {
        text: "Samota nie je osamelé. Je to prázdny priestor plný potenciálu.",
        author: "Samota",
        category: "samota"
    },
    {
        text: "Nie si myšlienky, nie si emócie, nie si telo. Si to, čo to pozoruje.",
        author: "Pravé ja",
        category: "identita"
    },
    {
        text: "Keď prestanem utekať pred sebou, nájdem pokoj.",
        author: "Vnútorný pokoj",
        category: "pokoj"
    },
    {
        text: "Zmena prichádza, keď prijmeš to, čo je, nie keď to bojuješ.",
        author: "Transformácia",
        category: "zmena"
    },
    {
        text: "Tvoj účel nie je nájsť, ale byť.",
        author: "Kapitola Účel",
        category: "ucel"
    },
    {
        text: "Niet separácie. Si jedno so všetkým.",
        author: "Jednota",
        category: "jednota"
    },
    {
        text: "Tvoja prítomnosť mení priestor okolo teba.",
        author: "Energia prítomnosti",
        category: "pritomnost"
    },
    {
        text: "Vďačnosť nie je o tom, čo máš. Je o tom, že si.",
        author: "Vďačnosť",
        category: "vdacnost"
    },
    {
        text: "Každý moment je nový začiatok, ak to dovolíš.",
        author: "Nový začiatok",
        category: "zaciatky"
    },
    {
        text: "Neexistuje cesta k pokoju. Pokoj je cesta.",
        author: "Cesta pokoja",
        category: "pokoj"
    }
];

// Get random wisdom
function getRandomMudrost() {
    return MUDROSTI[Math.floor(Math.random() * MUDROSTI.length)];
}

// Get wisdom by category
function getMudrostiByCategory(category) {
    return MUDROSTI.filter(m => m.category === category);
}

// Get all categories
function getAllCategories() {
    return [...new Set(MUDROSTI.map(m => m.category))];
}
