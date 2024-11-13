export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-7xl flex flex-col gap-12 h-screen items-center "><div className="m-auto">{children}</div></div>
    );
}
