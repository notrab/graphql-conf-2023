export default function Resolver(root, { unit = "metric" }) {
  const { location } = root;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!location) return null;

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then(({ main }) => main.temp);
}
