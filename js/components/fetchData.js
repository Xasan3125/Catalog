export default async function fetchData() {
  try {
    const response = await fetch("./data/data.json");

    if (!response.ok) {
      throw new Error(`Ошибка загрузки! Статус: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Ошибка при загрузке данных:", err);
    return [];
  }
}
