const STORAGE_KEY_DICT = 'dict_words_trainer_state_v1';

const rawWordsDict = `
абИтурИент
абонЕмент
абрИкос
абрИкосовый
акАдемия
акАдемический
аквАмарин
аквАрель
аквАрельный
аккОмпАнЕмент
аккОмпАнИровать
аккОмпАнИатор
аннОтация
АнтрЕсоли
АпЕлляция
АпЕллировать
аплОдировать
аплОдисменты
аппАратУра
аппЕтИт
арОмат
арОматный
архИтектор
архИтектура
асфАльт
Асфальтировать
АтмОсфера
АтмОсферный
АттрАкцИон
аукцИон
бАгаж
бАгажный
бАгровый
бАгроветь
бАгряный
бАдмИнтон
бАланс
бАлансировать
бАлкон
бАлконный
бАрельеф
бАскетбол
бАскетбольный
бАссейн
бЕрёза
бЕрёзовый
бЕречь
бИрЮзовый
бОгатый
бОгатство
бОгатырь
брОшюра
брОшюровать
бЮллетень
вАкцина
вАкцИнация
вАкцИнировать
вАриант
вАриативный
вЕлОсИпед
вЕлОсИпедный
вЕнтИлятор
вЕнтИляторный
вЕрмИшель
вЕстИбюль
вЕтЕран
вЕтЕранский
вИнЕгрет
вИртуальный
вИртуоз
вИртуозный
вИтраж
вИтражный
влАделец
влАдеть
вОзражать
вОзрАжение
вОкзал
вОкзальный
вОлЕйбол
вОлЕйбольный
вОображать
вОображение
вОплОтить
вОплОщать
вОплОщение
впЕчАтлить
впЕчАтление
вырАзитЕльный
вырАзить
вырАжать
вырАжение
гАзон
гАлактика
гАлактический
гАлЕрея
гАрмония
гАрмОничный
гАрнИзон
гЕолог
гЕологический
гЕология
гЕрой
гЕроизм
гЕроический
гИпотеза
гИпОтетический
гОрмон
гОрячий
гОризонт
гОризонтальный
грАмМатика
грАмМатический
грамОта
грамОтный
грОмадный
грОмоздкий
грОмОздить
дЕбаты
декларАция
декорАция
декорАтивный
деликАтес
деликАтный
демокрАт
демокрАтичный
демОнстрировать
демОнстрАция
диалОг
диалОговый
диалОгический
диапАзон
динАмика
динАмический
динАмИчный
дирижЁр
дирижИровать
диспЕтчер
диспЕтчерский
дистАнция
дистАнционный
дисциплИна
дисциплИнАрный
дисциплИнИровать
`.split(/\s|,\s*/).filter(Boolean);

function parseWordDict(word) {
    const letters = [...word];
    const check = [];
    letters.forEach((ch, i) => {
        if (ch === ch.toUpperCase() && ch.match(/[А-ЯЁ]/)) {
            check.push(i);
        }
    });
    return { original: word, lower: word.toLowerCase(), check };
}

let wordsDataDict = [];
let wordElementsDict = [];
let currentWordDict = 0;
let currentLetterDict = 0;

let totalSlotsDict = 0;
let correctCountDict = 0;
let wrongCountDict = 0;

const containerDict = document.getElementById('wordsContainer');
const totalSlotsSpanDict = document.getElementById('totalSlots');
const correctCountSpanDict = document.getElementById('correctCount');
const wrongCountSpanDict = document.getElementById('wrongCount');
const accuracySpanDict = document.getElementById('accuracy');

const resetBtnTopDict = document.getElementById('resetBtnTop');
const resetBtnBottomDict = document.getElementById('resetBtnBottom');
const showMistakesBtnTopDict = document.getElementById('showMistakesBtnTop');
const showMistakesBtnBottomDict = document.getElementById('showMistakesBtnBottom');
const mistakesPopupOverlayDict = document.getElementById('mistakesPopupOverlay');
const mistakesListDict = document.getElementById('mistakesList');
const closeMistakesPopupDict = document.getElementById('closeMistakesPopup');

function shuffleDict(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateStatsDict() {
    totalSlotsSpanDict.textContent = totalSlotsDict;
    correctCountSpanDict.textContent = correctCountDict;
    wrongCountSpanDict.textContent = wrongCountDict;
    const acc = totalSlotsDict ? Math.round((correctCountDict / totalSlotsDict) * 100) : 0;
    accuracySpanDict.textContent = acc;
}

function initDataDict() {
    wordsDataDict = rawWordsDict.map(parseWordDict);
    shuffleDict(wordsDataDict);
}

function saveStateDict() {
    const state = {
        wordsDataDict,
        totalSlotsDict,
        correctCountDict,
        wrongCountDict,
        letters: wordElementsDict.map(obj =>
            Array.from(obj.letters).map(span => ({
                correct: span.dataset.correct,
                done: span.dataset.done || '0',
                result: span.dataset.result || ''
            }))
        )
    };
    try {
        localStorage.setItem(STORAGE_KEY_DICT, JSON.stringify(state));
    } catch (e) {}
}

function loadStateDict() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_DICT);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function buildUIDict(fromState) {
    containerDict.innerHTML = '';
    wordElementsDict = [];
    totalSlotsDict = 0;
    correctCountDict = 0;
    wrongCountDict = 0;

    wordsDataDict.forEach((data, wordIndex) => {
        const div = document.createElement('div');
        div.className = 'word';

        const charsLower = [...data.lower];
        let letterIndex = 0;

        charsLower.forEach((ch, i) => {
            if (data.check.includes(i)) {
                const span = document.createElement('span');
                span.className = 'letter';
                span.dataset.correct = charsLower[i];

                let stateForSpan = null;
                if (fromState && fromState.letters && fromState.letters[wordIndex]) {
                    stateForSpan = fromState.letters[wordIndex][letterIndex] || null;
                }

                if (stateForSpan) {
                    span.dataset.done = stateForSpan.done;
                    span.dataset.result = stateForSpan.result;

                    if (stateForSpan.done === '1') {
                        if (stateForSpan.result === 'right') {
                            span.textContent = span.dataset.correct;
                            span.classList.add('correct');
                            correctCountDict++;
                        } else if (stateForSpan.result === 'wrong') {
                            span.classList.add('wrong-slot');
                            const inner = document.createElement('span');
                            inner.textContent = span.dataset.correct;
                            inner.classList.add('wrong-inner');
                            span.appendChild(inner);
                            wrongCountDict++;
                        }
                    } else {
                        span.innerHTML = '&nbsp;';
                    }
                } else {
                    span.innerHTML = '&nbsp;';
                }

                div.appendChild(span);
                letterIndex++;
                totalSlotsDict++;
            } else {
                const span = document.createElement('span');
                span.textContent = ch;
                div.appendChild(span);
            }
        });

        const input = document.createElement('input');
        input.className = 'hiddenInput';
        input.autocomplete = 'off';
        input.spellcheck = false;
        div.appendChild(input);

        containerDict.appendChild(div);
        wordElementsDict.push({ div, input, letters: div.querySelectorAll('.letter') });
    });

    if (fromState) {
        totalSlotsDict = fromState.totalSlotsDict || totalSlotsDict;
        correctCountDict = fromState.correctCountDict || correctCountDict;
        wrongCountDict = fromState.wrongCountDict || wrongCountDict;
    }

    updateStatsDict();
    focusFirstEmptyDict();
}

function focusFirstEmptyDict() {
    let found = false;
    for (let w = 0; w < wordElementsDict.length; w++) {
        const letters = wordElementsDict[w].letters;
        for (let i = 0; i < letters.length; i++) {
            const span = letters[i];
            if (span.dataset.done !== '1') {
                currentWordDict = w;
                currentLetterDict = i;
                wordElementsDict.forEach(obj => obj.div.classList.remove('active'));
                wordElementsDict[w].div.classList.add('active');
                wordElementsDict[w].input.focus();
                found = true;
                break;
            }
        }
        if (found) break;
    }
    if (!found && wordElementsDict.length) {
        currentWordDict = 0;
        currentLetterDict = 0;
        wordElementsDict[0].div.classList.add('active');
        wordElementsDict[0].input.focus();
    }
}

function attachHandlersDict() {
    wordElementsDict.forEach((obj, wordIndex) => {
        const { div, input, letters } = obj;

        div.addEventListener('click', () => {
            input.focus();
        });

        input.oninput = () => {
            const value = input.value.toLowerCase();
            input.value = '';

            if (!value) return;

            let hasEmptyHere = false;
            letters.forEach(sp => {
                if (sp.dataset.done !== '1') hasEmptyHere = true;
            });
            if (!hasEmptyHere) {
                focusFirstEmptyDict();
                return;
            }

            if (wordIndex !== currentWordDict) {
                focusFirstEmptyDict();
                return;
            }

            const span = letters[currentLetterDict];
            if (!span) {
                focusFirstEmptyDict();
                return;
            }

            const correct = span.dataset.correct;

            if (span.dataset.done === '1') {
                focusFirstEmptyDict();
                return;
            }

            span.innerHTML = '';

            if (value === correct) {
                span.textContent = correct;
                span.classList.add('correct');
                span.dataset.done = '1';
                span.dataset.result = 'right';
                correctCountDict++;
            } else {
                span.classList.add('wrong-slot');
                const inner = document.createElement('span');
                inner.textContent = correct;
                inner.classList.add('wrong-inner');
                span.appendChild(inner);

                span.dataset.done = '1';
                span.dataset.result = 'wrong';
                wrongCountDict++;
            }

            updateStatsDict();
            saveStateDict();

            currentLetterDict++;
            if (currentLetterDict >= letters.length) {
                wordElementsDict[wordIndex].div.classList.remove('active');
                focusFirstEmptyDict();
            }
        };
    });
}

function collectMistakesDict() {
    const mistakes = [];
    wordElementsDict.forEach((obj, wordIndex) => {
        const letters = obj.letters;
        let wordHasError = false;
        letters.forEach(span => {
            if (span.dataset.result === 'wrong') wordHasError = true;
        });
        if (!wordHasError) return;

        const originalLower = wordsDataDict[wordIndex].lower;
        const chars = [...originalLower];
        const capsPositions = wordsDataDict[wordIndex].check;

        let html = '';
        chars.forEach((ch, i) => {
            if (capsPositions.includes(i)) {
                html += `<span class="green">${ch.toUpperCase()}</span>`;
            } else {
                html += ch;
            }
        });

        mistakes.push(html);
    });
    return mistakes;
}

function showMistakesPopupDict() {
    const mistakes = collectMistakesDict();
    mistakesListDict.innerHTML = '';

    if (!mistakes.length) {
        mistakesListDict.innerHTML = '<div>Ошибок нет.</div>';
    } else {
        mistakes.forEach(html => {
            const div = document.createElement('div');
            div.className = 'popup-word';
            div.innerHTML = html;
            mistakesListDict.appendChild(div);
        });
    }

    mistakesPopupOverlayDict.style.display = 'flex';
}

function hideMistakesPopupDict() {
    mistakesPopupOverlayDict.style.display = 'none';
}

function resetAllDict() {
    try {
        localStorage.removeItem(STORAGE_KEY_DICT);
    } catch (e) {}
    initDataDict();
    buildUIDict(null);
    attachHandlersDict();
}

(function startDict() {
    const loaded = loadStateDict();
    if (!loaded) {
        initDataDict();
        buildUIDict(null);
    } else {
        wordsDataDict = loaded.wordsDataDict && loaded.wordsDataDict.length
            ? loaded.wordsDataDict
            : rawWordsDict.map(parseWordDict);
        buildUIDict(loaded);
    }
    attachHandlersDict();
})();

resetBtnTopDict.addEventListener('click', resetAllDict);
resetBtnBottomDict.addEventListener('click', resetAllDict);
showMistakesBtnTopDict.addEventListener('click', showMistakesPopupDict);
showMistakesBtnBottomDict.addEventListener('click', showMistakesPopupDict);
closeMistakesPopupDict.addEventListener('click', hideMistakesPopupDict);
mistakesPopupOverlayDict.addEventListener('click', (e) => {
    if (e.target === mistakesPopupOverlayDict) hideMistakesPopupDict();
});
