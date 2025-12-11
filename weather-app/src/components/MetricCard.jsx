export default function MetricCard({ title, value }) {
  return (
    <div className="bg-[#1c203f] px-4 py-5 rounded-xl text-center text-white">
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-xl mt-2">{value}</p>
    </div>
  );
}
