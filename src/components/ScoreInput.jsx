import { clampScore } from '../utils/score';

const ScoreInput = ({ total, value, onChange, inputRef, onEnter }) => {
    return (
        <div className="grid grid-cols-[4ch_2ch_4ch] justify-center max-sm:grid-cols-[1fr_0.5fr_1fr]">
            <span className="text-right">{total}</span>
            <span className="text-center">-</span>
            <span className="text-left">
                <input
                    ref={inputRef}
                    type="tel"
                    value={value}
                    inputMode="numeric"
                    className="w-[3ch] bg-transparent outline-none"
                    placeholder="0"
                    onChange={(e) => onChange(clampScore(e.target.value))}
                    onKeyDown={(e) => e.key === 'Enter' && onEnter()}
                />
            </span>
        </div>
    );
};

export default ScoreInput;
