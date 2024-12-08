//maximelabille
var qcmdata = {
    questions: [
        {
            question: "Qu'est-ce que JavaScript ?",
            reponses: [
                { reponse: "Un langage de programmation", bonneReponse: true },
                { reponse: "Un langage de marquage", bonneReponse: false },
                { reponse: "Un langage de script", bonneReponse: false },
                { reponse: "Un langage de programmation objet", bonneReponse: false },
            ],
        },
        {
            question: "Comment s'ecrit un commentaire en JavaScript ?",
            reponses: [
                { reponse: "< !--", bonneReponse: false },
                { reponse: "//", bonneReponse: true },
                { reponse: "<p>", bonneReponse: false },
            ],
        },
        {
            question: "Quel est l'operateur de comparaison strict en JavaScript ?",
            reponses: [
                { reponse: "===", bonneReponse: true },
                { reponse: "==", bonneReponse: false },
                { reponse: "===" , bonneReponse: false },
                { reponse: "<>", bonneReponse: false },
            ],
        },
        {
            question: "Quel est l'objet global en JavaScript ?",
            reponses: [
                { reponse: "document", bonneReponse: false },
                { reponse: "global", bonneReponse: false },
                { reponse: "window", bonneReponse: true },
                { reponse: "this", bonneReponse: false },
            ],
        },
        {
            question: "Quel est le type de donnees boolean en JavaScript ?",
            reponses: [
                { reponse: "0 ou 1", bonneReponse: false },
                { reponse: "yes ou no", bonneReponse: false },
                { reponse: "true ou false", bonneReponse: true },
            ],
        },
        {
            question: "Quel est l'operateur de multiplication en JavaScript ?",
            reponses: [
                { reponse: "*", bonneReponse: true },
                { reponse: "/", bonneReponse: false },
                { reponse: "+", bonneReponse: false },
                { reponse: "-", bonneReponse: false },
            ],
        },
        {
            question: "Quel est le nom de la fonction qui permet de convertir un nombre en chaine de caracteres en JavaScript ?",
            reponses: [
                { reponse: "toNumber", bonneReponse: false },
                { reponse: "toBool", bonneReponse: false },
                { reponse: "toString", bonneReponse: true },
                { reponse: "toChar", bonneReponse: false },
            ],
        },
        {
            question: "Quel est le nom du navigateur qui est le premier a avoir utiliser JavaScript ?",
            reponses: [
                { reponse: "Chrome", bonneReponse: false },
                { reponse: "Safari", bonneReponse: false },
                { reponse: "Netscape", bonneReponse: true },
                { reponse: "Opera", bonneReponse: false },
                { reponse: "Mosaic", bonneReponse: false },
            ],
        },
        {
            question: "Quel est le nom de la methode qui permet de recuperer un element de type par id en JavaScript ?",
            reponses: [
                { reponse: "document.querySelector", bonneReponse: false },
                { reponse: "document.getElementById", bonneReponse: true },
                { reponse: "document.getElementsByTagName", bonneReponse: false },
                { reponse: "document.createElement", bonneReponse: false },
            ],
        },
        {
            question: "Quel est l'operateur de division en JavaScript ?",
            reponses: [
                { reponse: "/", bonneReponse: true },
                { reponse: "-", bonneReponse: false },
            ],
        },
    ],
};

var qcm = document.querySelector(".qcm");
var qcmTemplate = document.querySelector(".question-template");
var score = document.querySelector(".score");
var correction = document.querySelector("#correction");
var corrige = document.querySelector("#corrige");
var effacer = document.querySelector("#effacer");
var questions = qcmdata.questions;

function genererQCM() {
    // genere les questions du qcm depuis le json
    for (let i = 0; i < questions.length; i++) {
        var question = qcmTemplate.cloneNode(true);
        question.classList.remove("question-template");
        question.querySelector(".question-titre").textContent = questions[i].question;
        var resultats = question.querySelector(".resultats");
        for (let j = 0; j < questions[i].reponses.length; j++) {
            var reponse = document.createElement("div");
            var input = document.createElement("input");
            input.type = "radio";
            input.classList.add("resultat");
            if (questions[i].reponses[j].bonneReponse) {
                input.classList.add("bonne-reponse");
            }
            input.setAttribute("name", "q" + i);
            input.setAttribute("value", "r" + j);
            input.addEventListener("click", function() {
                var qa = 0;
                for (let i = 0; i < questions.length; i++) {
                    if (document.querySelector('input[name="q' + i + '"]:checked')) {
                        qa++;
                    }
                }
                if (qa == questions.length) {
                    correction.disabled = false;
                }
            });
            reponse.appendChild(input);
            var reponseText = document.createElement("i");
            reponseText.textContent = questions[i].reponses[j].reponse;
            reponse.appendChild(reponseText);
            reponse.setAttribute("id", "q" + i + "r" + j);
            resultats.appendChild(reponse);
        }
        qcm.appendChild(question);
    }
    qcm.removeChild(qcmTemplate);
}

function testQCM() {
    var bonnesReponses = 0;
    for (let i = 0; i < questions.length; i++) {
        var selectedAnswer = document.querySelector('input[name="q' + i + '"]:checked');
        if (selectedAnswer && selectedAnswer.classList.contains('bonne-reponse')) {
            bonnesReponses++;
        }
    }
    score.textContent = "Score: " + bonnesReponses + " / " + questions.length;
}

genererQCM();

correction.addEventListener("click", function() {
    // affiche la note du qcm
    testQCM();
    correction.disabled = true;
    corrige.disabled = false;
    effacer.disabled = false;
});

corrige.addEventListener("click", function() {
    // ouvre dans un nouvle onglet la correction
    var correctionWindow = window.open('about:blank', 'correction');
    correctionWindow.document.write("<link rel=\"stylesheet\" href=\"style.css\">");
    correctionWindow.document.write("<h2 class=\"title\">Correction</h2><div class=\"qcm\">");
    for (let i = 0; i < questions.length; i++) {
        // affiche le titre de la question
        correctionWindow.document.write("<div class=\"question\"><p class=\"question-titre\">" + questions[i].question + "</p>");
        // affiche les reponses
        correctionWindow.document.write("<div class=\"resultats\">");
        for (let j = 0; j < questions[i].reponses.length; j++) {
            if (questions[i].reponses[j].bonneReponse) {
                correctionWindow.document.write("<p class='bonne-reponse'>" + questions[i].reponses[j].reponse + "</p>");
            } else {
                correctionWindow.document.write("<p>" + questions[i].reponses[j].reponse + "</p>");
            }
        }
        correctionWindow.document.write("</div></div>");
    }
});

effacer.addEventListener("click", function() {
    // reinitialise le qcm
    for (let i = 0; i < questions.length; i++) {
        if (document.querySelector('input[name="q' + i + '"]:checked')) {
            document.querySelector('input[name="q' + i + '"]:checked').checked = false;
        }
    }
    correction.disabled = true;
    corrige.disabled = true;
    score.textContent = " ";
});