'use strict';

module.exports = ctx => function (args) {
    let type = args[0];
    if (!['hira', 'kata', 'kanji', 'ruby'].includes(type)) {
        type = 'ruby';
    } else {
        args = args.slice(1);
    }

    if (type === 'ruby') {
        const parts = args
        let out = '';

        for (let i = 0; i < parts.length; i++) {
            const text = parts[i];
            const reading = parts[i + 1];
            if (reading && /^[\u3040-\u309F\u30A0-\u30FFー]+$/.test(reading)) {
                out += `<ruby><rb>${text}</rb><rt>${reading}</rt></ruby>`;
                i++;
            } else {
                out += `<ruby><rb>${text}</rb></ruby>`;
            }
        }
        return out;
    }

    let cls = '';
    if (type === 'hira') cls = 'hiragana';
    if (type === 'kata') cls = 'katakana';
    if (type === 'kanji') cls = 'kanji';
    let text = args.join(' ');
    return `<span class="${cls}">${text}</span>`;
};
