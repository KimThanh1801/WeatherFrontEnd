// export default function DailyForecast({ data = [], loading }) {
//   // Loading khi fetch
//   if (loading || data.length === 0) {
//     return (
//       <div>
//         <p className="text-sm mb-2 text-white">Daily forecast</p>

//         <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
//           {[1, 2, 3, 4, 5, 6, 7].map((i) => (
//             <div
//               key={i}
//               className="bg-[#1c203f] h-24 rounded-xl animate-pulse"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Khi có data thật
//   return (
//     <div>
//       <p className="text-sm mb-2 text-white">Daily forecast</p>

//       <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
//         {data.map((d, i) => (
//           <div
//             key={i}
//             className="bg-[#1c203f] p-4 rounded-xl text-center text-white"
//           >
//             <p className="font-semibold">
//               {new Date(d.date).toLocaleDateString("en-US", {
//                 weekday: "short",
//               })}
//             </p>

//             <img
//               src={d.day.condition.icon}
//               alt={d.day.condition.text}
//               className="w-10 mx-auto my-2"
//             />

//             <p className="text-sm">
//               {Math.round(d.day.maxtemp_c)}° / {Math.round(d.day.mintemp_c)}°
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




export default function DailyForecast({ data = [], loading }) {

  if (loading || data.length === 0) {
    return (
      <div>
        <p className="text-sm mb-2 text-white">Daily forecast</p>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="bg-[#1c203f] h-24 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Khi có dữ liệu thật
  return (
    <div>
      <p className="text-sm mb-2 text-white">Daily forecast</p>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="bg-[#1c203f] p-4 rounded-xl text-center text-white"
          >
            <p className="font-semibold">
              {new Date(d.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>

            <img
              src={d.day.condition.icon}
              alt={d.day.condition.text}
              className="w-10 mx-auto my-2"
            />

            <p className="text-sm">
              {Math.round(d.day.maxtemp_c)}° / {Math.round(d.day.mintemp_c)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

