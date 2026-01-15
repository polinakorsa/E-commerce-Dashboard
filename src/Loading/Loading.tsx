import LoadingUI from '../assets/LoadingUI.tsx';
export default function Loading() {
  return (
    <button
      type="button"
      className=" w-28 h-28 text-center rounded-3xl inline-flex flex-col items-center justify-center
             bg-white border border-gray-300 shadow-xl text-gray-700 hover:bg-gray-50
             focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
      disabled
    >
      <div className="flex items-center justify-center">
        <LoadingUI />
      </div>
      <span className="mt-2 text-lg font-medium">Loading...</span>
    </button>
  );
}
