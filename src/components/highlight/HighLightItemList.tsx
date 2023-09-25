export const HighLightItemList: React.FC<{
  items: { name: string; value: string | number }[];
}> = ({ items }) => {
  return (
    <div className="font-medium text-accent flex gap-6">
      {items.map((item, i) => (
        <div className="flex gap-6">
          <div>
            <span className="font-semibold capitalize">{item.name}</span> :{" "}
            {item.value}
          </div>
          {i !== items.length - 1 ? (
            <span className="text-caramel">|</span>
          ) : null}
        </div>
      ))}
    </div>
  );
};
