export default function Die(props) {
  return (
    <button
      onClick={props.hold}
      class={`w-12 h-12 rounded-lg shadow-lg font-bold text-2xl flex items-center justify-center border border-gray-200 cursor-pointer select-none 
        ${props.isHeld ? "bg-green-400" : "bg-white"}`}
    >
      {props.value}
    </button>
  );
}
