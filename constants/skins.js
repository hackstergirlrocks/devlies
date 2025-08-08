const skins = {
    // GRATUIT
    "basic": {
        name: "Basic",
        require: require("../assets/Skin/basic-big.png"),
        price: 0,
        description: "Le skin de base pour tous les joueurs."
    },

    // 5 PIECES
    "mcdo": {
        name: "Employe fast-food",
        require: require("../assets/Skin/employe-mcdo-big.png"),
        price: 5,
        description: "Burger, frite, coca?"
    },

    // 10 PIECES
    "cat": {
        name: "Chat",
        require: require("../assets/Skin/cat-big.png"),
        price: 10,
        description: "Miaou"
    },
    "clovis": {
        name: "Clovis",
        require: require("../assets/Skin/clovis-big.png"),
        price: 10,
        description: "<3<3<3<3<3<3"
    },
    "dealos": {
        name: "Dealos",
        require: require("../assets/Skin/dealos-big.png"),
        price: 10,
        description: "Tu veux un seudi mon reuf ?"
    },
    "lunette": {
        name: "Mec cool",
        require: require("../assets/Skin/lunette-big.png"),
        price: 10,
        description: "Un mec cool."
    },

    // 20 PIECES
    "flower-girl": {
        name: "Girly",
        require: require("../assets/Skin/flower-girl-big.png"),
        price: 20,
        description: "Une fille pleine de douceur florale."
    },
    "plant": {
        name: "Plante",
        require: require("../assets/Skin/plant-big.png"),
        price: 20,
        description: "Go touch grass."
    },
    "toto-dead": {
        name: "Toto mort",
        require: require("../assets/Skin/toto-dead-big.png"),
        price: 20,
        description: "Toto... mais mort."
    },

    // 21 PIECES
    "requin": {
        name: "Requin",
        require: require("../assets/Skin/requin-big.png"),
        price: 21,
        description: "Un requin spécial..."
    },

    // 40 PIECES
    "mafia": {
        name: "Tony Montana",
        require: require("../assets/Skin/mafia-big.png"),
        price: 40,
        description: "Le parrain de la pègre."
    },

    // 50 PIECES
    "clown": {
        name: "Clown",
        require: require("../assets/Skin/clown-big.png"),
        price: 50,
        description: "Un clown drôle... ou terrifiant."
    },
    "pichu": {
        name: "Pichu",
        require: require("../assets/Skin/pichu-big.png"),
        price: 50,
        description: "Pikachu etait pas dispo."
    },
    "roi": {
        name: "Roi",
        require: require("../assets/Skin/roi-big.png"),
        price: 50,
        description: "Le roi de ce royaume."
    },

    // 80 PIECES
    "ghost": {
        name: "Fantome",
        require: require("../assets/Skin/ghost-big.png"),
        price: 80,
        description: "RIP"
    },
    "nosferatu": {
        name: "Nosferatu",
        require: require("../assets/Skin/nosferatu-big.png"),
        price: 80,
        description: "Un vampire de legende."
    },
    "robot": {
        name: "Robot",
        require: require("../assets/Skin/robot-big.png"),
        price: 80,
        description: "WALL E."
    },

    // 90 PIECES
    "emo": {
        name: "Emo",
        require: require("../assets/Skin/emo-big.png"),
        price: 90,
        description: "Jena Li."
    },

    // 100 PIECES
    "ange": {
        name: "Ange",
        require: require("../assets/Skin/ange-big.png"),
        price: 100,
        description: "Un ange gardien venu du ciel."
    },
    "pokemon": {
        name: "Pokemon",
        require: require("../assets/Skin/pokemon-big.png"),
        price: 100,
        description: "Sacha du Bourg-Palette."
    },
    "toto-en-fumence": {
        name: "Toto",
        require: require("../assets/Skin/toto-en-fumence-big.png"),
        price: 100,
        description: "Toto, mais il a fumé un truc."
    },

    // 120 PIECES
    "kotaro": {
        name: "Kotaro",
        require: require("../assets/Skin/kotaro-big.png"),
        price: 120,
        description: "Moi, c'est Kotaro."
    },

    // 130 PIECES
    "stitch": {
        name: "stitch",
        require: require("../assets/Skin/stitch-big.png"),
        price: 130,
        description: "Ohana signifie Famille."
    },
    "wolf": {
        name: "Loup",
        require: require("../assets/Skin/wolf-big.png"),
        price: 130,
        description: "Un loup parmi nous. Grr"
    },

    // 150 PIECES
    "duck": {
        name: "Canard",
        require: require("../assets/Skin/duck-big.png"),
        price: 150,
        description: "Un canard dans la mare, coin coin."
    },
    "garfield": {
        name: "Garfield",
        require: require("../assets/Skin/garfield-big.png"),
        price: 150,
        description: "Un chat paresseux amateur de lasagnes."
    },
    "peach": {
        name: "Peach",
        require: require("../assets/Skin/peach-big.png"),
        price: 150,
        description: "Une princesse tres connue."
    },

    // 170 PIECES
    "astro": {
        name: "Astronaute",
        require: require("../assets/Skin/astro-big.png"),
        price: 170,
        description: "Il a chaud dans sa combi."
    },

    // 200 PIECES
    "zombie": {
        name: "Zombie",
        require: require("../assets/Skin/zombie-big.png"),
        price: 200,
        description: "Cerveau..."
    },

    // 250 PIECES
    "steve": {
        name: "Steve",
        require: require("../assets/Skin/steve-retarded-big.png"),
        price: 250,
        description: "Un Steve un peu... spécial."
    },

    // 300 PIECES
    "han": {
        name: "Villageois",
        require: require("../assets/Skin/haaaan-big.png"),
        price: 300,
        description: "Haaaaan..."
    },

    // 500 PIECES
    "puck": {
        name: "Puck",
        require: require("../assets/Skin/puck-big.png"),
        price: 500,
        description: "Calme toi Guts..."
    },

    // 666 PIECES
    "demon": {
        name: "Demon",
        require: require("../assets/Skin/demon-big.png"),
        price: 666,
        description: "Un demon venu des enfers."
    },

    // 1000 PIECES
    "guts": {
        name: "Guts",
        require: require("../assets/Skin/guts-big.png"),
        price: 1000,
        description: "GRIFFIIIIIIIIIIIIIITH!!!!!!!!"
    },
};

export default skins;
