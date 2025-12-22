import { clampScore } from '../utils/score';

const ScoreInput = ({ total, value, onChange, inputRef, onEnter }) => {
    return (
        <div className="grid grid-cols-[4ch_2ch_4ch] justify-center">
            <span className="text-right">{total}</span>
            <span className="text-center">-</span>
            <input
                ref={inputRef}
                type="tel"
                value={value}
                inputMode="numeric"
                className="w-[3ch] bg-transparent text-left outline-none"
                placeholder="0"
                onChange={(e) => onChange(clampScore(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && onEnter()}
            />
        </div>
    );
};

export default ScoreInput;
