const skins = {
    "basic": {
        name: "basic",
        displayName: 'Basic',
        require: require("../assets/Skin/basic-big.png"),
        price: 0,
        description: "Le skin de base pour tous les joueurs."
    },
    "mcdo": {
        name: "mcdo",
        displayName: 'Employe',
        require: require("../assets/Skin/employe-mcdo-big.png"),
        price: 5,
        description: "Burger, frite, coca?"
    },
    "cat": {
        name: "cat",
        displayName: 'Chat',
        require: require("../assets/Skin/cat-big.png"),
        price: 10,
        description: "Miaou"
    },
    "clovis": {
        name: "clovis",
        displayName: 'Clovis',
        require: require("../assets/Skin/clovis-big.png"),
        price: 10,
        description: "<3<3<3<3<3<3"
    },
    "dealos": {
        name: "dealos",
        displayName: 'Dealos',
        require: require("../assets/Skin/dealos-big.png"),
        price: 10,
        description: "Tu veux un seudi mon reuf ?"
    },
    "lunette": {
        name: "lunette",
        displayName: 'Mec cool',
        require: require("../assets/Skin/lunette-big.png"),
        price: 10,
        description: "Un mec cool."
    },
    "flower-girl": {
        name: "flower-girl",
        displayName: 'Girly',
        require: require("../assets/Skin/flower-girl-big.png"),
        price: 20,
        description: "Une fille pleine de douceur florale."
    },
    "plant": {
        name: "plant",
        displayName: 'Plante',
        require: require("../assets/Skin/plant-big.png"),
        price: 20,
        description: "Go touch grass."
    },
    "toto-dead": {
        name: "toto-dead",
        displayName: 'Toto mort',
        require: require("../assets/Skin/toto-dead-big.png"),
        price: 20,
        description: "Toto... mais mort."
    },
    "requin": {
        name: "requin",
        displayName: 'Requin',
        require: require("../assets/Skin/requin-big.png"),
        price: 21,
        description: "Un requin spécial..."
    },
    "mafia": {
        name: "mafia",
        displayName: 'Mafia',
        require: require("../assets/Skin/mafia-big.png"),
        price: 40,
        description: "Le parrain de la pègre."
    },
    "clown": {
        name: "clown",
        displayName: 'Clown',
        require: require("../assets/Skin/clown-big.png"),
        price: 50,
        description: "Un clown drôle... ou terrifiant."
    },
    "pichu": {
        name: "pichu",
        displayName: 'Pichu',
        require: require("../assets/Skin/pichu-big.png"),
        price: 50,
        description: "Pikachu etait pas dispo."
    },
    "roi": {
        name: "roi",
        displayName: 'Roi',
        require: require("../assets/Skin/roi-big.png"),
        price: 50,
        description: "Le roi de ce royaume."
    },
    "ghost": {
        name: "ghost",
        displayName: 'Fantome',
        require: require("../assets/Skin/ghost-big.png"),
        price: 80,
        description: "RIP"
    },
    "nosferatu": {
        name: "nosferatu",
        displayName: 'Nosferatu',
        require: require("../assets/Skin/nosferatu-big.png"),
        price: 80,
        description: "Un vampire de legende."
    },
    "robot": {
        name: "robot",
        displayName: 'Robot',
        require: require("../assets/Skin/robot-big.png"),
        price: 80,
        description: "WALL E."
    },
    "emo": {
        name: "emo",
        displayName: 'Emo',
        require: require("../assets/Skin/emo-big.png"),
        price: 90,
        description: "Jena Li."
    },
    "ange": {
        name: "ange",
        displayName: 'Ange',
        require: require("../assets/Skin/ange-big.png"),
        price: 100,
        description: "Un ange gardien venu du ciel."
    },
    "pokemon": {
        name: "pokemon",
        displayName: 'Pokemon',
        require: require("../assets/Skin/pokemon-big.png"),
        price: 100,
        description: "Sacha du Bourg-Palette."
    },
    "toto-en-fumence": {
        name: "toto-en-fumence",
        displayName: 'Toto',
        require: require("../assets/Skin/toto-en-fumence-big.png"),
        price: 100,
        description: "Toto, mais il a fumé un truc."
    },
    "kotaro": {
        name: "kotaro",
        displayName: 'Kotaro',
        require: require("../assets/Skin/kotaro-big.png"),
        price: 120,
        description: "Moi, c'est Kotaro."
    },
    "stitch": {
        name: "stitch",
        displayName: 'Stitch',
        require: require("../assets/Skin/stitch-big.png"),
        price: 130,
        description: "Ohana signifie Famille."
    },
    "wolf": {
        name: "wolf",
        displayName: 'Loup',
        require: require("../assets/Skin/wolf-big.png"),
        price: 130,
        description: "Un loup parmi nous. Grr"
    },
    "duck": {
        name: "duck",
        displayName: 'Canard',
        require: require("../assets/Skin/duck-big.png"),
        price: 150,
        description: "Un canard dans la mare, coin coin."
    },
    "garfield": {
        name: "garfield",
        displayName: 'Garfield',
        require: require("../assets/Skin/garfield-big.png"),
        price: 150,
        description: "Un chat paresseux amateur de lasagnes."
    },
    "peach": {
        name: "peach",
        displayName: 'Peach',
        require: require("../assets/Skin/peach-big.png"),
        price: 150,
        description: "Une princesse tres connue."
    },
    "astro": {
        name: "astro",
        displayName: 'Astronaute',
        require: require("../assets/Skin/astro-big.png"),
        price: 170,
        description: "Il a chaud dans sa combi."
    },
    "zombie": {
        name: "zombie",
        displayName: 'Zombie',
        require: require("../assets/Skin/zombie-big.png"),
        price: 200,
        description: "Cerveau..."
    },
    "steve": {
        name: "steve",
        displayName: 'Steve',
        require: require("../assets/Skin/steve-retarded-big.png"),
        price: 250,
        description: "Un Steve un peu... spécial."
    },
    "han": {
        name: "han",
        displayName: 'Villageois',
        require: require("../assets/Skin/haaaan-big.png"),
        price: 300,
        description: "Haaaaan..."
    },
    "puck": {
        name: "puck",
        displayName: 'Puck',
        require: require("../assets/Skin/puck-big.png"),
        price: 500,
        description: "Calme toi Guts..."
    },
    "demon": {
        name: "demon",
        displayName: 'Demon',
        require: require("../assets/Skin/demon-big.png"),
        price: 666,
        description: "Un demon venu des enfers."
    },
    "guts": {
        name: "guts",
        displayName: 'Guts',
        require: require("../assets/Skin/guts-big.png"),
        price: 1000,
        description: "GRIFFIIIIIIIIIIIIIITH!!!!!!!!"
    },
};

export default skins;
