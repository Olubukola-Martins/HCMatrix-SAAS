export const FormItemSelectionHandler: React.FC<{
  handleClearAll: () => void;
  handleSelectAll: () => void;
  hidden?: boolean;
}> = ({ handleClearAll, handleSelectAll, hidden = true }) => {
  if (hidden) return null;
  return (
    <div className="flex gap-4 justify-end items-center">
      {
        <p
          className="text-xs text-red-600 cursor-pointer "
          onClick={handleClearAll}
        >
          Clear Selection
        </p>
      }
      {
        <p
          className="text-xs text-caramel cursor-pointer "
          onClick={handleSelectAll}
        >
          Select All
        </p>
      }
    </div>
  );
};
