import "./globals.css";

export const metadata = {
  title: "Ironlady Hub",
  description: "Course & Task Management Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex bg-[#fdf8f6]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
          <h1 className="text-lg font-bold text-orange-600 mb-6">Ironlady Hub</h1>
          <nav className="flex flex-col gap-3 text-gray-700">
            <a href="/dashboard" className="flex items-center gap-2 hover:text-orange-600">
              📊 Dashboard
            </a>
            <a href="/todo" className="flex items-center gap-2 hover:text-orange-600">
              ✅ To-Do List
            </a>
            <a href="/courses" className="flex items-center gap-2 hover:text-orange-600">
              📚 My Courses
            </a>
            <a href="/feedback" className="flex items-center gap-2 hover:text-orange-600">
              💬 Feedback
            </a>
            <a href="/tracker" className="flex items-center gap-2 hover:text-orange-600">
              📈 Tracker
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
