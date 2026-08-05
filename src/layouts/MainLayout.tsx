type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {children}
    </div>
  );
}