export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[300px] px-4">{children}</div>
    </main>
  );
}
