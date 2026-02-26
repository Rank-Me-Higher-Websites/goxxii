export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/15 rounded-full blur-[60px]" />
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-[50px]" />
    </div>
  );
};
