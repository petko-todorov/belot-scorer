const NumericKeypad = ({ onNumberPress, onAdd }) => {
    const buttons = [
        '1',
        '2',
        '3',
        '4',
        '5',
        'sign',
        '6',
        '7',
        '8',
        '9',
        '0',
        'delete',
    ];

    return (
        <div className="flex gap-1 justify-center py-1 border-t">
            <div className="grid grid-cols-6 grid-rows-2 gap-1">
                {buttons.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => onNumberPress(btn)}
                        className="bg-stone-700 text-gray-100 text-2xl font-bold rounded-xl w-16 h-13"
                    >
                        {btn === 'sign' ? '+/-' : btn === 'delete' ? '⌫' : btn}
                    </button>
                ))}
            </div>

            <button
                onClick={onAdd}
                className="bg-stone-700 text-gray-100 text-2xl font-bold rounded-xl w-16"
            >
                →
            </button>
        </div>
    );
};

export default NumericKeypad;
