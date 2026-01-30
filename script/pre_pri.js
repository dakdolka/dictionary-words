const STORAGE_KEY_PREPRI = 'pre_pri_trainer_state_v2';

const wordsRawPrePri = `
прИбывать в город
прЕбывать в городе
прИзреть сироту
прЕзирать врага
прИтворить дверь
прЕтворить мечту в жизнь
прИклонить голову (отдохнуть)
прЕклонить голову/колени (оказать уважение)
прИдать значение
прЕдать друга
прИходящий человек
прИходящее явление
прИтерпеться к боли
прЕтерпеть трудности
прЕёмник радиосигнала
прИемник ученика
прИставить к награде
светопрЕставление
прЕставился(человек)
прИвратник стоял
прЕвратности судьбы
прИложить вплотную
непрЕложная истина
прИдел в церкви
прЕдел возможностей
прЕуменьшать(очень) важность
прИуменьшать(немного) значение
прИоритет
прИвилегия
прИбаутка
прИвередливый
прИгожий
прИбор
прИличия
прИстойно
прИесться
прИказ
прИключение
прИкорнуть
прИсяга
прИтеснять
прИчина
прИчуда
прИтязание
прИрода
прИмер
прИческа
прИскорбно
прИволье
прИцел
прИмета
прИверженец
прИлежный
прИчиндалы
прИятный
прИватный
прИнцип
прИмат
прИмитив
прИгодный
прИсниться
прИсудить
прИзвание
прИсмотреть
прИспособить
прЕрогатива
прЕмбула
прЕпятствие
прЕпоны
прЕрия
прЕзент
прЕимущество
прЕисподняя
прЕгрешение
прЕнебрегать
прЕкословить
прЕпираться
прЕстол
прЕвратный
прЕпинания
прЕславутый
прЕследовать
прЕподаватель
прЕподнести
прЕпроводить
прЕподобный
прЕткновения камень
прЕсмыкаться
прЕпарировать
прЕлюдия
прЕмьера
прЕстиж
прЕзидент
прЕтензия
прЕзумпция
прЕвентативный
прЕлат
прЕвалировать
прЕзидиум
прЕтендент
прЕферанс
прЕцедент
прЕпарат
прЕодолеть
`.trim().split("\n");

function parseWordPrePri(word) {
    const chars = [...word];
    const check = [];
    chars.forEach((ch, i) => {
        if (ch.match(/[А-ЯЁ]/)) {
            check.push(i);
        }
    });
    return { original: word, lower: word.toLowerCase(), check };
}

let wordsDataPrePri = [];
let wordElementsPrePri = [];
let currentWordPrePri = 0;
let currentLetterPrePri = 0;

let totalSlotsPrePri = 0;
let correctCountPrePri = 0;
let wrongCountPrePri = 0;

const containerPrePri = document.getElementById('wordsContainer');
const totalSlotsSpanPrePri = document.getElementById('totalSlots');
const correctCountSpanPrePri = document.getElementById('correctCount');
const wrongCountSpanPrePri = document.getElementById('wrongCount');
const accuracySpanPrePri = document.getElementById('accuracy');

const resetBtnTopPrePri = document.getElementById('resetBtnTop');
const resetBtnBottomPrePri = document.getElementById('resetBtnBottom');
const showMistakesBtnTopPrePri = document.getElementById('showMistakesBtnTop');
const showMistakesBtnBottomPrePri = document.getElementById('showMistakesBtnBottom');
const mistakesPopupOverlayPrePri = document.getElementById('mistakesPopupOverlay');
const mistakesListPrePri = document.getElementById('mistakesList');
const closeMistakesPopupPrePri = document.getElementById('closeMistakesPopup');

function shufflePrePri(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function updateStatsPrePri() {
    totalSlotsSpanPrePri.textContent = totalSlotsPrePri;
    correctCountSpanPrePri.textContent = correctCountPrePri;
    wrongCountSpanPrePri.textContent = wrongCountPrePri;
    const acc = totalSlotsPrePri ? Math.round((correctCountPrePri / totalSlotsPrePri) * 100) : 0;
    accuracySpanPrePri.textContent = acc;
}

function initDataPrePri() {
    wordsDataPrePri = wordsRawPrePri.map(parseWordPrePri);
    shufflePrePri(wordsDataPrePri);
}

function saveStatePrePri() {
    const state = {
        wordsDataPrePri,
        totalSlotsPrePri,
        correctCountPrePri,
        wrongCountPrePri,
        letters: wordElementsPrePri.map(obj =>
            Array.from(obj.letters).map(span => ({
                correct: span.dataset.correct,
                done: span.dataset.done || '0',
                result: span.dataset.result || ''
            }))
        )
    };
    try {
        localStorage.setItem(STORAGE_KEY_PREPRI, JSON.stringify(state));
    } catch (e) {}
}

function loadStatePrePri() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_PREPRI);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function buildUIPrePri(fromState) {
    containerPrePri.innerHTML = '';
    wordElementsPrePri = [];
    totalSlotsPrePri = 0;
    correctCountPrePri = 0;
    wrongCountPrePri = 0;

    wordsDataPrePri.forEach((data, wordIndex) => {
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
                            correctCountPrePri++;
                        } else if (stateForSpan.result === 'wrong') {
                            span.classList.add('wrong-slot');
                            const inner = document.createElement('span');
                            inner.textContent = span.dataset.correct;
                            inner.classList.add('wrong-inner');
                            span.appendChild(inner);
                            wrongCountPrePri++;
                        }
                    } else {
                        span.innerHTML = '&nbsp;';
                    }
                } else {
                    span.innerHTML = '&nbsp;';
                }

                div.appendChild(span);
                letterIndex++;
                totalSlotsPrePri++;
            } else {
                div.appendChild(document.createTextNode(charsLower[i]));
            }
        });

        const input = document.createElement('input');
        input.className = 'hiddenInput';
        input.autocomplete = 'off';
        input.spellcheck = false;
        div.appendChild(input);

        containerPrePri.appendChild(div);
        wordElementsPrePri.push({ div, input, letters: div.querySelectorAll('.letter') });
    });

    if (fromState) {
        totalSlotsPrePri = fromState.totalSlotsPrePri || totalSlotsPrePri;
        correctCountPrePri = fromState.correctCountPrePri || correctCountPrePri;
        wrongCountPrePri = fromState.wrongCountPrePri || wrongCountPrePri;
    }

    updateStatsPrePri();
    focusFirstEmptyPrePri();
}

function focusFirstEmptyPrePri() {
    let found = false;
    for (let w = 0; w < wordElementsPrePri.length; w++) {
        const letters = wordElementsPrePri[w].letters;
        for (let i = 0; i < letters.length; i++) {
            const span = letters[i];
            if (span.dataset.done !== '1') {
                currentWordPrePri = w;
                currentLetterPrePri = i;
                wordElementsPrePri.forEach(obj => obj.div.classList.remove('active'));
                wordElementsPrePri[w].div.classList.add('active');
                wordElementsPrePri[w].input.focus();
                found = true;
                break;
            }
        }
        if (found) break;
    }
    if (!found && wordElementsPrePri.length) {
        currentWordPrePri = 0;
        currentLetterPrePri = 0;
        wordElementsPrePri[0].div.classList.add('active');
        wordElementsPrePri[0].input.focus();
    }
}

function attachHandlersPrePri() {
    wordElementsPrePri.forEach((obj, wordIndex) => {
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
                focusFirstEmptyPrePri();
                return;
            }

            if (wordIndex !== currentWordPrePri) {
                focusFirstEmptyPrePri();
                return;
            }

            const span = letters[currentLetterPrePri];
            if (!span) {
                focusFirstEmptyPrePri();
                return;
            }

            const correct = span.dataset.correct;

            if (span.dataset.done === '1') {
                focusFirstEmptyPrePri();
                return;
            }

            span.innerHTML = '';

            if (value === correct) {
                span.textContent = correct;
                span.classList.add('correct');
                span.dataset.done = '1';
                span.dataset.result = 'right';
                correctCountPrePri++;
            } else {
                span.classList.add('wrong-slot');
                const inner = document.createElement('span');
                inner.textContent = correct;
                inner.classList.add('wrong-inner');
                span.appendChild(inner);

                span.dataset.done = '1';
                span.dataset.result = 'wrong';
                wrongCountPrePri++;
            }

            updateStatsPrePri();
            saveStatePrePri();

            currentLetterPrePri++;
            if (currentLetterPrePri >= letters.length) {
                wordElementsPrePri[wordIndex].div.classList.remove('active');
                focusFirstEmptyPrePri();
            }
        };
    });
}

function collectMistakesPrePri() {
    const mistakes = [];
    wordElementsPrePri.forEach((obj, wordIndex) => {
        const letters = obj.letters;
        let wordHasError = false;
        letters.forEach(span => {
            if (span.dataset.result === 'wrong') wordHasError = true;
        });
        if (!wordHasError) return;

        const original = wordsDataPrePri[wordIndex].lower;
        const chars = [...original];
        const capsPositions = wordsDataPrePri[wordIndex].check;

        let resultHtml = '';
        chars.forEach((ch, i) => {
            if (capsPositions.includes(i)) {
                resultHtml += `<span class="green">${ch.toUpperCase()}</span>`;
            } else {
                resultHtml += ch;
            }
        });

        mistakes.push(resultHtml);
    });
    return mistakes;
}

function showMistakesPopupPrePri() {
    const mistakes = collectMistakesPrePri();
    mistakesListPrePri.innerHTML = '';

    if (!mistakes.length) {
        mistakesListPrePri.innerHTML = '<div>Ошибок нет.</div>';
    } else {
        mistakes.forEach(html => {
            const div = document.createElement('div');
            div.className = 'popup-word';
            div.innerHTML = html;
            mistakesListPrePri.appendChild(div);
        });
    }

    mistakesPopupOverlayPrePri.style.display = 'flex';
}

function hideMistakesPopupPrePri() {
    mistakesPopupOverlayPrePri.style.display = 'none';
}

function resetAllPrePri() {
    try {
        localStorage.removeItem(STORAGE_KEY_PREPRI);
    } catch (e) {}
    initDataPrePri();
    buildUIPrePri(null);
    attachHandlersPrePri();
}

(function startPrePri() {
    const loaded = loadStatePrePri();
    if (!loaded) {
        initDataPrePri();
        buildUIPrePri(null);
    } else {
        wordsDataPrePri = loaded.wordsDataPrePri && loaded.wordsDataPrePri.length
            ? loaded.wordsDataPrePri
            : wordsRawPrePri.map(parseWordPrePri);
        buildUIPrePri(loaded);
    }
    attachHandlersPrePri();
})();

resetBtnTopPrePri.addEventListener('click', resetAllPrePri);
resetBtnBottomPrePri.addEventListener('click', resetAllPrePri);
showMistakesBtnTopPrePri.addEventListener('click', showMistakesPopupPrePri);
showMistakesBtnBottomPrePri.addEventListener('click', showMistakesPopupPrePri);
closeMistakesPopupPrePri.addEventListener('click', hideMistakesPopupPrePri);
mistakesPopupOverlayPrePri.addEventListener('click', (e) => {
    if (e.target === mistakesPopupOverlayPrePri) hideMistakesPopupPrePri();
});
