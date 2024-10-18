import { useApiWithAuth } from "./hooks/useApiWithAuth";
import Homepage from "./pages/Homepage";

export default function App() {
  useApiWithAuth();
  return (
    <>
      <Homepage />
    </>
  );
}
