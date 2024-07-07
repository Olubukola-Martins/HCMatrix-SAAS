const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div  style={{ boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)" }} className="h-fit w-auto max-w-full rounded-2xl p-5">
      {children}
    </div>
  );
};

export default CardWrapper;
