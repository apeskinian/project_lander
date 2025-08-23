export default function Button({ children, chooseLocation }) {
    return (
        <button
            onClick={chooseLocation}
            className="btn p-3 mt-3 bg-amber-600 rounded-2xl"
        >
            {children}
        </button>
    )
}