import { useSubwayStore } from '@/stores/subwayStore';

export function ViewModeToggle() {
  const { viewMode, setViewMode, setDestination } = useSubwayStore();

  return (
    <div className="flex gap-2 my-3">
      <button
        className={viewMode === 'top3' ? 'font-bold' : ''}
        onClick={() => {
          setViewMode('top3');
          setDestination('');
        }}
      >
        호선별
      </button>

      <button
        className={viewMode === 'destination' ? 'font-bold' : ''}
        onClick={() => {
          setViewMode('destination');
          setDestination('');
        }}
      >
        행선지별
      </button>
    </div>
  );
}
