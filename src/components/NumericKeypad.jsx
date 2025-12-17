const NumericKeypad = ({ onNumberPress, onAdd }) => {
    return (
        <>
            <div className="flex gap-1 justify-center py-1 border-t">
                <div className="grid grid-cols-6 grid-rows-2 gap-1">
                    <button
                        onClick={() => onNumberPress('1')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl w-16 h-13"
                    >
                        1
                    </button>
                    <button
                        onClick={() => onNumberPress('2')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        2
                    </button>
                    <button
                        onClick={() => onNumberPress('3')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl "
                    >
                        3
                    </button>
                    <button
                        onClick={() => onNumberPress('4')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        4
                    </button>
                    <button
                        onClick={() => onNumberPress('5')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        5
                    </button>
                    <button
                        onClick={() => onNumberPress('sign')}
                        className="bg-amber-900 text-amber-300 text-xl font-bold rounded-xl"
                    >
                        +/-
                    </button>
                    <button
                        onClick={() => onNumberPress('6')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        6
                    </button>
                    <button
                        onClick={() => onNumberPress('7')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        7
                    </button>
                    <button
                        onClick={() => onNumberPress('8')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        8
                    </button>
                    <button
                        onClick={() => onNumberPress('9')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        9
                    </button>

                    <button
                        onClick={() => onNumberPress('0')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        0
                    </button>

                    <button
                        onClick={() => onNumberPress('delete')}
                        className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl"
                    >
                        ⌫
                    </button>
                </div>

                <button
                    onClick={onAdd}
                    className="bg-amber-900 text-amber-300 text-2xl font-bold rounded-xl w-16"
                >
                    →
                </button>
            </div>
        </>
    );
};

export default NumericKeypad;
