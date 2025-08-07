const skins = {
    "basic": {
        name: "basic",
        require: require("../assets/Skin/basic-big.png"),
        price: 0,
        description: "Le skin de base pour tous les joueurs."
    },
    "ange": {
        name: "ange",
        require: require("../assets/Skin/ange-big.png"),
        price: 100,
        description: "Un ange gardien venu du ciel."
    },
    "astro": {
        name: "astro",
        require: require("../assets/Skin/astro-big.png"),
        price: 120,
        description: "Un explorateur de galaxies."
    },
    "cat": {
        name: "cat",
        require: require("../assets/Skin/cat-big.png"),
        price: 90,
        description: "Un chat mignon et agile."
    },
    "clovis": {
        name: "clovis",
        require: require("../assets/Skin/clovis-big.png"),
        price: 80,
        description: "Un guerrier des temps anciens."
    },
    "clown": {
        name: "clown",
        require: require("../assets/Skin/clown-big.png"),
        price: 110,
        description: "Un clown drôle... ou terrifiant."
    },
    "demon": {
        name: "demon",
        require: require("../assets/Skin/demon-big.png"),
        price: 130,
        description: "Un démon venu des enfers."
    },
    "flower-girl": {
        name: "flower-girl",
        require: require("../assets/Skin/flower-girl-big.png"),
        price: 100,
        description: "Une fille pleine de douceur florale."
    },
    "guts": {
        name: "guts",
        require: require("../assets/Skin/guts-big.png"),
        price: 150,
        description: "Un héros sombre et puissant."
    },
    "lunette": {
        name: "lunette",
        require: require("../assets/Skin/lunette-big.png"),
        price: 60,
        description: "Un intello sympa."
    },
    "mafia": {
        name: "mafia",
        require: require("../assets/Skin/mafia-big.png"),
        price: 130,
        description: "Le parrain de la pègre."
    },
    "nosferatu": {
        name: "nosferatu",
        require: require("../assets/Skin/nosferatu-big.png"),
        price: 140,
        description: "Un vampire de légende."
    },
    "peach": {
        name: "peach",
        require: require("../assets/Skin/peach-big.png"),
        price: 110,
        description: "Une princesse très connue."
    },
    "plant": {
        name: "plant",
        require: require("../assets/Skin/plant-big.png"),
        price: 70,
        description: "Une plante qui mord."
    },
    "pokemon": {
        name: "pokemon",
        require: require("../assets/Skin/pokemon-big.png"),
        price: 150,
        description: "Un monstre de poche prêt à se battre."
    },
    "robot": {
        name: "robot",
        require: require("../assets/Skin/robot-big.png"),
        price: 100,
        description: "Un robot du futur."
    },
    "roi": {
        name: "roi",
        require: require("../assets/Skin/roi-big.png"),
        price: 120,
        description: "Le roi de ce royaume."
    },
    "wolf": {
        name: "wolf",
        require: require("../assets/Skin/wolf-big.png"),
        price: 100,
        description: "Un loup sauvage et rusé."
    },
    "emo": {
        name: "emo",
        require: require("../assets/Skin/emo-big.png"),
        price: 90,
        description: "Un ado dans sa période dark."
    },
    "kotaro": {
        name: "kotaro",
        require: require("../assets/Skin/kotaro-big.png"),
        price: 120,
        description: "Un ninja légendaire."
    },
    "puck": {
        name: "puck",
        require: require("../assets/Skin/puck-big.png"),
        price: 100,
        description: "Une créature féérique et malicieuse."
    },
    "requin": {
        name: "requin",
        require: require("../assets/Skin/requin-big.png"),
        price: 110,
        description: "Un prédateur des mers."
    },
    "titan": {
        name: "titan",
        require: require("../assets/Skin/titan-colossal-big.png"),
        price: 200,
        description: "Un titan destructeur colossal."
    },
    "toto-en-fumence": {
        name: "toto-en-fumence",
        require: require("../assets/Skin/toto-en-fumence-big.png"),
        price: 90,
        description: "Toto, mais il a fumé un truc."
    },
    "toto-dead": {
        name: "toto-dead",
        require: require("../assets/Skin/toto-dead-big.png"),
        price: 70,
        description: "Toto... mais mort."
    },
    "stitch": {
        name: "stitch",
        require: require("../assets/Skin/stitch-big.png"),
        price: 130,
        description: "Une créature extraterrestre adorée."
    },
    "tanuki": {
        name: "tanuki",
        require: require("../assets/Skin/tanuki-big.png"),
        price: 90,
        description: "Un tanuki espiègle."
    },
    "garfield": {
        name: "garfield",
        require: require("../assets/Skin/garfield-big.png"),
        price: 100,
        description: "Un chat paresseux amateur de lasagnes."
    },
    "pichu": {
        name: "pichu",
        require: require("../assets/Skin/pichu-big.png"),
        price: 120,
        description: "Une version adorable d’un Pokémon électrique."
    },
    "mcdo": {
        name: "mcdo",
        require: require("../assets/Skin/employe-mcdo-big.png"),
        price: 80,
        description: "Un employé de fast-food motivé."
    },
    "steve": {
        name: "steve",
        require: require("../assets/Skin/steve-retarded-big.png"),
        price: 90,
        description: "Un Steve un peu... spécial."
    },
    "zombie": {
        name: "zombie",
        require: require("../assets/Skin/zombie-big.png"),
        price: 100,
        description: "Un mort-vivant affamé."
    },
    "moche": {
        name: "moche",
        require: require("../assets/Skin/le-moche-big.png"),
        price: 50,
        description: "Pas beau, mais marrant."
    },
    "han": {
        name: "han",
        require: require("../assets/Skin/haaaan-big.png"),
        price: 60,
        description: "Haaaaaaaan, quel style."
    },
    "ghost": {
        name: "ghost",
        require: require("../assets/Skin/ghost-big.png"),
        price: 80,
        description: "Un fantôme tout blanc."
    },
    "dealos": {
        name: "dealos",
        require: require("../assets/Skin/dealos-big.png"),
        price: 110,
        description: "Un héros sans peur... ou presque."
    },
    "duck": {
        name: "duck",
        require: require("../assets/Skin/duck-big.png"),
        price: 110,
        description: "Un canard dans la mare."
    }
};

export default skins;
