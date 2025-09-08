export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, Student!</h1>
      <p className="text-gray-600 mb-6">Here’s a quick overview of your modules.</p>

      <div className="grid grid-cols-2 gap-6">
        <Card title="To-Do List" desc="Organize your daily tasks and stay productive." />
        <Card title="My Courses" desc="View and manage all your enrolled courses." />
        <Card title="Course Feedback" desc="Provide feedback for your courses." />
        <Card title="Course Tracker" desc="Track progress and generate AI summaries." />
      </div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}
