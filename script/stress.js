const STORAGE_KEY_STRESS = 'stress_trainer_state_v10';

function shuffleArrayStress(array) {
    return array.sort(() => Math.random() - 0.5);
}

let wordsStress = ['аэропОрты', 'бАнты', 'бОроду', 'бухгАлтеров', 'вероисповЕдание', 'водопровОд', 'газопровОд', 'граждАнство', 'дефИс', 'дешевИзна', 'диспансЕр', 'договорЕнность', 'докумЕнт', 'досУг', 'еретИк', 'жалюзИ', 'знАчимость', 'Иксы', 'каталОг', 'квартАл', 'киломЕтр', 'кОнусов', 'корЫсть', 'крАны', 'кремЕнь', 'кремнЯ', 'лЕкторов', 'лОктя', 'лыжнЯ', 'мЕстностей', 'намЕрение', 'нарОст', 'нЕдруг', 'недУг', 'некролОг', 'нЕнависть', 'нефтепровОд', 'новостЕй', 'нОгтя', 'ногтЕй', 'Отрочество', 'партЕр', 'портфЕль', 'пОручни', 'придАное', 'призЫв', 'свЕкла', 'сирОты', 'созЫв', 'сосредотОчение', 'срЕдства', 'стАтуя', 'столЯр', 'тамОжня', 'тОрты', 'тУфля', 'цемЕнт', 'цЕнтнер', 'цепОчка', 'шАрфы', 'шофЕр', 'экспЕрт', 'вернА', 'знАчимый', 'красИвее', 'красИвейший', 'кУхонный', 'ловкА', 'мозаИчный', 'оптОвый', 'прозорлИвый', 'прозорлИва', 'слИвовый', 'бралА', 'бралАсь', 'взялА', 'взялАсь', 'влилАсь', 'ворвалАсь', 'воспринЯть', 'воспринялА', 'воссоздалА', 'вручИт', 'гналА', 'гналАсь', 'добралА', 'добралАсь', 'дождалАсь', 'дозвонИтся', 'дозИровать', 'ждалА', 'жилОсь', 'закУпорить', 'занЯть', 'заперлА', 'запломбировАть', 'защемИт', 'звалА', 'звонИт', 'кАшлянуть', 'клАла', 'клЕить', 'крАлась', 'кровоточИть', 'лгалА', 'лилА', 'лилАсь', 'навралА', 'наделИт', 'надорвалАсь', 'назвалАсь', 'накренИтся', 'налилА', 'нарвалА', 'начАть', 'обзвонИт', 'облегчИть', 'облегчИт', 'облилАсь', 'обнялАсь', 'обогналА', 'ободралА', 'ободрИть', 'ободрИться', 'обострИть', 'одолжИть', 'озлОбить', 'оклЕить', 'окружИт', 'опОшлить', 'освЕдомиться', 'освЕдомится', 'отбылА', 'отдалА', 'откУпорить', 'отозвалА', 'отозвалАсь', 'перезвонИт', 'перелилА', 'плодоносИть', 'пломбировАть', 'повторИт', 'позвалА', 'позвонИт', 'полилА', 'положИть', 'понЯть', 'послАла', 'прибЫть', 'принЯть', 'рвалА', 'сверлИт', 'снялА', 'совралА', 'создалА', 'сорвалА', 'сорИт', 'убралА', 'углубИть', 'укрепИт', 'чЕрпать', 'щемИт', 'щЕлкать', 'довезЕнный', 'зАгнутый', 'зАнятый', 'зАпертый', 'заселЕнный', 'кормЯщий', 'кровоточАщий', 'нажИвший', 'налИвший', 'нанЯвшийся', 'начАвший', 'нАчатый', 'низведЕнный', 'облегчЕнный', 'ободрЕнный', 'обострЕнный', 'отключЕнный', 'повторЕнный', 'поделЕнный', 'понЯвший', 'прИнятый', 'приручЕнный', 'прожИвший', 'снятА', 'сОгнутый', 'углублЕнный', 'закУпорив', 'начАв', 'начАвшись', 'отдАв', 'поднЯв', 'понЯв', 'прибЫв', 'создАв', 'вОвремя', 'дОверху', 'донЕльзя', 'дОнизу', 'дОсуха', 'зАсветло', 'зАтемно', 'красИвее', 'надОлго', 'ненадОлго'];

const vowels = 'аеёиоуыэюя';

let totalWordsStress = 0;
let correctWordsStress = 0;
let wrongWordsStress = 0;

const mainStress = document.querySelector('main');
const totalWordsSpan = document.getElementById('totalWords');
const correctWordsSpan = document.getElementById('correctWords');
const wrongWordsSpan = document.getElementById('wrongWords');
const accuracySpan = document.getElementById('accuracy');

const resetTopStress = document.getElementById('resetTop');
const showMistakesTopStress = document.getElementById('showMistakesTop');
const resetBottomStress = document.getElementById('resetBottom');
const showMistakesBottomStress = document.getElementById('showMistakesBottom');

const mistakesPopupOverlayStress = document.getElementById('mistakesPopupOverlay');
const mistakesListStress = document.getElementById('mistakesList');
const closeMistakesPopupStress = document.getElementById('closeMistakesPopup');

function updateStatsStress() {
    totalWordsSpan.textContent = totalWordsStress;
    correctWordsSpan.textContent = correctWordsStress;
    wrongWordsSpan.textContent = wrongWordsStress;
    const acc = totalWordsStress ? Math.round((correctWordsStress / totalWordsStress) * 100) : 0;
    accuracySpan.textContent = acc;
}

function saveStateStress() {
    const state = {
        wordsStress,
        totalWordsStress,
        correctWordsStress,
        wrongWordsStress,
        wordResults: Array.from(mainStress.querySelectorAll('.word')).map(div => ({
            result: div.dataset.result || 'none',
            html: div.innerHTML
        }))
    };
    try {
        localStorage.setItem(STORAGE_KEY_STRESS, JSON.stringify(state));
    } catch (e) {}
}

function loadStateStress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_STRESS);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function renderWordsStress(fromState) {
    mainStress.innerHTML = '';
    let wordsToUse = wordsStress;

    if (!fromState) {
        wordsToUse = shuffleArrayStress(wordsStress.slice());
        wordsStress = wordsToUse;
    } else if (fromState.wordsStress && fromState.wordsStress.length) {
        wordsStress = fromState.wordsStress;
        wordsToUse = fromState.wordsStress;
    }

    totalWordsStress = wordsToUse.length;
    correctWordsStress = 0;
    wrongWordsStress = 0;

    wordsToUse.forEach((word, wordIndex) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.id = `word-${wordIndex}`;
        wordDiv.dataset.result = 'none';

        const saved = fromState && fromState.wordResults && fromState.wordResults[wordIndex];

        if (saved) {
            wordDiv.innerHTML = saved.html;
            wordDiv.dataset.result = saved.result;
            
            // Переподключаем обработчики для некликнутых гласных
            Array.from(wordDiv.querySelectorAll('span')).forEach(span => {
                if (!span.classList.contains('correct') && !span.classList.contains('wrong')) {
                    span.addEventListener('click', handleVowelClick);
                }
            });

            if (saved.result === 'correct') correctWordsStress++;
            if (saved.result === 'wrong') wrongWordsStress++;
        } else {
            // Рендерим слово первый раз
            const chars = [...word];
            chars.forEach((ch, charIndex) => {
                const lowerCh = ch.toLowerCase();
                
                if (vowels.includes(lowerCh)) {
                    // Это гласная — делаем span
                    const span = document.createElement('span');
                    span.textContent = lowerCh;
                    span.dataset.wordIndex = wordIndex;
                    span.dataset.charIndex = charIndex;
                    span.addEventListener('click', handleVowelClick);
                    wordDiv.appendChild(span);
                } else {
                    // Не гласная — просто текст
                    wordDiv.appendChild(document.createTextNode(lowerCh));
                }
            });
        }

        mainStress.appendChild(wordDiv);
    });

    updateStatsStress();
}

function handleVowelClick(e) {
    const span = e.target;
    const wordIndex = Number(span.dataset.wordIndex);
    const charIndex = Number(span.dataset.charIndex);
    
    const wordDiv = document.getElementById(`word-${wordIndex}`);
    if (!wordDiv || wordDiv.dataset.result !== 'none') return;

    const originalWord = wordsStress[wordIndex];
    const originalChars = [...originalWord];
    
    // Найти индекс ударной буквы (заглавной)
    let correctIndex = -1;
    for (let i = 0; i < originalChars.length; i++) {
        if (originalChars[i] !== originalChars[i].toLowerCase()) {
            correctIndex = i;
            break;
        }
    }

    if (correctIndex === -1) return;

    const correctChar = originalChars[correctIndex].toLowerCase();
    const allSpans = Array.from(wordDiv.querySelectorAll('span'));

    if (charIndex === correctIndex) {
        // Правильная гласная
        span.textContent = correctChar.toUpperCase();
        span.style.color = 'green';
        span.className = 'correct';
        
        wordDiv.dataset.result = 'correct';
        correctWordsStress++;
    } else {
        // Неправильная гласная
        span.style.color = 'red';
        span.style.textDecoration = 'line-through';
        span.className = 'wrong';
        
        // Найти правильный span и выделить его зелёным
        const correctSpan = allSpans.find(s => Number(s.dataset.charIndex) === correctIndex);
        if (correctSpan) {
            correctSpan.textContent = correctChar.toUpperCase();
            correctSpan.style.color = 'green';
            correctSpan.className = 'correct';
        }
        
        wordDiv.dataset.result = 'wrong';
        wrongWordsStress++;
    }

    updateStatsStress();
    saveStateStress();
}

function collectMistakesStress() {
    const result = [];

    Array.from(mainStress.querySelectorAll('.word')).forEach((wordDiv, index) => {
        if (wordDiv.dataset.result !== 'wrong') return;

        const original = wordsStress[index];
        if (!original) return;
        const chars = [...original];

        let html = '';
        chars.forEach(ch => {
            if (ch !== ch.toLowerCase()) {
                html += `<span style="color: green;">${ch}</span>`;
            } else {
                html += ch.toLowerCase();
            }
        });

        result.push(html);
    });

    return result;
}

function showMistakesPopupStress() {
    const list = collectMistakesStress();
    mistakesListStress.innerHTML = '';

    if (!list.length) {
        mistakesListStress.innerHTML = '<div>Ошибок нет.</div>';
    } else {
        list.forEach(html => {
            const div = document.createElement('div');
            div.className = 'popup-word';
            div.innerHTML = html;
            mistakesListStress.appendChild(div);
        });
    }

    mistakesPopupOverlayStress.style.display = 'flex';
}

function hideMistakesPopupStress() {
    mistakesPopupOverlayStress.style.display = 'none';
}

function resetAllStress() {
    try {
        localStorage.removeItem(STORAGE_KEY_STRESS);
    } catch (e) {}
    renderWordsStress(null);
}

(function startStress() {
    const loaded = loadStateStress();
    renderWordsStress(loaded);
})();

resetTopStress.addEventListener('click', resetAllStress);
resetBottomStress.addEventListener('click', resetAllStress);
showMistakesTopStress.addEventListener('click', showMistakesPopupStress);
showMistakesBottomStress.addEventListener('click', showMistakesPopupStress);
closeMistakesPopupStress.addEventListener('click', hideMistakesPopupStress);
mistakesPopupOverlayStress.addEventListener('click', e => {
    if (e.target === mistakesPopupOverlayStress) hideMistakesPopupStress();
});
