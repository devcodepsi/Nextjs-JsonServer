import Create from "./@components/create";
import List from "./@components/list";

export default function Home() {

  return (
    <main className="p-3">
      <Create />
      <List />
    </main>
  );
}
