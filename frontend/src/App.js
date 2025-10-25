import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex h-screen gap-3">
      <PipelineToolbar />
      <div className="flex-1 p-3">
        <div className="h-[calc(100vh-100px)] bg-[linear-gradient(180deg,#071024_0%,#081226_100%)] rounded-md border border-white/5 overflow-hidden">
          <PipelineUI />
        </div>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
