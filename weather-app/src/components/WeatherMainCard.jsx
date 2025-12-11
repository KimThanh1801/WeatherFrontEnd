

export default function WeatherMainCard({ data }) {
  if (!data || !data.current) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-gradient-to-br from-[#4a4ed4] to-[#262b63] rounded-3xl p-8 text-white">
      <h2 className="text-2xl font-semibold">{data.location.name}</h2>

      <p className="opacity-70">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div className="flex justify-between items-center mt-6">
        <div>
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
            className="w-20"
          />
        </div>

        <h1 className="text-7xl font-bold">{Math.round(data.current.temp_c)}°C</h1>
      </div>

      <p className="mt-2 opacity-70">{data.current.condition.text}</p>
    </div>
  );
}
