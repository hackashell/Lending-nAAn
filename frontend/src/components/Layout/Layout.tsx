export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="max-w-7xl mx-auto p-8">{children}</div>;
};
