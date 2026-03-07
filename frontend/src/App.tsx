import Game from "./components/Game";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Toaster position="top-center" duration={1200} />
      <Game />
    </>
  );
}
